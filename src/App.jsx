import { Routes, Route } from 'react-router-dom'
import { FitnessProvider } from './context/FitnessContext'
import Navbar from './components/Navbar'
import BackgroundEffect from './components/BackgroundEffect'
import Home from './pages/Home'
import Plan from './pages/Plan'
import ExerciseLibrary from './pages/ExerciseLibrary'
import Progress from './pages/Progress'
import Settings from './pages/Settings'

export default function App() {
  return (
    <FitnessProvider>
      <BackgroundEffect />
      <div className="app">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/plan" element={<Plan />} />
            <Route path="/exercises" element={<ExerciseLibrary />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </FitnessProvider>
  )
}
