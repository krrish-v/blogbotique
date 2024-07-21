import { Routes, Route } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Home from './pages/Home'

function App() {

  return (
    <>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
