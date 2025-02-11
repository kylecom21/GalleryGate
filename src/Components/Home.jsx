import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import metHeavenly from "../assets/Met-heavenly.jpg";
import vermeer from "../assets/vermeer.jpeg";
import rijksArt from "../assets/rijks-art.jpeg";
import rijksMuseum from "../assets/Rijks_Museum_Library.jpg";
import metInterior from "../assets/met-interior.jpg";

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
    </div>
  );
};

export default Home;
