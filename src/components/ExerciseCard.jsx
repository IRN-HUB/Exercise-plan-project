import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'

export default function ExerciseCard({ exercise, date, exerciseIndex, readOnly }) {
  const { dispatch } = useFitness()
  const [showDetail, setShowDetail] = useState(false)

  const toggleSet = (setIndex) => {
    if (readOnly) return
    dispatch({
      type: 'UPDATE_EXERCISE_SET',
      payload: { date, exerciseIndex, setIndex, data: { completed: !exercise.sets[setIndex].completed } }
    })
  }

  const allDone = exercise.sets.every(s => s.completed)

  return (
    <div className={`exercise-card ${allDone ? 'completed' : ''}`}>
      <div className="exercise-header" onClick={() => setShowDetail(!showDetail)}>
        <div className="exercise-info">
          <h4 className="exercise-name">{exercise.name}</h4>
          <span className="exercise-target">{exercise.targetSets}组 × {exercise.targetReps}次</span>
          {exercise.restSeconds && (
            <span className="exercise-rest">休息{exercise.restSeconds}秒</span>
          )}
        </div>
        <div className="exercise-status">
          <span className={`sets-badge ${allDone ? 'done' : ''}`}>
            {exercise.sets.filter(s => s.completed).length}/{exercise.sets.length}
          </span>
          <span className={`detail-toggle ${showDetail ? 'open' : ''}`}>▼</span>
        </div>
      </div>

      <div className={`exercise-sets ${showDetail ? 'visible' : ''}`}>
        <div className="sets-grid">
          <span className="set-label">组数</span>
          <span className="set-label">次数</span>
          <span className="set-label">状态</span>
          {exercise.sets.map((set, idx) => (
            <div key={idx} className="set-row">
              <span>{idx + 1}</span>
              <span>{set.reps}</span>
              <button
                className={`set-btn ${set.completed ? 'done' : ''}`}
                onClick={() => toggleSet(idx)}
                disabled={readOnly}
              >
                {set.completed ? '✓' : '○'}
              </button>
            </div>
          ))}
        </div>
        <p className="exercise-desc">{exercise.description}</p>
        {exercise.tips && (
          <p className="exercise-tips">💡 {exercise.tips}</p>
        )}
      </div>
    </div>
  )
}
