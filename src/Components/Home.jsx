import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ArtworkSpotlight from "./ArtworkSpotlight";

const Home = () => {
  const carouselImages = [
    { src: "/Met-heavenly.jpg", alt: "Heavenly artwork from the Met Museum" },
    { src: "/vermeer.jpeg", alt: "Famous Vermeer painting" },
    { src: "/Rijks_Museum_Library.jpg", alt: "Rijksmuseum Library interior" },
    { src: "/rijks-art.jpeg", alt: "Dutch artwork from the Rijksmuseum" },
    { src: "/met-interior.jpg", alt: "Inside view of the Met Museum" },
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
