import { useState, useEffect } from "react";
import { fetchMetArtworks, fetchRijksArtworks } from "../../api";

const Artworks = () => {
  const [metArtworks, setMetArtworks] = useState([]);
  const [rijksArtworks, setRijksArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [sortOption, setSortOption] = useState("Title");
  const [filter, setFilter] = useState("All");
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const loadArtworks = async () => {
      const metData = await fetchMetArtworks(page, limit);
      const rijksData = await fetchRijksArtworks(page, limit);

      setMetArtworks(metData || []);
      setRijksArtworks(rijksData || []);

      let combinedArtworks = [];
      if (filter === "All") {
        combinedArtworks = [...metData, ...rijksData];
      } else if (filter === "Metropolitan") {
        combinedArtworks = metData;
      } else if (filter === "Rijksmuseum") {
        combinedArtworks = rijksData;
      }

      if (sortOption === "Title") {
        combinedArtworks.sort((a, b) => (a.title > b.title ? 1 : -1));
      } else if (sortOption === "Date") {
        combinedArtworks.sort((a, b) => {
          const dateA = a.objectDate ? new Date(a.objectDate) : new Date();
          const dateB = b.objectDate ? new Date(b.objectDate) : new Date();
          return dateA - dateB;
        });
      }

      setFilteredArtworks(combinedArtworks);
    };

    loadArtworks();
  }, [filter, sortOption, page]);

  const handleFilterChange = (e) => {
    const newFilter = e.target.value;
    setFilter(newFilter);
    if (newFilter === "Metropolitan") {
      setPage(2);
    } else {
      setPage(1);
    }
  };

  const handleSortChange = (e) => {
    setSortOption(e.target.value); 
  };

  return (
    <div className="artworks-container">
      <h1>Artworks</h1>
    <div className="filter-container">
      <div className="filter-dropdown">
        <label>Filter:</label>
        <select onChange={handleFilterChange} value={filter}>
          <option value="All">All</option>
          <option value="Metropolitan">Metropolitan Museum</option>
          <option value="Rijksmuseum">Rijksmuseum</option>
        </select>
      </div>

      <div className="filter-dropdown">
        <label>Sort By:</label>
        <select onChange={handleSortChange} value={sortOption}>
          <option value="Title">Title</option>
          <option value="Date">Date</option>
        </select>
      </div>
 </div>
      <section>
        <div className="artwork-list">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((art) => (
              <div
                key={art.objectID || art.objectNumber}
                className="artwork-item"
              >
                {art.primaryImage || art.webImage?.url ? (
                  <img
                    src={art.primaryImage || art.webImage.url}
                    alt={art.title}
                  />
                ) : (
                  <p>No image available</p>
                )}
                <p>{art.title || "Untitled"}</p>
              </div>
            ))
          ) : (
            <p>Loading artworks...</p>
          )}
        </div>
      </section>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1}>
          Previous
        </button>
        <span>Page {page}</span>
        <button onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </div>
  );
};

export default Artworks;
