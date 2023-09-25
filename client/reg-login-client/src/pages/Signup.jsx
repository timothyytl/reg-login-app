import { useContext, useState } from "react"
import { Button, Container, Form } from "react-bootstrap"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "./AuthContext"

export default function Signup() {
  const navigate = useNavigate()
  const authContext = useContext(AuthContext)

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  })

  const submitDisabled = !(values.name && values.email && values.password)

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

  const handleSubmit = async () => {
    try {
      const res = await fetch("http://localhost:3000/signup", options)
      if (res.ok) {
        const data = await res.json()
        setValues(data)
        authContext.setToken("12345")
        navigate("/dashboard")
        console.log("User signed up successfully")
      } else {
        alert("The email is already taken!")
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <Container className="bg-transparent d-flex flex-column w-100 vh-100 bg-white pt-6 text-dark justify-content-center align-items-center mx-8">
      <Form className="bg-white border border-light rounded p-5 shadow-lg">
        <h1 className="text-primary d-flex justify-content-center">
          Create an account
        </h1>
        <Form.Group className="my-3" controlId="formSignupName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Name"
            name="name"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="my-3" controlId="formSignupEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Email address"
            name="email"
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formSignupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
        </Form.Group>
        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            className="mt-2 w-100"
            onClick={handleSubmit}
            disabled={submitDisabled}
          >
            Sign Up
          </Button>
        </div>
        <p className="d-flex justify-content-center mt-3 text-secondary">
          Already have an account?&nbsp;&nbsp;<Link to="/login">Login</Link>
        </p>
        <footer className="mt-4">
          <p className="text-center fs-6 text-secondary">
            By signing up to create an account I accept Timwork&apos;s Terms of
            Use and Privacy Policy
          </p>
        </footer>
      </Form>
    </Container>
  )
}
