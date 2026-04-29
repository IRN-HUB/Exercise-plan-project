import { NavLink } from 'react-router-dom'

const navItems = [
  { path: '/', label: '首页', icon: '📊' },
  { path: '/plan', label: '计划', icon: '📋' },
  { path: '/exercises', label: '动作库', icon: '🏋️' },
  { path: '/progress', label: '进度', icon: '📈' },
  { path: '/settings', label: '设置', icon: '⚙️' }
]

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-inner">
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
