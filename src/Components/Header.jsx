import { Link } from "react-router-dom"
import Logo from "../Assets/Logo.jpg"

const Header = () => {
    return (
      <header className="header">
        <h1 className="title">
          <Link to="/">GalleryGate</Link>
          </h1>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/artworks" className="nav-link">Artworks</Link>
            </li>
            <li>
              <Link to="/exhibitions" className="nav-link">Exhibitions</Link>
            </li>
            <li>
              <Link to="/search" className="nav-link">Search </Link>
            </li>
          </ul>
        </nav>
      </header>
    );
  };

export default Header   