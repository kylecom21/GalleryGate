const ArtworkModal = ({ artwork, onClose }) => {
  if (!artwork) {
    return null;
  }

console.log(artwork)

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
          <strong>Year:</strong> {artwork.objectDate || artwork.dating.presentingDate || "N/A"}
        </p>
        <p>
          <strong>Medium:</strong> {artwork.medium || artwork.physicalMedium || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default ArtworkModal;
