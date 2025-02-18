import { useState, useEffect } from "react";
import { fetchMetArtworks, fetchRijksArtworks, fetchRijksArtworkDetails } from "../../api";

const ArtworkSpotlight = () => {
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRandomArtwork = async () => {
    setLoading(true);

    const sources = [fetchMetArtworks, fetchRijksArtworks];
    const randomSource = sources[Math.floor(Math.random() * sources.length)];

    const artworks = await randomSource(1, 10);
    if (artworks.length > 0) {
      let randomArtwork = artworks[Math.floor(Math.random() * artworks.length)];

      if (randomArtwork.objectNumber) {
        const rijksDetails = await fetchRijksArtworkDetails(randomArtwork.objectNumber);
        randomArtwork = { ...randomArtwork, ...rijksDetails };
      }

      setArtwork(randomArtwork);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchRandomArtwork();
  }, []);

  if (loading || !artwork) {
    return <p>Loading artwork...</p>;
  }

  return (
    <div className="artwork-of-the-day">
      <h2 className="title-of-the-day">Art Spotlight</h2>
      {artwork.primaryImage || artwork.webImage?.url ? (
        <img
          src={artwork.primaryImage || artwork.webImage?.url}
          alt={artwork.title || "Artwork"}
          className="artwork-of-the-day-image"
        />
      ) : null}
      <h3 className="h3-of-the-day">{artwork.title || "Untitled"}</h3>
      <p><strong>Artist:</strong> {artwork.artistDisplayName || artwork.principalOrFirstMaker || "Unknown"}</p>
      <p><strong>Year:</strong> {artwork.objectDate || artwork.dating?.presentingDate || "N/A"}</p>
      <p><strong>Medium:</strong> {artwork.medium || artwork.physicalMedium || "N/A"}</p>
    </div>
  );
};

export default ArtworkSpotlight;
