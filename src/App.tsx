import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BirthdayPage from './pages/BirthdayPage'

export default function App() {
  return (
    <BrowserRouter basename="/ID">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/birthday" element={<BirthdayPage />} />
      </Routes>
    </BrowserRouter>
  )
}
