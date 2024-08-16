import { Routes, Route, Router } from 'react-router-dom'
import Dashboard from "./pages/Dashboard"
import Home from './pages/Home'
import LogIn from './pages/Login'
import SignUp from './pages/SignUp'
import ProjectsPage from './pages/Projects'
import MyBlogs from './pages/MyBlogs'
import Welcome from './pages/Welcome'
import { AuthProvider } from './contexts/AuthContext'
import { AppProvider } from './contexts/AppContext'
function App() {

  return (
    <>
      <AppProvider>
        <AuthProvider>
          <Routes >
            <Route path="/" element={<Home />} />
            <Route path="/Dashboard" element={<Dashboard />} />
            <Route path="/Login" element={<LogIn />} />
            <Route path="/Signup" element={<SignUp />} />
            <Route path="/Welcome" element={<Welcome />} />
            <Route path="/MyProjects" element={<ProjectsPage />} />
            <Route path="/MyBlogs" element={<MyBlogs />} />
          </Routes>
        </AuthProvider>
      </AppProvider >
    </>
  )
}

export default App
