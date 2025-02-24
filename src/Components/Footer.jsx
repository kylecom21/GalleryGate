const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2025 GalleryGate. All rights reserved.</p>
      <nav>
        <ul className="footer-links">
        <li>
            <a href="#" onClick={(e) => e.preventDefault()}>About</a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>Contact</a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>Terms of Use</a>
          </li>
          <li>
            <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
          </li>
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
