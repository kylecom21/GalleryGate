import { useState, useEffect } from "react";
import { fetchMetArtworks, fetchRijksArtworks } from "../../api";

const Artworks = () => {
    const [allArtworks, setAllArtworks] = useState([]); 
    const [filteredArtworks, setFilteredArtworks] = useState([]); 
    const [sortOption, setSortOption] = useState("Title");
    const [filter, setFilter] = useState("All");
    const [page, setPage] = useState(1);
    const limit = 10;
  
    useEffect(() => {
      const loadArtworks = async () => {
        const metData = await fetchMetArtworks(1, 50); 
        const rijksData = await fetchRijksArtworks(1, 50); 
  
        const combinedArtworks = [...metData, ...rijksData];
        setAllArtworks(combinedArtworks);
      };
  
      loadArtworks();
    }, []);
  
    useEffect(() => {
      let displayedArtworks = [...allArtworks];
  
      if (filter === "Metropolitan") {
        displayedArtworks = allArtworks.filter((art) => art.primaryImage);
      } else if (filter === "Rijksmuseum") {
        displayedArtworks = allArtworks.filter((art) => art.webImage?.url);
      }
  

      if (sortOption === "Title") {
        displayedArtworks.sort((a, b) => (a.title > b.title ? 1 : -1));
      } else if (sortOption === "Date") {
        displayedArtworks.sort((a, b) => {
          const dateA = new Date(a.objectDate || "1900"); 
          const dateB = new Date(b.objectDate || "1900");
          return dateA - dateB;
        });
      } else if (sortOption === "Artist") {
        allArtworks.sort((a, b) => {
          const artistA = a.artistDisplayName || "Unknown"; 
          const artistB = b.artistDisplayName || "Unknown";
          return artistA.localeCompare(artistB);
        });
    }
      const startIndex = (page - 1) * limit;
      const paginatedArtworks = displayedArtworks.slice(startIndex, startIndex + limit);
  
      setFilteredArtworks(paginatedArtworks);
    }, [filter, sortOption, page, allArtworks]);

    const handleFilterChange = (e) => {
        setFilter(e.target.value);
        setPage(1);
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
            <option value="Artist">Artist</option> 
          </select>
        </div>
      </div>

      <section>
        <div className="artwork-list">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((art) => (
              <div key={art.objectID || art.objectNumber} className="artwork-item">
                {art.primaryImage || art.webImage?.url ? (
                  <img src={art.primaryImage || art.webImage.url} alt={art.title} />
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
