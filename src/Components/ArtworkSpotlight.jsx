import { useState, useEffect } from "react";
import { fetchMetArtworks, fetchRijksArtworks, fetchRijksArtworkDetails } from "../../api";

const ArtworkSpotlight = () => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchRandomArtwork = async (retryCount = 3) => {
    setLoading(true);
    setError(null);

    const sources = [fetchMetArtworks, fetchRijksArtworks];
    let attempts = 0;

    while (attempts < retryCount) {
      try {
        const randomSource = sources[Math.floor(Math.random() * sources.length)];
        const artworks = await randomSource(1, 10);

        if (artworks.length > 0) {
          let randomArtwork = artworks[Math.floor(Math.random() * artworks.length)];

          if (randomArtwork.objectNumber) {
            const rijksDetails = await fetchRijksArtworkDetails(randomArtwork.objectNumber);
            randomArtwork = { ...randomArtwork, ...rijksDetails };
          }

          if (randomArtwork.primaryImage || randomArtwork.webImage?.url) {
            setArtwork(randomArtwork);
            setLoading(false);
            return;
          }
        }
      } catch (err) {
        console.error("Error fetching artwork:", err);
      }

      attempts++;
    }

    setLoading(false);
    setError("Unable to load artwork. Please try again later.");
  };

  useEffect(() => {
    fetchRandomArtwork();
  }, []);

  if (loading) {
    return <p className="loading">Loading artwork...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  return (
    <div className="artwork-of-the-day">
      <h2 className="title-of-the-day">Art Spotlight</h2>
      {artwork.primaryImage || artwork.webImage?.url ? (
        <img
          src={artwork.primaryImage || artwork.webImage?.url}
          alt={artwork.title || "Artwork"}
          className="artwork-of-the-day-image"
          onError={(e) => (e.target.src = "/placeholder.jpg")}
        />
      ) : null}
      <h3 className="h3-of-the-day">{artwork.title || "Untitled"}</h3>
      <p><strong>Artist:</strong> {artwork.artistDisplayName || artwork.principalOrFirstMaker || "Unknown"}</p>
      <p><strong>Year:</strong> {artwork.objectDate || artwork.dating?.presentingDate || "N/A"}</p>
      <p><strong>Medium:</strong> {artwork.medium || artwork.physicalMedium || "N/A"}</p>
      <button onClick={() => fetchRandomArtwork()} className="show-more-btn">
        Show Another Artwork
      </button>
    </div>
  );
};

export default ArtworkSpotlight;
