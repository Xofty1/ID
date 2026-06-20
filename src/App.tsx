import { HashRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BirthdayPage from './pages/BirthdayPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/birthday" element={<BirthdayPage />} />
      </Routes>
    </HashRouter>
  )
}
