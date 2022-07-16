import { Routes, Route } from 'react-router-dom'
import EmulatorPage from '../pages/EmulatorPage'
import MarketPage from '../pages/MarketPage'
import MyGamesPage from '../pages/MyGamesPage'

export default function RouterPages() {
  return (
    <Routes>
      <Route path="/" element={<MyGamesPage />} />
      <Route path="/emulator" element={<EmulatorPage />} />
      <Route path="/market" element={<MarketPage />} />
    </Routes>
  )
}