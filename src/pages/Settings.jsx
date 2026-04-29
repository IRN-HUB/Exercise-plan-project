import { useState } from 'react'
import { useFitness } from '../context/FitnessContext'
import { getGoalLabel, getLevelLabel, getEquipmentLabel } from '../utils/workoutGenerator'

export default function Settings() {
  const { profile, isInitialized, initProfile, dispatch, workoutPlan } = useFitness()

  const [form, setForm] = useState({
    level: profile?.level || 'beginner',
    goal: profile?.goal || 'keep_fit',
    daysPerWeek: profile?.daysPerWeek || 3,
    equipment: profile?.equipment || 'none'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    initProfile(form)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">设置</h1>
      </div>

      <div className="settings-section">
        <h2 className="section-title">🏋️ 健身设置</h2>
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="form-group">
            <label>训练水平</label>
            <div className="option-group">
              {[
                { value: 'beginner', label: '初级', desc: '新手或重新开始锻炼' },
                { value: 'intermediate', label: '中级', desc: '有一定训练基础' },
                { value: 'advanced', label: '高级', desc: '长期规律训练' }
              ].map(opt => (
                <label key={opt.value} className={`option-card ${form.level === opt.value ? 'selected' : ''}`}>
                  <input type="radio" name="level" value={opt.value}
                    checked={form.level === opt.value}
                    onChange={e => setForm({ ...form, level: e.target.value })} />
                  <span className="option-value">{opt.label}</span>
                  <span className="option-desc">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>训练目标</label>
            <div className="option-group">
              {[
                { value: 'lose_fat', label: '减脂', desc: '燃脂塑形，降低体脂率' },
                { value: 'build_muscle', label: '增肌', desc: '增加肌肉量和力量' },
                { value: 'keep_fit', label: '保持体能', desc: '维持体能和健康' }
              ].map(opt => (
                <label key={opt.value} className={`option-card ${form.goal === opt.value ? 'selected' : ''}`}>
                  <input type="radio" name="goal" value={opt.value}
                    checked={form.goal === opt.value}
                    onChange={e => setForm({ ...form, goal: e.target.value })} />
                  <span className="option-value">{opt.label}</span>
                  <span className="option-desc">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>每周训练天数</label>
            <div className="days-selector">
              {[2, 3, 4, 5, 6].map(n => (
                <button
                  key={n}
                  type="button"
                  className={`day-btn ${form.daysPerWeek === n ? 'active' : ''}`}
                  onClick={() => setForm({ ...form, daysPerWeek: n })}
                >
                  {n}天
                </button>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>可用器械</label>
            <div className="option-group">
              {[
                { value: 'none', label: '无器械', desc: '仅使用自身体重训练' },
                { value: 'dumbbell', label: '哑铃', desc: '有一定重量的哑铃' },
                { value: 'bar', label: '单杠', desc: '引体向上杠等' },
                { value: 'gripper', label: '臂力棒', desc: '臂力棒/握力器等力量器械' }
              ].map(opt => (
                <label key={opt.value} className={`option-card ${form.equipment === opt.value ? 'selected' : ''}`}>
                  <input type="radio" name="equipment" value={opt.value}
                    checked={form.equipment === opt.value}
                    onChange={e => setForm({ ...form, equipment: e.target.value })} />
                  <span className="option-value">{opt.label}</span>
                  <span className="option-desc">{opt.desc}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            {isInitialized ? '更新计划' : '开始我的健身之旅'}
          </button>
        </form>
      </div>

      {isInitialized && profile && (
        <div className="settings-section">
          <h2 className="section-title">📊 当前计划</h2>
          <div className="current-plan-info">
            <div className="plan-info-item">
              <span className="info-label">水平</span>
              <span className="info-value">{getLevelLabel(profile.level)}</span>
            </div>
            <div className="plan-info-item">
              <span className="info-label">目标</span>
              <span className="info-value">{getGoalLabel(profile.goal)}</span>
            </div>
            <div className="plan-info-item">
              <span className="info-label">每周</span>
              <span className="info-value">{profile.daysPerWeek} 天</span>
            </div>
            <div className="plan-info-item">
              <span className="info-label">器械</span>
              <span className="info-value">{getEquipmentLabel(profile.equipment)}</span>
            </div>
            <div className="plan-info-item">
              <span className="info-label">动作数</span>
              <span className="info-value">
                {workoutPlan ? Object.values(workoutPlan.days).reduce((s, d) => s + d.exercises.length, 0) : 0}
              </span>
            </div>
          </div>
        </div>
      )}

      {isInitialized && (
        <div className="settings-section danger-section">
          <h2 className="section-title">⚠️ 数据管理</h2>
          <p className="danger-desc">重置会清除所有训练记录和设置，此操作不可撤销。</p>
          <button className="btn btn-danger" onClick={() => {
            if (window.confirm('确定要重置所有数据吗？此操作不可撤销！')) {
              dispatch({ type: 'RESET_DATA' })
            }
          }}>
            重置所有数据
          </button>
        </div>
      )}
    </div>
  )
}
