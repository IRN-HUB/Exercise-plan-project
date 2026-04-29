import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useFitness } from '../context/FitnessContext'
import ExerciseCard from '../components/ExerciseCard'
import TabataTimer from '../components/TabataTimer'
import { getGoalLabel, getLevelLabel } from '../utils/workoutGenerator'
import { getRandomQuote } from '../data/quotes'
import { muscleGroups } from '../data/exercises'

function QuoteBanner() {
  const [quote, setQuote] = useState({ text: '', author: '' })

  useEffect(() => {
    setQuote(getRandomQuote())
    const timer = setInterval(() => {
      setQuote(getRandomQuote())
    }, 15000)
    return () => clearInterval(timer)
  }, [])

  if (!quote.text) return null

  return (
    <div className="quote-banner">
      <div className="quote-decoration">"</div>
      <p className="quote-text">{quote.text}</p>
      <span className="quote-author">—— {quote.author}</span>
    </div>
  )
}

function WorkoutBuilder() {
  const { generateCustomWorkout, todayLog } = useFitness()
  const [selected, setSelected] = useState([])
  const [showBuilder, setShowBuilder] = useState(false)

  const toggleMuscle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  const handleGenerate = () => {
    if (selected.length === 0) return
    generateCustomWorkout(selected)
    setShowBuilder(false)
  }

  return (
    <div className="workout-builder">
      <div className="section-header">
        <h3 className="section-title">🎯 自定义今日训练</h3>
        {!todayLog?.isCustom && (
          <button className="btn btn-secondary btn-sm"
            onClick={() => setShowBuilder(!showBuilder)}>
            {showBuilder ? '取消' : '按部位选'}
          </button>
        )}
      </div>

      {todayLog?.isCustom && (
        <div className="builder-active-notice">
          <span>✨ 已按自定义计划训练</span>
          <button className="btn btn-secondary btn-sm"
            onClick={() => setShowBuilder(!showBuilder)}>
            重新选择
          </button>
        </div>
      )}

      {showBuilder && (
        <div className="builder-panel">
          <p className="builder-desc">选择今天想练的部位，系统自动生成训练组合</p>
          <div className="builder-grid">
            {muscleGroups.filter(g => g.id !== 'all').map(group => (
              <button key={group.id}
                className={`builder-chip ${selected.includes(group.id) ? 'selected' : ''}`}
                onClick={() => toggleMuscle(group.id)}>
                <span>{group.icon}</span>
                <span>{group.name}</span>
              </button>
            ))}
          </div>
          <button className="btn btn-primary btn-full"
            disabled={selected.length === 0}
            onClick={handleGenerate}>
            生成今日训练（已选 {selected.length} 个部位）
          </button>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const { isInitialized, todayLog, streak, workoutLogs, workoutPlan, profile } = useFitness()
  const navigate = useNavigate()
  const [showTabata, setShowTabata] = useState(false)

  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday']
  const todayKey = dayNames[new Date().getDay()]
  const todayDayName = workoutPlan?.days?.[todayKey]?.name || ''

  if (!isInitialized || !workoutPlan) {
    return (
      <div className="page">
        <div className="welcome-screen">
          <div className="welcome-icon">💪</div>
          <h1>欢迎来到 KEEP</h1>
          <p className="welcome-desc">你的私人健身训练计划与打卡工具</p>
          <p className="welcome-sub">先设置你的健身目标和偏好，我将为你生成专属训练计划</p>
          <button className="btn btn-primary btn-large" onClick={() => navigate('/settings')}>
            开始设置
          </button>
        </div>
      </div>
    )
  }

  const weekCompleted = Object.values(workoutLogs).filter(l => l.completed && !l.isCustom).length
  const totalWorkouts = Object.keys(workoutPlan.days).length

  return (
    <div className="page">
      <QuoteBanner />

      <div className="page-header">
        <div>
          <h1 className="page-title">今日训练</h1>
          <p className="page-subtitle">
            {getLevelLabel(profile.level)} · {getGoalLabel(profile.goal)}
          </p>
        </div>
        <div className="stats-badge">
          <span className="streak">🔥 {streak} 天</span>
        </div>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{weekCompleted}</span>
          <span className="stat-label">已完成</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{totalWorkouts}</span>
          <span className="stat-label">周计划</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">连续打卡</span>
        </div>
      </div>

      {todayLog ? (
        <div className="today-workout">
          <div className="section-header">
            <h2>📋 {todayLog.isCustom ? '自定义' : todayDayName} 训练</h2>
            {todayLog.completed ? (
              <span className="badge badge-success">已完成 ✓</span>
            ) : (
              <span className="badge badge-progress">进行中</span>
            )}
          </div>
          {todayLog.isCustom && todayLog.selectedGroups && (
            <p className="custom-tags">
              {todayLog.selectedGroups.map(g => {
                const mg = muscleGroups.find(m => m.id === g)
                return mg ? <span key={g} className="tag">{mg.icon} {mg.name}</span> : null
              })}
            </p>
          )}
          <div className="exercise-list">
            {todayLog.exercises.map((ex, idx) => (
              <ExerciseCard key={ex.id} exercise={ex} date={todayLog.date} exerciseIndex={idx} />
            ))}
          </div>
        </div>
      ) : (
        <div className="rest-day-card">
          <div className="rest-day-icon">😊</div>
          <h3>今天是休息日</h3>
          <p>好好恢复，为下一次训练充电！</p>
          <button className="btn btn-secondary" onClick={() => navigate('/plan')}>查看周计划</button>
        </div>
      )}

      <WorkoutBuilder />

      <div className="tabata-section">
        <div className="section-header">
          <h3 className="section-title">⏱️ Tabata 间歇</h3>
          <button className={`btn btn-secondary btn-sm ${showTabata ? 'active' : ''}`}
            onClick={() => setShowTabata(!showTabata)}>
            {showTabata ? '收起' : '开始'}
          </button>
        </div>
        {showTabata && <TabataTimer />}
      </div>
    </div>
  )
}
