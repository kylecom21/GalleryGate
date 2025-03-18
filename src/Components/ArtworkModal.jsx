import { useState, useEffect, useRef } from "react";
import SuccessModal from "./SuccessModal";

const ArtworkModal = ({ artwork, onClose }) => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const modalRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    try {
      const savedExhibitions =
        JSON.parse(localStorage.getItem("exhibitions")) || [];
      setExhibitions(savedExhibitions);
    } catch (error) {
      console.error("Failed to load exhibitions:", error);
    }
  }, []);

  useEffect(() => {
    if (closeButtonRef.current) {
      closeButtonRef.current.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const addToExhibition = () => {
    if (!selectedExhibition) return;

    const artworkWithId = {
      ...artwork,
      id: artwork.id || `artwork-${Date.now()}`,
    };

    const updatedExhibitions = exhibitions.map((exhibition) =>
      exhibition.id === selectedExhibition
        ? { ...exhibition, artworks: [...exhibition.artworks, artworkWithId] }
        : exhibition
    );

    setExhibitions(updatedExhibitions);
    localStorage.setItem("exhibitions", JSON.stringify(updatedExhibitions));

    setShowSuccessModal(true);
    setSelectedExhibition("");
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
  };

  if (!artwork) {
    return null;
  }

  return (
    <>
      <div
        className="modal-overlay"
        onClick={onClose}
        role="dialog"
        aria-labelledby="modal-title"
        aria-modal="true"
        ref={modalRef}
      >
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <button
            className="close-btn"
            onClick={onClose}
            ref={closeButtonRef}
            aria-label="Close modal"
          >
            ✖
          </button>
          <img
            src={artwork.primaryImage || artwork.webImage?.url}
            alt={artwork.title || "Artwork image"}
          />
          <h2 id="modal-title">{artwork.title || "Untitled"}</h2>
          <p>
            <strong>Artist:</strong>{" "}
            {artwork.artistDisplayName ||
              artwork.principalOrFirstMaker ||
              "Unknown"}
          </p>
          <p>
            <strong>Year:</strong>{" "}
            {artwork.objectDate || artwork.dating?.presentingDate || "N/A"}
          </p>
          <p>
            <strong>Medium:</strong>{" "}
            {artwork.medium || artwork.physicalMedium || "N/A"}
          </p>
          <div className="exhibition-selection">
            <label htmlFor="exhibition-select">Select an Exhibition:</label>
            <select
              id="exhibition-select"
              value={selectedExhibition}
              onChange={(e) => setSelectedExhibition(e.target.value)}
              aria-label="Select an exhibition to add the artwork"
            >
              <option value="">-- Select Exhibition --</option>
              {exhibitions.map((exhibition) => (
                <option key={exhibition.id} value={exhibition.id}>
                  {exhibition.name}
                </option>
              ))}
            </select>
            <button
              onClick={addToExhibition}
              disabled={!selectedExhibition}
              aria-disabled={!selectedExhibition}
            >
              Add to Exhibition
            </button>
          </div>
        </div>
      </div>
      {showSuccessModal && (
        <SuccessModal
          message={`"${artwork.title}" has been added to the exhibition!`}
          onClose={closeSuccessModal}
        />
      )}
    </>
  );
};

export default ArtworkModal;
