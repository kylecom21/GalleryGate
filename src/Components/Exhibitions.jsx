import { useState, useEffect } from "react";

const Exhibitions = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [newExhibitionName, setNewExhibitionName] = useState("");

  useEffect(() => {
    const savedExhibitions = JSON.parse(localStorage.getItem("exhibitions"));
    if (savedExhibitions) {
      setExhibitions(savedExhibitions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("exhibitions", JSON.stringify(exhibitions));
  }, [exhibitions]);

  const createExhibition = (name) => {
    const newExhibition = {
      id: `exhibition-${Date.now()}`,
      name,
      artworks: [],
    };
    setExhibitions([...exhibitions, newExhibition]);
  };

  const deleteExhibition = (id) => {
    setExhibitions(exhibitions.filter((exhibition) => exhibition.id !== id));
  };

  const addArtworkToExhibition = (exhibitionId, artwork) => {
    setExhibitions(
      exhibitions.map((exhibition) =>
        exhibition.id === exhibitionId
          ? { ...exhibition, artworks: [...exhibition.artworks, artwork] }
          : exhibition
      )
    );
  };

  const removeArtworkFromExhibition = (exhibitionId, artworkId) => {
    setExhibitions(
      exhibitions.map((exhibition) =>
        exhibition.id === exhibitionId
          ? {
              ...exhibition,
              artworks: exhibition.artworks.filter((a) => a.id !== artworkId),
            }
          : exhibition
      )
    );
  };

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
          />
          <button
            className="create-exhibition-btn"
            onClick={() => {
              createExhibition(newExhibitionName);
              setNewExhibitionName("");
            }}
          >
            Create Exhibition
          </button>
        </div>
      </div>

      {exhibitions.map((exhibition) => (
        <div key={exhibition.id} className="exhibition-card">
          <div className="exhibition-card-header">
            <h3>{exhibition.name}</h3>
            <button
              className="delete-exhibition-btn"
              onClick={() => deleteExhibition(exhibition.id)}
            >
              Delete
            </button>
          </div>
          <ul className="artworks-list">
            {exhibition.artworks.map((artwork) => (
              <li key={artwork.id} className="artwork-item">
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className="artwork-image"
                />
                <p className="artwork-info">
                  {artwork.title} by {artwork.artist}
                </p>
                <button
                  className="remove-artwork-btn"
                  onClick={() =>
                    removeArtworkFromExhibition(exhibition.id, artwork.id)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default Exhibitions;
