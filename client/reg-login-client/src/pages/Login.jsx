import { useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "./AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [values, setValues] = useState({
    email: "",
    password: "",
  })

  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(values),
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(
        "https://reg-login-app-server.vercel.app//login",
        options
      )
      if (res.ok) {
        const data = await res.json()
        setValues(data)
        authContext.setToken("12345")
        navigate("/dashboard")
      } else {
        alert(
          `⛔️ Tim says "The email or password you've entered is incorrect! 🙈`
        )
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <Container className="bg-transparent d-flex flex-column w-100 vh-100 bg-white pt-6 text-dark justify-content-center align-items-center mx-8">
      <Form className="bg-white border border-light rounded p-5 shadow-lg">
        <h1 className="text-primary text-center">Login</h1>
        <Form.Group className="my-3" controlId="formBasicEmail">
          <Form.Label className="text-primary">Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="text-primary">Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <p className="text-secondary fs-6 mt-3">
          Don&apos;t have an account?&nbsp;&nbsp;
          <Link to="/Signup" className="text-primary">
            Sign Up
          </Link>
        </p>
        <Button variant="primary" className="mt-2 w-100" onClick={handleLogin}>
          Login
        </Button>
      </Form>
    </Container>
  )
}
