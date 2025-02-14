import { useState, useEffect } from "react";
import SuccessModal from "./SuccessModal"

const ArtworkModal = ({ artwork, onClose }) => {
  const [exhibitions, setExhibitions] = useState([]);
  const [selectedExhibition, setSelectedExhibition] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  useEffect(() => {
    const savedExhibitions =
      JSON.parse(localStorage.getItem("exhibitions")) || [];
    setExhibitions(savedExhibitions);
  }, []);

  const addToExhibition = () => {
    if (!selectedExhibition) return;

    const updatedExhibitions = exhibitions.map((exhibition) =>
      exhibition.id === selectedExhibition
        ? { ...exhibition, artworks: [...exhibition.artworks, artwork] }
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
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        <img
          src={artwork.primaryImage || artwork.webImage?.url}
          alt={artwork.title}
        />
        <h2>{artwork.title || "Untitled"}</h2>
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

        <div>
          {showSuccessModal && (
            <SuccessModal
              message={`"${artwork.title}" has been added to the exhibition!`}
              onClose={closeSuccessModal}
            />
          )}

          <div className="exhibition-selection">
            <select
              value={selectedExhibition}
              onChange={(e) => setSelectedExhibition(e.target.value)}
            >
              <option value="">Select Exhibition</option>
              {exhibitions.map((exhibition) => (
                <option key={exhibition.id} value={exhibition.id}>
                  {exhibition.name}
                </option>
              ))}
            </select>
            <button onClick={addToExhibition} disabled={!selectedExhibition}>
              Add to Exhibition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtworkModal;
