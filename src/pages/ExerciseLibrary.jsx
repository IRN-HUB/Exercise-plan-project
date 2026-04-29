import { useState } from 'react'
import exercises, { muscleGroups, difficultyLabels, equipmentLabels, muscleGroupGradients, muscleGroupEmojis } from '../data/exercises'
import { useFitness } from '../context/FitnessContext'

function ExerciseVisual({ ex, size = 'medium' }) {
  const gradient = muscleGroupGradients[ex.muscleGroup] || 'linear-gradient(135deg, #6366f1, #8b5cf6)'
  const emoji = muscleGroupEmojis[ex.muscleGroup] || '💪'
  const isSmall = size === 'small'

  return (
    <div className={`exercise-visual ${isSmall ? 'small' : ''}`} style={{ background: gradient }}>
      <div className="exercise-visual-glow" style={{ background: gradient }} />
      <span className="exercise-visual-icon">{emoji}</span>
      <span className="exercise-visual-label">
        {equipmentLabels[ex.equipment] || ex.equipment}
      </span>
    </div>
  )
}

export default function ExerciseLibrary() {
  const { allExercises, customExercises, addCustomExercise, removeCustomExercise } = useFitness()
  const [activeTab, setActiveTab] = useState('library')
  const [activeGroup, setActiveGroup] = useState('all')
  const [activeDifficulty, setActiveDifficulty] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedExercise, setSelectedExercise] = useState(null)
  const [showForm, setShowForm] = useState(false)

  // Custom exercise form state
  const [form, setForm] = useState({
    name: '', englishName: '', muscleGroup: 'chest',
    difficulty: 'beginner', equipment: 'none',
    description: '', tips: '', muscles: ''
  })

  const filtered = (activeTab === 'library' ? exercises : customExercises).filter(ex => {
    if (activeGroup !== 'all' && ex.muscleGroup !== activeGroup) return false
    if (activeDifficulty !== 'all' && ex.difficulty !== activeDifficulty) return false
    if (searchQuery && !ex.name.includes(searchQuery)) return false
    return true
  })

  const handleAddCustom = () => {
    if (!form.name.trim()) return
    const id = 'custom-' + Date.now()
    addCustomExercise({
      id,
      name: form.name,
      englishName: form.englishName || form.name,
      muscleGroup: form.muscleGroup,
      difficulty: form.difficulty,
      equipment: form.equipment,
      description: form.description || '自定义动作',
      tips: form.tips || '',
      muscles: form.muscles ? form.muscles.split(/[,，、]/).map(s => s.trim()).filter(Boolean) : ['自定义']
    })
    setForm({ name: '', englishName: '', muscleGroup: 'chest', difficulty: 'beginner', equipment: 'none', description: '', tips: '', muscles: '' })
    setShowForm(false)
  }

  return (
    <div className="page">
      <div className="page-header">
        <h1 className="page-title">动作库</h1>
        <button className="btn btn-secondary btn-sm" onClick={() => setShowForm(!showForm)}>
          {showForm ? '取消' : '+ 自定义'}
        </button>
      </div>

      <div className="library-tabs">
        <button className={`library-tab ${activeTab === 'library' ? 'active' : ''}`}
          onClick={() => setActiveTab('library')}>
          官方动作库
        </button>
        <button className={`library-tab ${activeTab === 'custom' ? 'active' : ''}`}
          onClick={() => setActiveTab('custom')}>
          我的自定义 {customExercises.length > 0 && `(${customExercises.length})`}
        </button>
      </div>

      {showForm && (
        <div className="custom-exercise-form">
          <h3>添加自定义动作</h3>
          <div className="form-grid">
            <div className="form-group">
              <label>动作名称 *</label>
              <input className="form-input" value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="如：壶铃摇摆" />
            </div>
            <div className="form-group">
              <label>英文名</label>
              <input className="form-input" value={form.englishName}
                onChange={e => setForm({ ...form, englishName: e.target.value })}
                placeholder="Kettlebell Swing" />
            </div>
            <div className="form-group">
              <label>肌群</label>
              <select className="form-input" value={form.muscleGroup}
                onChange={e => setForm({ ...form, muscleGroup: e.target.value })}>
                {muscleGroups.filter(g => g.id !== 'all').map(g => (
                  <option key={g.id} value={g.id}>{g.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>难度</label>
              <select className="form-input" value={form.difficulty}
                onChange={e => setForm({ ...form, difficulty: e.target.value })}>
                <option value="beginner">初级</option>
                <option value="intermediate">中级</option>
                <option value="advanced">高级</option>
              </select>
            </div>
            <div className="form-group">
              <label>器械</label>
              <select className="form-input" value={form.equipment}
                onChange={e => setForm({ ...form, equipment: e.target.value })}>
                {Object.entries(equipmentLabels).map(([k, v]) => (
                  <option key={k} value={k}>{v}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>目标肌肉（逗号分隔）</label>
              <input className="form-input" value={form.muscles}
                onChange={e => setForm({ ...form, muscles: e.target.value })}
                placeholder="胸大肌、肱三头肌" />
            </div>
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>动作描述</label>
            <textarea className="form-input form-textarea" value={form.description}
              onChange={e => setForm({ ...form, description: e.target.value })}
              placeholder="描述这个动作的做法..." />
          </div>
          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>小提示</label>
            <input className="form-input" value={form.tips}
              onChange={e => setForm({ ...form, tips: e.target.value })}
              placeholder="动作要点提示" />
          </div>
          <button className="btn btn-primary btn-full" onClick={handleAddCustom}>
            添加动作
          </button>
        </div>
      )}

      <div className="search-bar">
        <input type="text" className="search-input"
          placeholder={activeTab === 'library' ? '搜索动作名称..."' : '搜索自定义动作..."'}
          value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
      </div>

      <div className="filter-tabs">
        {muscleGroups.map(group => (
          <button key={group.id}
            className={`filter-tab ${activeGroup === group.id ? 'active' : ''}`}
            onClick={() => setActiveGroup(group.id)}>
            <span>{group.icon}</span>
            <span>{group.name}</span>
          </button>
        ))}
      </div>

      <div className="difficulty-filters">
        {[
          { id: 'all', name: '全部' }, { id: 'beginner', name: '初级' },
          { id: 'intermediate', name: '中级' }, { id: 'advanced', name: '高级' }
        ].map(d => (
          <button key={d.id}
            className={`diff-btn ${activeDifficulty === d.id ? 'active' : ''}`}
            onClick={() => setActiveDifficulty(d.id)}>
            {d.name}
          </button>
        ))}
      </div>

      <div className="exercise-grid">
        {filtered.length === 0 ? (
          <div className="empty-search">
            <p>{activeTab === 'custom' ? '还没有自定义动作，点击右上角添加' : '没有找到匹配的动作'}</p>
          </div>
        ) : (
          filtered.map(ex => {
            const isCustom = ex.id.startsWith('custom-')
            return (
              <div key={ex.id}
                className={`library-card ${selectedExercise?.id === ex.id ? 'expanded' : ''}`}
                onClick={() => setSelectedExercise(selectedExercise?.id === ex.id ? null : ex)}>
                <div className="library-card-main">
                  <ExerciseVisual ex={ex} />
                  <div className="library-card-content">
                    <div className="library-card-header">
                      <h3 className="library-card-name">{ex.name}</h3>
                      <span className={`diff-tag ${ex.difficulty}`}>
                        {difficultyLabels[ex.difficulty]}
                      </span>
                    </div>
                    <div className="library-card-tags">
                      <span className="tag">{equipmentLabels[ex.equipment]}</span>
                      <span className="tag">{ex.muscles.slice(0, 2).join('、')}</span>
                    </div>
                  </div>
                  {isCustom && (
                    <button className="remove-btn" onClick={e => {
                      e.stopPropagation()
                      removeCustomExercise(ex.id)
                    }}>✕</button>
                  )}
                </div>

                {selectedExercise?.id === ex.id && (
                  <div className="library-card-detail">
                    <p className="detail-desc">{ex.description}</p>
                    {ex.tips && <p className="detail-tips">💡 {ex.tips}</p>}
                    <div className="detail-muscles">
                      <strong>目标肌群：</strong>
                      {ex.muscles.join('、')}
                    </div>
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
