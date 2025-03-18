import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();
  return (
    <header className="header">
      <h1 className="title">
        <Link to="/">GalleryGate</Link>
      </h1>
      <nav>
        <ul className="nav-links">
          <li>
            <Link
              to="/artworks"
              className={`nav-link ${location.pathname === "/artworks" ? "active" : ""}`}
            >
              Artworks
            </Link>
          </li>
          <li>
            <Link
              to="/exhibitions"
              className={`nav-link ${location.pathname === "/exhibitions" ? "active" : ""}`}
            >
              Exhibitions
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
