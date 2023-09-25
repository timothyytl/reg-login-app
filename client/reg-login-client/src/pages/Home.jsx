import { Container } from "react-bootstrap"

export default function Home() {
  return (
    <Container className="d-flex flex-column w-100 vh-100 pt-6 text-dark justify-content-center align-items-center mx-8 container-fluid">
      <div className="bg-white border border-light rounded p-5 shadow-lg w-75">
        <h1 className="text-primary text-center mb-3">
          Welcome to my React Project!
        </h1>
        <p className="text-center text-lg">
          This is my User Registration Form and Login project fully built with
          PERN stack (PostgresQL, Express.js, React, Node.js). This project
          utilises a serverless Postgres database called Neon and the database
          stores the basic information of users upon registration such as their
          name, email, and password (which is encrypted in the database) and
          allows users access to the main dashboard page with their given email
          and password. Once access to the dashboard is granted, users are able
          to view the dashboard page and logout whenever they are ready. This
          project showcases a basic full stack application with user
          authentication commonly used in most web and mobile applications
          today.
        </p>
      </div>
    </Container>
  )
}
