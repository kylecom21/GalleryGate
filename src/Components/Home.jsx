import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import metHeavenly from "../assets/Met-heavenly.jpg";
import vermeer from "../assets/vermeer.jpeg";
import rijksArt from "../assets/rijks-art.jpeg";
import rijksMuseum from "../assets/Rijks_Museum_Library.jpg";
import metInterior from "../assets/met-interior.jpg";
import { Link } from "react-router-dom";

const Home = () => {
  const carouselImages = [
    metHeavenly,
    vermeer,
    rijksMuseum,
    rijksArt,
    metInterior,
  ];

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    fade: true,
  };

  const featuredExhibitions = [
    {
      id: 1,
      title: "Ancient Treasures",
      description: "A journey through antiquities.",
      image: "https://example.com/exhibition1.jpg",
    },
    {
      id: 2,
      title: "Masterpieces of Fine Art",
      description: "Discover timeless artworks.",
      image: "https://example.com/exhibition2.jpg",
    },
    {
      id: 3,
      title: "Sculptures and Beyond",
      description: "Explore classical sculptures.",
      image: "https://example.com/exhibition3.jpg",
    },
  ];

  return (
    <div className="home-container">
      <section className="carousel-section">
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </section>
      <div className="after-carousel">
        <h1 className="page-title">Welcome to GalleryGate</h1>
        <p className="page-subtitle">
        Step through the gateway to world-class art from the Metropolitan Museum and Rijksmuseum.
        </p>
      </div>
      <section className="featured-exhibitions">
        <h2>Featured Exhibitions</h2>
        <div className="exhibitions-grid">
          {featuredExhibitions.map((exhibition) => (
            <div key={exhibition.id} className="exhibition-card">
              <img src={exhibition.image} alt={exhibition.title} className="exhibition-image" />
              <div className="exhibition-info">
                <h3>{exhibition.title}</h3>
                <p>{exhibition.description}</p>
                <Link to={`/exhibitions/${exhibition.id}`} className="btn btn-link">
                  View Exhibition
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
