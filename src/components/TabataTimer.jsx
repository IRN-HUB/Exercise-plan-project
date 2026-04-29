import { useState, useEffect, useRef, useCallback } from 'react'

const PHASES = {
  PREP: 'prep',
  WORK: 'work',
  REST: 'rest',
  DONE: 'done'
}

export default function TabataTimer() {
  const [workSeconds, setWorkSeconds] = useState(20)
  const [restSeconds, setRestSeconds] = useState(10)
  const [rounds, setRounds] = useState(8)
  const [currentRound, setCurrentRound] = useState(1)
  const [seconds, setSeconds] = useState(5)
  const [phase, setPhase] = useState(PHASES.PREP)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef(null)
  const audioCtxRef = useRef(null)

  const beep = useCallback((frequency = 800, duration = 150) => {
    try {
      if (!audioCtxRef.current) {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)()
      }
      const osc = audioCtxRef.current.createOscillator()
      const gain = audioCtxRef.current.createGain()
      osc.connect(gain)
      gain.connect(audioCtxRef.current.destination)
      osc.frequency.value = frequency
      osc.type = 'sine'
      gain.gain.setValueAtTime(0.3, audioCtxRef.current.currentTime)
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtxRef.current.currentTime + duration / 1000)
      osc.start()
      osc.stop(audioCtxRef.current.currentTime + duration / 1000)
    } catch {}
  }, [])

  const stopTimer = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }, [])

  const start = useCallback(() => {
    if (isRunning) {
      stopTimer()
      return
    }

    setPhase(PHASES.PREP)
    setSeconds(5)
    setCurrentRound(1)
    setIsRunning(true)

    intervalRef.current = setInterval(() => {
      setSeconds(prev => prev - 1)
    }, 1000)
  }, [isRunning, stopTimer])

  useEffect(() => {
    if (!isRunning) return

    if (phase === PHASES.DONE) {
      stopTimer()
      return
    }

    if (seconds <= 0) {
      beep(phase === PHASES.WORK ? 600 : 800, 200)

      if (phase === PHASES.PREP) {
        setPhase(PHASES.WORK)
        setSeconds(workSeconds)
      } else if (phase === PHASES.WORK) {
        if (currentRound >= rounds) {
          setPhase(PHASES.DONE)
          beep(1000, 500)
          stopTimer()
        } else {
          setPhase(PHASES.REST)
          setSeconds(restSeconds)
        }
      } else if (phase === PHASES.REST) {
        setCurrentRound(r => r + 1)
        setPhase(PHASES.WORK)
        setSeconds(workSeconds)
      }
      return
    }

    if (seconds <= 3 && seconds > 0) {
      beep(phase === PHASES.WORK ? 440 : 550, 100)
    }
  }, [seconds, phase, isRunning, currentRound, rounds, workSeconds, restSeconds, beep, stopTimer])

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (audioCtxRef.current) audioCtxRef.current.close()
    }
  }, [])

  const reset = () => {
    stopTimer()
    setPhase(PHASES.PREP)
    setSeconds(5)
    setCurrentRound(1)
  }

  const formatTime = (s) => `${String(Math.floor(s / 60))}:${String(s % 60).padStart(2, '0')}`
  const totalSeconds = phase === PHASES.WORK ? workSeconds : phase === PHASES.REST ? restSeconds : 5
  const radius = 70
  const circumference = 2 * Math.PI * radius
  const progress = totalSeconds > 0 ? seconds / totalSeconds : 0

  const getPhaseLabel = () => {
    switch (phase) {
      case PHASES.PREP: return '准备'
      case PHASES.WORK: return '训练'
      case PHASES.REST: return '休息'
      case PHASES.DONE: return '完成'
    }
  }

  const getPhaseColor = () => {
    switch (phase) {
      case PHASES.PREP: return '#6366f1'
      case PHASES.WORK: return '#ef4444'
      case PHASES.REST: return '#4ade80'
      case PHASES.DONE: return '#f59e0b'
    }
  }

  return (
    <div className="tabata-timer">
      <h3 className="tabata-title">⏱️ Tabata 间歇训练</h3>

      <div className="tabata-ring-container">
        <svg className="tabata-ring" width="170" height="170" viewBox="0 0 170 170">
          <circle cx="85" cy="85" r={radius} fill="none" stroke="#1a1a2e" strokeWidth="8" />
          <circle
            cx="85" cy="85" r={radius}
            fill="none"
            stroke={getPhaseColor()}
            strokeWidth="8"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - progress)}
            strokeLinecap="round"
            transform="rotate(-90 85 85)"
            style={{ transition: 'stroke-dashoffset 0.3s linear, stroke 0.3s' }}
          />
        </svg>
        <div className="tabata-text">
          <span className="tabata-phase" style={{ color: getPhaseColor() }}>{getPhaseLabel()}</span>
          <span className="tabata-display">{formatTime(seconds)}</span>
          {phase !== PHASES.PREP && phase !== PHASES.DONE && (
            <span className="tabata-round">{currentRound}/{rounds}</span>
          )}
        </div>
      </div>

      {!isRunning && phase !== PHASES.DONE && (
        <div className="tabata-config">
          <div className="tabata-config-row">
            <label>
              <span>训练</span>
              <input type="number" min="5" max="60" value={workSeconds}
                onChange={e => setWorkSeconds(Number(e.target.value))} />
              <span>秒</span>
            </label>
            <label>
              <span>休息</span>
              <input type="number" min="5" max="60" value={restSeconds}
                onChange={e => setRestSeconds(Number(e.target.value))} />
              <span>秒</span>
            </label>
            <label>
              <span>轮次</span>
              <input type="number" min="1" max="20" value={rounds}
                onChange={e => setRounds(Number(e.target.value))} />
            </label>
          </div>
        </div>
      )}

      <div className="tabata-controls">
        {phase === PHASES.DONE ? (
          <>
            <span className="tabata-done-msg">🎉 训练完成！</span>
            <button className="btn btn-secondary" onClick={reset}>重新开始</button>
          </>
        ) : (
          <button className={`tabata-btn ${isRunning ? 'running' : ''}`} onClick={start}>
            {isRunning ? '停止' : phase === PHASES.PREP ? '开始训练' : '继续'}
          </button>
        )}
      </div>
    </div>
  )
}
