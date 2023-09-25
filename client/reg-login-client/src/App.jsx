import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Dashboard from "./pages/Dashboard"
import { AuthContext } from "./pages/AuthContext"
import RequireAuth from "./components/RequireAuth"
import useLocalStorage from "use-local-storage"
import Navbar from "./Navbar"

export default function App() {
  const [token, setToken] = useLocalStorage("token", null)
  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Signup />} path="/signup" />
          <Route
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
            path="/dashboard"
          />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  )
}
