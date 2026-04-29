import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'
import { dayOrder } from '../utils/workoutGenerator'
import { getDateFromDayName, getChineseWeekday } from '../utils/helpers'

export default function Plan() {
  const { workoutPlan, workoutLogs, regeneratePlan, isInitialized } = useFitness()
  const [expandedDay, setExpandedDay] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  if (!isInitialized || !workoutPlan) {
    return (
      <div className="page">
        <div className="empty-state">
          <span className="empty-icon">📋</span>
          <h2>还没有训练计划</h2>
          <p>请先在设置中完成初始化</p>
        </div>
      </div>
    )
  }

  const handleRegenerate = () => {
    regeneratePlan()
    setShowConfirm(false)
  }

  const getDayStatus = (dayKey) => {
    const date = getDateFromDayName(dayKey)
    if (!date || !workoutLogs[date]) return 'pending'
    return workoutLogs[date].completed ? 'completed' : 'in-progress'
  }

  const planDays = Object.entries(workoutPlan.days)

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">训练计划</h1>
        <button className="btn btn-secondary" onClick={() => setShowConfirm(true)}>
          重新生成
        </button>
      </div>

      {showConfirm && (
        <div className="modal-overlay" onClick={() => setShowConfirm(false)}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>重新生成计划？</h3>
            <p>当前训练进度不会丢失，但未来几天的训练内容会改变。</p>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setShowConfirm(false)}>取消</button>
              <button className="btn btn-primary" onClick={handleRegenerate}>确认生成</button>
            </div>
          </div>
        </div>
      )}

      <div className="plan-summary">
        <div className="summary-item">
          <span className="summary-label">每周训练</span>
          <span className="summary-value">{workoutPlan.dayCount} 天</span>
        </div>
      </div>

      <div className="week-plan">
        {planDays.map(([dayKey, day]) => {
          const status = getDayStatus(dayKey)
          const isExpanded = expandedDay === dayKey
          const date = getDateFromDayName(dayKey)

          return (
            <div key={dayKey} className={`day-card ${status} ${isExpanded ? 'expanded' : ''}`}>
              <div className="day-header" onClick={() => setExpandedDay(isExpanded ? null : dayKey)}>
                <div className="day-info">
                  <div className="day-name">
                    {day.name}
                    {date && <span className="day-date"> ({getChineseWeekday(date)})</span>}
                  </div>
                  <div className="day-meta">
                    <span>{day.exercises.length} 个动作</span>
                    <span className="dot">·</span>
                    <span>约 {day.totalMinutes} 分钟</span>
                  </div>
                </div>
                <div className="day-status">
                  {status === 'completed' && <span className="status-badge done">已完成 ✓</span>}
                  {status === 'in-progress' && <span className="status-badge progress">进行中</span>}
                  {status === 'pending' && <span className="status-badge pending">{day.exercises.length}项</span>}
                  <span className={`expand-icon ${isExpanded ? 'open' : ''}`}>▼</span>
                </div>
              </div>

              {isExpanded && (
                <div className="day-exercises">
                  {day.exercises.map((ex, idx) => {
                    const log = date && workoutLogs[date]
                    const completed = log?.exercises[idx]?.sets?.every(s => s.completed)

                    return (
                      <div key={ex.id} className={`plan-exercise ${completed ? 'done' : ''}`}>
                        <div className="plan-exercise-info">
                          <span className="plan-exercise-name">{ex.name}</span>
                          <span className="plan-exercise-detail">
                            {ex.targetSets}组 × {ex.targetReps}次
                            {ex.restSeconds && ` · 休息${ex.restSeconds}秒`}
                          </span>
                        </div>
                        {completed && <span className="check-mark">✓</span>}
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
