import { Container, Row, Col, Card, Button } from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export default function Dashboard() {
  const navigate = useNavigate()

  function logout() {
    localStorage.removeItem("token")
    navigate("/login")
  }

  return (
    <Container className="d-flex flex-column w-100 vh-70 pt-6 text-dark justify-content-center align-items-center mx-8">
      <Row>
        <Col>
          <Card className="my-3">
            <Card.Body className="p-5 text-center">
              <h1 className="text-primary mb-3">Dashboard</h1>
              <Card.Title className="text-secondary fs-2 mb-3">
                Hello there! Welcome to your Dashboard 😊
              </Card.Title>
              <Card.Text className="text-secondary">
                This is the main page of the project and it is intentionally
                left empty for testing purposes. I hope you have enjoyed the
                overall presentation and function of this full-stack project so
                far and I certainly will improve on it in the near future
                (replacing the login button with the logout button on the navbar
                as an example..) as there are still much more to learn and
                improve on as a programmer. Thank you for your time and have a
                wonderful day ahead. Cheers! 👋🏻😊
              </Card.Text>
              <div>
                <img
                  className="img-fluid rounded mx-auto d-block"
                  src="https://c4.wallpaperflare.com/wallpaper/362/276/920/nature-4k-pc-full-hd-wallpaper-thumb.jpg"
                ></img>
              </div>
              <div className="text-center">
                <Button
                  variant="success"
                  onClick={logout}
                  className="w-25 mt-5"
                >
                  Logout
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
