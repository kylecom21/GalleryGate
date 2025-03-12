import { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [newExhibitionName, setNewExhibitionName] = useState("");
  const [selectedExhibition, setSelectedExhibition] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const savedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];
    setExhibitions(savedExhibitions);
  }, []);

  useEffect(() => {
    if (exhibitions.length > 0) {
      localStorage.setItem("exhibitions", JSON.stringify(exhibitions));
    }
  }, [exhibitions]);

  const createExhibition = () => {
    if (!newExhibitionName.trim()) {
      setErrorMessage("Exhibition name cannot be empty!");
      return;
    }

    const newExhibition = {
      id: `exhibition-${Date.now()}`,
      name: newExhibitionName.trim(),
      artworks: [],
    };

    setExhibitions((prevExhibitions) => [...prevExhibitions, newExhibition]);
    setNewExhibitionName("");
    setErrorMessage("");
  };

  const deleteExhibition = useCallback((id) => {
    setExhibitions((prevExhibitions) =>
      prevExhibitions.filter((ex) => ex.id !== id)
    );
  }, []);

  const openModal = (exhibition) => {
    setSelectedExhibition(exhibition);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedExhibition(null);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") closeModal();
    };

    if (isModalOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen]);

  const removeArtwork = (artworkId) => {
    setExhibitions((prevExhibitions) => {
      const updatedExhibitions = prevExhibitions.map((exhibition) =>
        exhibition.id === selectedExhibition.id
          ? {
              ...exhibition,
              artworks: exhibition.artworks.filter(
                (artwork) => artwork.id !== artworkId
              ),
            }
          : exhibition
      );
  
      const updatedSelectedExhibition = updatedExhibitions.find(
        (exhibition) => exhibition.id === selectedExhibition.id
      );
  
      setSelectedExhibition(updatedSelectedExhibition);
      return updatedExhibitions;
    });
  };
  

  useEffect(() => {
    localStorage.setItem("exhibitions", JSON.stringify(exhibitions));
  }, [exhibitions]);

  return (
    <div className="exhibitions-container">
      <div className="exhibition-header">
        <h2>My Exhibitions</h2>
        <div className="exhibition-input">
          <input
            type="text"
            placeholder="Exhibition Name"
            value={newExhibitionName}
            onChange={(e) => setNewExhibitionName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && createExhibition()}
          />
          <button className="create-exhibition-btn" onClick={createExhibition}>
            Create Exhibition
          </button>
        </div>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </div>
      {exhibitions.length === 0 ? (
        <p className="no-exhibitions-message">No exhibitions created yet.</p>
      ) : (
        <div className="exhibitions-grid">
          {exhibitions.map((exhibition, index) => (
            <div
              key={exhibition.id}
              className={`exhibition-card ${
                index % 2 === 0 ? "right" : "left"
              }`}
            >
              <div className="exhibition-card-header">
                <h3>{exhibition.name}</h3>
                <button
                  className="delete-exhibition-btn"
                  onClick={() => deleteExhibition(exhibition.id)}
                >
                  Delete
                </button>
              </div>
              {exhibition.artworks.length > 0 && (
                <div className="artwork-preview">
                  <img
                    src={
                      exhibition.artworks[0].primaryImage ||
                      exhibition.artworks[0].webImage?.url
                    }
                    alt={exhibition.artworks[0].title || "Untitled"}
                    className="artwork-image"
                  />
                  <button
                    className="show-more-btn"
                    onClick={() => openModal(exhibition)}
                  >
                    Show More
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && selectedExhibition && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={closeModal}>
              ✖
            </button>
            <Slider
              dots
              infinite
              speed={500}
              slidesToShow={1}
              slidesToScroll={1}
            >
              {selectedExhibition.artworks.map((artwork) => (
                <div key={artwork.id} className="ex-carousel-item">
                  <img
                    src={artwork.primaryImage || artwork.webImage?.url}
                    alt={artwork.title || "Untitled"}
                    className="ex-carousel-image"
                  />
                  <p>
                    <strong>{artwork.title}</strong> by{" "}
                    {artwork.artistDisplayName ||
                      artwork.principalOrFirstMaker ||
                      "Unknown"}
                  </p>
                  <button
                    className="remove-artwork-btn"
                    onClick={() => removeArtwork(artwork.id)}
                  >
                    Remove 
                  </button>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
};

export default Exhibitions;
