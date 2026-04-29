import { useState, useEffect, useRef } from 'react'

export default function RestTimer({ defaultSeconds = 60 }) {
  const [seconds, setSeconds] = useState(defaultSeconds)
  const [isRunning, setIsRunning] = useState(false)
  const [initialSeconds, setInitialSeconds] = useState(defaultSeconds)
  const intervalRef = useRef(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  const start = (secs = initialSeconds) => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    setSeconds(secs)
    setInitialSeconds(secs)
    setIsRunning(true)
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current)
          intervalRef.current = null
          setIsRunning(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) clearInterval(intervalRef.current)
    intervalRef.current = null
    setIsRunning(false)
    setSeconds(initialSeconds)
  }

  const formatTime = (s) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${String(sec).padStart(2, '0')}`
  }

  const radius = 54
  const circumference = 2 * Math.PI * radius
  const progress = initialSeconds > 0 ? seconds / initialSeconds : 0

  return (
    <div className="rest-timer">
      <div className="timer-ring-container">
        <svg className="timer-ring" width="130" height="130" viewBox="0 0 130 130">
          <circle cx="65" cy="65" r={radius} fill="none" stroke="#2a2a3e" strokeWidth="6" />
          <circle
            cx="65" cy="65" r={radius}
            fill="none"
            stroke={seconds <= 10 ? '#ef4444' : '#4ade80'}
            strokeWidth="6"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            transform="rotate(-90 65 65)"
            style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.3s' }}
          />
        </svg>
        <div className="timer-text">
          <span className="timer-display">{formatTime(seconds)}</span>
          <span className="timer-label">休息</span>
        </div>
      </div>
      <div className="timer-controls">
        <button
          className="timer-btn start"
          onClick={() => isRunning ? stop() : start()}
        >
          {isRunning ? '停止' : '开始'}
        </button>
        <div className="timer-presets">
          {[30, 60, 90, 120].map(sec => (
            <button
              key={sec}
              className={`preset-btn ${initialSeconds === sec ? 'active' : ''}`}
              onClick={() => setInitialSeconds(sec)}
            >
              {sec < 60 ? `${sec}秒` : `${sec / 60}分`}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
