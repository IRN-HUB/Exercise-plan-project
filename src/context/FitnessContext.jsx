import { createContext, useContext, useReducer, useEffect, useCallback } from 'react'
import { loadState, saveState } from '../utils/storage'
import { generatePlan } from '../utils/workoutGenerator'
import { getToday, calculateStreak } from '../utils/helpers'
import exercises from '../data/exercises'

const FitnessContext = createContext(null)

const defaultState = {
  profile: null,
  workoutPlan: null,
  workoutLogs: {},
  bodyMetrics: [],
  customExercises: []
}

function reducer(state, action) {
  switch (action.type) {
    case 'LOAD_STATE':
      return { ...state, ...action.payload }

    case 'SET_PROFILE':
      return { ...state, profile: action.payload }

    case 'SET_WORKOUT_PLAN':
      return { ...state, workoutPlan: action.payload }

    case 'LOG_WORKOUT':
      return {
        ...state,
        workoutLogs: { ...state.workoutLogs, [action.payload.date]: action.payload.log }
      }

    case 'UPDATE_EXERCISE_SET': {
      const { date, exerciseIndex, setIndex, data } = action.payload
      const log = state.workoutLogs[date]
      if (!log) return state
      const newExercises = [...log.exercises]
      const ex = { ...newExercises[exerciseIndex] }
      const newSets = [...ex.sets]
      newSets[setIndex] = { ...newSets[setIndex], ...data }
      ex.sets = newSets
      newExercises[exerciseIndex] = ex
      return {
        ...state,
        workoutLogs: {
          ...state.workoutLogs,
          [date]: { ...log, exercises: newExercises }
        }
      }
    }

    case 'COMPLETE_EXERCISE': {
      const { date, exerciseIndex } = action.payload
      const log = state.workoutLogs[date]
      if (!log) return state
      const exercises = [...log.exercises]
      const ex = { ...exercises[exerciseIndex] }
      const allCompleted = ex.sets.every(s => s.completed)
      ex.sets = ex.sets.map(s => ({ ...s, completed: !allCompleted }))
      exercises[exerciseIndex] = ex
      const allExercisesDone = exercises.every(e => e.sets.every(s => s.completed))
      return {
        ...state,
        workoutLogs: {
          ...state.workoutLogs,
          [date]: { ...log, exercises, completed: allExercisesDone }
        }
      }
    }

    case 'COMPLETE_WORKOUT': {
      const { date } = action.payload
      const log = state.workoutLogs[date]
      if (!log) return state
      const exercises = log.exercises.map(ex => ({
        ...ex,
        sets: ex.sets.map(s => ({ ...s, completed: true }))
      }))
      return {
        ...state,
        workoutLogs: {
          ...state.workoutLogs,
          [date]: { ...log, exercises, completed: true }
        }
      }
    }

    case 'ADD_BODY_METRIC':
      return {
        ...state,
        bodyMetrics: [...state.bodyMetrics.filter(m => m.date !== action.payload.date), action.payload]
      }

    case 'ADD_CUSTOM_EXERCISE':
      return {
        ...state,
        customExercises: [...state.customExercises, action.payload]
      }

    case 'REMOVE_CUSTOM_EXERCISE':
      return {
        ...state,
        customExercises: state.customExercises.filter(ex => ex.id !== action.payload)
      }

    case 'RESET_DATA':
      return { ...defaultState }

    default:
      return state
  }
}

function initState() {
  const saved = loadState()
  if (saved && saved.profile) {
    return { ...defaultState, ...saved }
  }
  return defaultState
}

export function FitnessProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, initState)

  useEffect(() => {
    saveState(state)
  }, [state])

  const allExercises = [...exercises, ...state.customExercises]

  const initProfile = useCallback((profile) => {
    dispatch({ type: 'SET_PROFILE', payload: profile })
    const plan = generatePlan(profile)
    dispatch({ type: 'SET_WORKOUT_PLAN', payload: plan })
  }, [])

  const regeneratePlan = useCallback(() => {
    if (state.profile) {
      const plan = generatePlan(state.profile)
      dispatch({ type: 'SET_WORKOUT_PLAN', payload: plan })
      return plan
    }
    return null
  }, [state.profile])

  const generateCustomWorkout = useCallback((selectedGroups) => {
    const today = getToday()
    const selected = allExercises.filter(ex => selectedGroups.includes(ex.muscleGroup))
    const shuffled = [...selected].sort(() => Math.random() - 0.5)
    const picked = shuffled.slice(0, 8)

    const exercises = picked.map(ex => ({
      ...ex,
      targetSets: 3,
      targetReps: 12,
      restSeconds: 45,
      sets: Array.from({ length: 3 }, () => ({ completed: false, reps: 12, weight: 0 }))
    }))

    const log = {
      date: today,
      dayName: 'custom',
      completed: false,
      duration: 0,
      isCustom: true,
      selectedGroups,
      exercises
    }

    dispatch({ type: 'LOG_WORKOUT', payload: { date: today, log } })
    return log
  }, [allExercises])

  const addCustomExercise = useCallback((exercise) => {
    dispatch({ type: 'ADD_CUSTOM_EXERCISE', payload: exercise })
  }, [])

  const removeCustomExercise = useCallback((id) => {
    dispatch({ type: 'REMOVE_CUSTOM_EXERCISE', payload: id })
  }, [])

  const today = getToday()
  const todayLog = state.workoutLogs[today]
  const streak = calculateStreak(state.workoutLogs)

  // Initialize today's log from plan if exists
  useEffect(() => {
    if (state.workoutPlan && !state.workoutLogs[today]) {
      const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
      const dayKey = dayNames[new Date().getDay()]

      if (dayKey && state.workoutPlan.days[dayKey]?.exercises?.length > 0) {
        const dayPlan = state.workoutPlan.days[dayKey]
        const log = {
          date: today,
          dayName: dayKey,
          completed: false,
          duration: 0,
          exercises: dayPlan.exercises.map(ex => ({
            ...ex,
            sets: ex.sets.map(s => ({ ...s, completed: false }))
          }))
        }
        dispatch({ type: 'LOG_WORKOUT', payload: { date: today, log } })
      }
    }
  }, [state.workoutPlan, today, state.workoutLogs])

  const value = {
    ...state,
    dispatch,
    initProfile,
    regeneratePlan,
    generateCustomWorkout,
    addCustomExercise,
    removeCustomExercise,
    allExercises,
    today,
    todayLog,
    streak,
    isInitialized: !!state.profile
  }

  return (
    <FitnessContext.Provider value={value}>
      {children}
    </FitnessContext.Provider>
  )
}

export function useFitness() {
  const ctx = useContext(FitnessContext)
  if (!ctx) throw new Error('useFitness must be used within FitnessProvider')
  return ctx
}
