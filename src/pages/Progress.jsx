import { useState, useMemo } from 'react'
import { useFitness } from '../context/FitnessContext'
import { formatDate, getChineseWeekday, calculateStreak } from '../utils/helpers'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts'

const MONTHS = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']

export default function Progress() {
  const { workoutLogs, bodyMetrics, streak } = useFitness()
  const [showMetricForm, setShowMetricForm] = useState(false)
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear())
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth())

  const goPrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11)
      setCalendarYear(calendarYear - 1)
    } else {
      setCalendarMonth(calendarMonth - 1)
    }
  }

  const goNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0)
      setCalendarYear(calendarYear + 1)
    } else {
      setCalendarMonth(calendarMonth + 1)
    }
  }

  const goToCurrentMonth = () => {
    setCalendarMonth(new Date().getMonth())
    setCalendarYear(new Date().getFullYear())
  }

  const { monthlyData, weekData, calendarDays, monthStats } = useMemo(() => {
    const today = new Date()

    // Last 30 days chart data
    const last30 = []
    for (let i = 29; i >= 0; i--) {
      const d = new Date(today)
      d.setDate(today.getDate() - i)
      const dateStr = formatDate(d)
      const log = workoutLogs[dateStr]
      last30.push({
        date: dateStr.slice(5),
        completed: log?.completed ? 1 : 0,
        dayName: getChineseWeekday(dateStr)
      })
    }

    // This week data
    const weekDays = []
    const dayOfWeek = today.getDay()
    const diff = dayOfWeek === 0 ? -6 : 1 - dayOfWeek
    for (let i = 0; i < 7; i++) {
      const d = new Date(today)
      d.setDate(today.getDate() + diff + i)
      const dateStr = formatDate(d)
      const log = workoutLogs[dateStr]
      weekDays.push({
        name: getChineseWeekday(dateStr),
        completed: log?.completed ? 1 : 0,
        date: dateStr
      })
    }

    // Calendar for selected month
    const days = []
    const firstDay = new Date(calendarYear, calendarMonth, 1)
    const lastDay = new Date(calendarYear, calendarMonth + 1, 0)
    const startPadding = firstDay.getDay()

    for (let p = 0; p < startPadding; p++) {
      days.push({ day: null, date: null, hasLog: false, completed: false, padding: true })
    }

    let monthCompleted = 0
    let monthTotal = 0
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const d = new Date(calendarYear, calendarMonth, i)
      const dateStr = formatDate(d)
      const log = workoutLogs[dateStr]
      const isCompleted = log?.completed || false
      days.push({
        day: i, date: dateStr,
        hasLog: !!workoutLogs[dateStr],
        completed: isCompleted,
        padding: false
      })
      monthTotal++
      if (isCompleted) monthCompleted++
    }

    const isCurrentMonth = calendarMonth === today.getMonth() && calendarYear === today.getFullYear()

    return {
      monthlyData: last30,
      weekData: weekDays,
      calendarDays: days,
      monthStats: {
        completed: monthCompleted,
        total: monthTotal,
        rate: monthTotal > 0 ? Math.round((monthCompleted / monthTotal) * 100) : 0,
        isCurrentMonth
      }
    }
  }, [workoutLogs, calendarYear, calendarMonth])

  const totalWorkouts = Object.values(workoutLogs).filter(l => l.completed).length

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip">
          <p className="chart-tooltip-label">{label}</p>
          <p className="chart-tooltip-value">{payload[0].value ? '训练完成 ✓' : '休息/未完成'}</p>
        </div>
      )
    }
    return null
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">进度追踪</h1>
        <span className="stats-badge">🔥 {streak} 天</span>
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-value">{totalWorkouts}</span>
          <span className="stat-label">总训练</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{monthStats.rate}%</span>
          <span className="stat-label">{MONTHS[calendarMonth]}完成率</span>
        </div>
        <div className="stat-card">
          <span className="stat-value">{streak}</span>
          <span className="stat-label">连续打卡</span>
        </div>
      </div>

      <div className="chart-section">
        <h2 className="section-title">📊 近30天</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={140}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorCompleted" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#4ade80" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#4ade80" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
              <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 10 }} interval={4} />
              <YAxis domain={[0, 1.5]} ticks={[0, 1]} tick={{ fill: '#888', fontSize: 10 }}
                tickFormatter={v => v === 1 ? '✓' : ''} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="stepAfter" dataKey="completed" stroke="#4ade80" fill="url(#colorCompleted)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <h2 className="section-title">📅 本周</h2>
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={140}>
            <BarChart data={weekData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" vertical={false} />
              <XAxis dataKey="name" tick={{ fill: '#888', fontSize: 11 }} />
              <YAxis domain={[0, 1.5]} ticks={[0, 1]} hide />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="completed" radius={[4, 4, 0, 0]}
                shape={props => {
                  const { x, y, width, height, payload } = props
                  return (
                    <rect x={x} y={y} width={width} height={height}
                      rx={4} ry={4}
                      fill={payload.completed ? '#4ade80' : '#2a2a3e'}
                      stroke={payload.completed ? '#4ade80' : '#3a3a4e'}
                      strokeWidth={1} />
                  )
                }} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="chart-section">
        <div className="calendar-header">
          <button className="calendar-nav" onClick={goPrevMonth}>◀</button>
          <div className="calendar-title-area">
            <h2 className="section-title">{calendarYear}年 {MONTHS[calendarMonth]}</h2>
            {!monthStats.isCurrentMonth && (
              <button className="btn btn-secondary btn-sm" onClick={goToCurrentMonth}>回到本月</button>
            )}
          </div>
          <button className="calendar-nav" onClick={goNextMonth}>▶</button>
        </div>
        <div className="calendar-weekdays">
          {['日', '一', '二', '三', '四', '五', '六'].map(d => (
            <span key={d} className="calendar-weekday">{d}</span>
          ))}
        </div>
        <div className="mini-calendar">
          {calendarDays.map((d, idx) => (
            d.padding ? (
              <div key={`p-${idx}`} className="calendar-cell padding" />
            ) : (
              <div key={d.day}
                className={`calendar-cell ${d.completed ? 'completed' : d.hasLog ? 'partial' : ''}`}
                title={`${d.date}${d.completed ? ' ✓' : ''}`}>
                <span className="calendar-day">{d.day}</span>
              </div>
            )
          ))}
        </div>
        <div className="calendar-legend">
          <span><span className="legend-dot completed" /> 完成</span>
          <span><span className="legend-dot partial" /> 部分</span>
          <span><span className="legend-dot" /> 休息</span>
        </div>
      </div>

      {bodyMetrics.length > 0 && (
        <div className="chart-section">
          <h2 className="section-title">⚖️ 体重变化</h2>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={bodyMetrics.sort((a, b) => a.date.localeCompare(b.date))}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2a2a3e" />
                <XAxis dataKey="date" tick={{ fill: '#888', fontSize: 10 }}
                  tickFormatter={v => v.slice(5)} />
                <YAxis domain={['auto', 'auto']} tick={{ fill: '#888', fontSize: 10 }}
                  tickFormatter={v => `${v}kg`} />
                <Tooltip />
                <Line type="monotone" dataKey="weight" stroke="#4ade80" strokeWidth={2}
                  dot={{ fill: '#4ade80', r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      <MetricSection />
    </div>
  )
}

function MetricSection() {
  const { bodyMetrics, dispatch } = useFitness()
  const [showForm, setShowForm] = useState(false)
  const [weight, setWeight] = useState('')
  const [bodyFat, setBodyFat] = useState('')

  const handleSave = () => {
    if (!weight && !bodyFat) return
    dispatch({
      type: 'ADD_BODY_METRIC',
      payload: {
        date: formatDate(),
        weight: weight ? Number(weight) : null,
        bodyFat: bodyFat ? Number(bodyFat) : null
      }
    })
    setShowForm(false)
    setWeight('')
    setBodyFat('')
  }

  return (
    <div className="chart-section">
      <div className="section-header">
        <h2 className="section-title">⚖️ 记录身体指标</h2>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? '取消' : '记录'}
        </button>
      </div>
      {showForm && (
        <div className="metric-form">
          <div className="form-row">
            <div className="form-group">
              <label>体重 (kg)</label>
              <input type="number" step="0.1" className="form-input"
                value={weight} onChange={e => setWeight(e.target.value)}
                placeholder="70" />
            </div>
            <div className="form-group">
              <label>体脂率 (%)</label>
              <input type="number" step="0.1" className="form-input"
                value={bodyFat} onChange={e => setBodyFat(e.target.value)}
                placeholder="15" />
            </div>
          </div>
          <button className="btn btn-primary" onClick={handleSave}>保存记录</button>
        </div>
      )}
      {bodyMetrics.length > 0 && (
        <div className="metrics-list">
          {[...bodyMetrics].reverse().slice(0, 5).map(m => (
            <div key={m.date} className="metric-item">
              <span className="metric-date">{m.date}</span>
              <span>{m.weight && `${m.weight}kg`}</span>
              <span>{m.bodyFat && `${m.bodyFat}%`}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
