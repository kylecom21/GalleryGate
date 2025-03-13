import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, A11y } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import ArtworkSpotlight from "./ArtworkSpotlight";

const Home = () => {
  const carouselImages = [
    { src: "/Met-heavenly.jpg", alt: "Heavenly artwork from the Met Museum" },
    { src: "/vermeer.jpeg", alt: "Famous Vermeer painting" },
    { src: "/Rijks_Museum_Library.jpg", alt: "Rijksmuseum Library interior" },
    { src: "/rijks-art.jpeg", alt: "Dutch artwork from the Rijksmuseum" },
    { src: "/Met-interior.jpg", alt: "Inside view of the Met Museum" },
  ];

  return (
    <div className="home-container">
      <section className="carousel-section">
        <Swiper
          modules={[Autoplay, Pagination, EffectFade, A11y]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          effect="fade"
          a11y={true}
          className="custom-swiper"
          style={{ paddingBottom: "20px" }}
        >
          {carouselImages.map((image, index) => (
            <SwiperSlide key={index} className="carousel-slide">
              <img src={image.src} alt={image.alt} className="carousel-image" />
            </SwiperSlide>
          ))}
        </Swiper>
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
