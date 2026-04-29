import exercises from '../data/exercises'

const byLevel = (ex, level) => {
  const diff = { beginner: 0, intermediate: 1, advanced: 2 }
  return diff[ex.difficulty] <= diff[level]
}

const byEquipment = (ex, equip) => {
  if (equip === 'none') return ex.equipment === 'none'
  if (equip === 'gripper') return ex.equipment === 'none' || ex.equipment === 'gripper'
  return ex.equipment === 'none' || ex.equipment === equip
}

function pickExercises(pool, count, level) {
  const suitable = pool.filter(ex => byLevel(ex, level))
  const shuffled = [...suitable].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, Math.min(count, shuffled.length || suitable.length))
}

function getTemplate(goal) {
  const map = {
    lose_fat: { reps: [18, 25], rest: 30 },
    build_muscle: { reps: [8, 12], rest: 75 },
    keep_fit: { reps: [12, 15], rest: 45 }
  }
  return map[goal] || map.keep_fit
}

export const dayNamesCN = {
  monday: '周一', tuesday: '周二', wednesday: '周三',
  thursday: '周四', friday: '周五', saturday: '周六', sunday: '周日'
}

export const dayOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

export function generatePlan(profile) {
  const { level = 'beginner', goal = 'keep_fit', daysPerWeek = 3, equipment = 'none' } = profile
  const dayCount = Math.min(Math.max(daysPerWeek, 2), 6)
  const template = getTemplate(goal)

  const splits = {
    2: [
      ['chest', 'shoulders', 'arms', 'core'],
      ['legs', 'back', 'core']
    ],
    3: [
      ['chest', 'shoulders', 'arms', 'core'],
      ['back', 'legs', 'core'],
      ['fullbody', 'core']
    ],
    4: [
      ['chest', 'triceps', 'shoulders'],
      ['back', 'biceps'],
      ['legs', 'shoulders', 'core'],
      ['chest', 'back', 'arms']
    ],
    5: [
      ['chest', 'triceps'],
      ['back', 'biceps'],
      ['legs', 'shoulders'],
      ['chest', 'shoulders', 'arms'],
      ['legs', 'back', 'core']
    ],
    6: [
      ['chest', 'triceps'],
      ['back', 'biceps'],
      ['legs', 'shoulders'],
      ['chest', 'triceps', 'shoulders'],
      ['back', 'biceps', 'core'],
      ['legs', 'core', 'fullbody']
    ]
  }

  const split = splits[dayCount] || splits[3]

  const muscleExerciseMap = {
    chest: { muscles: ['chest'], count: 4 },
    back: { muscles: ['back'], count: 4 },
    legs: { muscles: ['legs'], count: 4 },
    shoulders: { muscles: ['shoulders'], count: 3 },
    arms: { muscles: ['arms'], count: 3 },
    biceps: { muscles: ['arms'], count: 2 },
    triceps: { muscles: ['arms'], count: 2 },
    core: { muscles: ['core'], count: 3 },
    fullbody: { muscles: ['fullbody', 'core'], count: 3 }
  }

  const days = {}

  for (let i = 0; i < dayCount; i++) {
    const dayKey = dayOrder[i]
    const daySplit = split[i % split.length]
    const dayExercises = []
    const usedIds = new Set()

    for (const group of daySplit) {
      const config = muscleExerciseMap[group]
      if (!config) continue

      const pool = exercises.filter(ex =>
        config.muscles.includes(ex.muscleGroup) &&
        byEquipment(ex, equipment) &&
        !usedIds.has(ex.id)
      )
      const picks = pickExercises(pool, config.count, level)
      for (const ex of picks) {
        usedIds.add(ex.id)
        const reps = template.reps[0] + Math.floor(Math.random() * (template.reps[1] - template.reps[0] + 1))
        dayExercises.push({
          ...ex,
          targetSets: 3,
          targetReps: reps,
          restSeconds: template.rest,
          sets: Array.from({ length: 3 }, () => ({ completed: false, reps, weight: 0 }))
        })
      }
    }

    const totalMinutes = Math.round(dayExercises.reduce((sum, ex) =>
      sum + ex.targetSets * (ex.restSeconds + 30), 0) / 60)

    days[dayKey] = {
      name: dayNamesCN[dayKey],
      exercises: dayExercises,
      completed: false,
      totalMinutes: Math.max(totalMinutes, 15)
    }
  }

  return {
    days,
    dayCount,
    goal,
    level,
    equipment,
    createdAt: new Date().toISOString()
  }
}

export function getGoalLabel(goal) {
  const map = {
    lose_fat: '减脂',
    build_muscle: '增肌',
    keep_fit: '保持体能'
  }
  return map[goal] || goal
}

export function getLevelLabel(level) {
  const map = { beginner: '初级', intermediate: '中级', advanced: '高级' }
  return map[level] || level
}

export function getEquipmentLabel(equip) {
  const map = { none: '无器械', dumbbell: '哑铃', bar: '单杠', gripper: '臂力棒' }
  return map[equip] || equip
}
