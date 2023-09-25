import { Link } from "react-router-dom"

export default function Navbar() {
  return (
    <nav className="nav container-fluid sticky-top d-flex justify-content-around">
      <Link to="/">
        <img
          src="https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png"
          alt=""
          width="40px"
        />
        <h2 className="mx-4"> React Project</h2>
      </Link>
      <ul>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/signup">Signup</Link>
        </li>
      </ul>
    </nav>
  )
}
