import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import metHeavenly from "/src/assets/Met-heavenly.jpg";
import vermeer from "/src/assets/vermeer.jpeg";
import rijksArt from "/src/assets/rijks-art.jpeg";
import rijksMuseum from "/src/assets/Rijks_Museum_Library.jpg";
import metInterior from "/src/assets/met-interior.jpg";
import ArtworkSpotlight from "/ArtworkSpotlight";

const Home = () => {
  const carouselImages = [
    { src: metHeavenly, alt: "Heavenly artwork from the Met Museum" },
    { src: vermeer, alt: "Famous Vermeer painting" },
    { src: rijksMuseum, alt: "Rijksmuseum Library interior" },
    { src: rijksArt, alt: "Dutch artwork from the Rijksmuseum" },
    { src: metInterior, alt: "Inside view of the Met Museum" },
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
    accessibility: true,
  };

  return (
    <div className="home-container">
      <section className="carousel-section">
        <Slider {...sliderSettings}>
          {carouselImages.map((image, index) => (
            <div key={index} className="carousel-slide">
              <img
                src={image.src}
                alt={image.alt}
                className="carousel-image"
              />
            </div>
          ))}
        </Slider>
      </section>
      <div className="after-carousel">
        <h1 className="page-title">Welcome to GalleryGate</h1>
        <p className="page-subtitle">
          Step through the gateway to world-class art from the Metropolitan
          Museum and Rijksmuseum.
        </p>
      </div>
      <section className="artwork-section">
        <ArtworkSpotlight />
      </section>
    </div>
  );
};

export default Home;
