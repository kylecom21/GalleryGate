import { Link } from "react-router-dom"
import Logo from "../Assets/Logo.jpg"

const Header = () => {
    return (
      <header className="header">
        <h1 className="title">Exhibitions</h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/artworks" className="nav-link">Artworks</Link>
            </li>
            <li>
              <Link to="/exhibitions" className="nav-link">Exhibitions</Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  };

export default Header   