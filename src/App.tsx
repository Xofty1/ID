import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import BirthdayPage from './pages/BirthdayPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/birthday" element={<BirthdayPage />} />
      </Routes>
    </BrowserRouter>
  )
}
