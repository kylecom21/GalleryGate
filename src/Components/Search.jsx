import { useState } from "react";
import { searchMetMuseum, searchRijksMuseum } from "../../api";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [metResults, setMetResults] = useState([]);
  const [rijksResults, setRijksResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const [metResponse, rijksResponse] = await Promise.all([
        searchMetMuseum(searchQuery),
        searchRijksMuseum(searchQuery),
      ]);

      setMetResults(metResponse);
      setRijksResults(rijksResponse);
    } catch (err) {
      setError("Something went wrong. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="search-container">
    <h1>Search Artworks</h1>
    <form onSubmit={handleSearchSubmit}>
      <input
        type="text"
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder="Search for artwork..."
      />
      <button type="submit" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
    {error && <p className="error">{error}</p>}
    
    <div className="results">
      <h2>Metropolitan Museum Results</h2>
      {metResults.length > 0 ? (
        <ul className="results-list">
          {metResults.map((artwork) => (
            <li key={artwork.objectID} className="result-item">
              {artwork.primaryImage ? (
                <img
                  src={artwork.primaryImage}
                  alt={artwork.title}
                  className="artwork-image"
                />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
              <div className="artwork-info">
                <a
                  href={artwork.objectURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {artwork.title}
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results from the Met Museum.</p>
      )}

      <h2>Rijksmuseum Results</h2>
      {rijksResults.length > 0 ? (
        <ul className="results-list">
          {rijksResults.map((item) => (
            <li key={item.objectNumber} className="result-item">
              {item.webImage && item.webImage.url ? (
                <img
                  src={item.webImage.url}
                  alt={item.title || "Artwork Image"}
                  className="artwork-image"
                />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
              <div className="artwork-info">
                <a
                  href={`https://www.rijksmuseum.nl/en/collection/${item.objectNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.title || "Untitled Artwork"}
                </a>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results from the Rijksmuseum.</p>
      )}
    </div>
  </div>
  );
};

export default Search;
