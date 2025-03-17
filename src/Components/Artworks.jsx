import { useState, useEffect } from "react";
import {
  fetchMetArtworks,
  fetchRijksArtworks,
  fetchRijksArtworkDetails,
} from "../../api";
import ArtworkModal from "./ArtworkModal";

const CACHE_KEY = "artworksCache";
const CACHE_EXPIRY_HOURS = 24;

const Artworks = () => {
  const [allArtworks, setAllArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [sortOption, setSortOption] = useState("Title");
  const [filter, setFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    const loadArtworks = async () => {
      setLoading(true);
      const cachedData = localStorage.getItem(CACHE_KEY);
      const now = new Date().getTime();

      if (cachedData) {
        const { artworks, timestamp } = JSON.parse(cachedData);
        const cacheAge = (now - timestamp) / (1000 * 60 * 60); 

        if (cacheAge < CACHE_EXPIRY_HOURS) {
          setAllArtworks(artworks);
          setLoading(false);
          return;
        }
      }

      try {
        const [metData, rijksData] = await Promise.all([
          fetchMetArtworks(1, 150),
          fetchRijksArtworks(1, 150),
        ]);

        const rijksDetailedData = await Promise.all(
          rijksData.map(async (art) => {
            if (art.objectNumber) {
              return fetchRijksArtworkDetails(art.objectNumber)
                .then((details) => ({
                  ...art,
                  physicalMedium: details?.physicalMedium || "N/A",
                }))
                .catch(() => ({ ...art, physicalMedium: "N/A" }));
            }
            return art;
          })
        );

        const artworks = [...metData, ...rijksDetailedData];
        setAllArtworks(artworks);

        localStorage.setItem(
          CACHE_KEY,
          JSON.stringify({ artworks, timestamp: now })
        );
      } catch (error) {
        console.error("Error loading artworks:", error);
      }
      setLoading(false);
    };

    loadArtworks();
  }, []);

  useEffect(() => {
    let displayedArtworks = [...allArtworks];

    if (filter === "Metropolitan") {
      displayedArtworks = displayedArtworks.filter((art) => art.primaryImage);
    } else if (filter === "Rijksmuseum") {
      displayedArtworks = displayedArtworks.filter((art) => art.webImage?.url);
    }

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      displayedArtworks = displayedArtworks.filter((art) => {
        return (
          art.title?.toLowerCase().includes(searchLower) ||
          art.longTitle?.toLowerCase().includes(searchLower) ||
          art.artistDisplayName?.toLowerCase().includes(searchLower) ||
          art.principalOrFirstMaker?.toLowerCase().includes(searchLower) ||
          art.objectDate?.toLowerCase().includes(searchLower) ||
          art.dating?.presentingDate?.toLowerCase().includes(searchLower) ||
          art.medium?.toLowerCase().includes(searchLower) ||
          art.physicalMedium?.toLowerCase().includes(searchLower)
        );
      });
    }

    if (sortOption === "Title") {
      displayedArtworks.sort((a, b) => (a.title > b.title ? 1 : -1));
    } else if (sortOption === "Date") {
      displayedArtworks.sort((a, b) => {
        const dateA = new Date(
          a.objectDate || a.dating?.presentingDate || "1900"
        );
        const dateB = new Date(
          b.objectDate || b.dating?.presentingDate || "1900"
        );
        return dateA - dateB;
      });
    } else if (sortOption === "Artist") {
      displayedArtworks.sort((a, b) => {
        const artistA =
          a.artistDisplayName || a.principalOrFirstMaker || "Unknown";
        const artistB =
          b.artistDisplayName || b.principalOrFirstMaker || "Unknown";
        return artistA.localeCompare(artistB);
      });
    }

    const startIndex = (page - 1) * limit;
    const paginatedArtworks = displayedArtworks.slice(
      startIndex,
      startIndex + limit
    );

    setFilteredArtworks(paginatedArtworks);
  }, [filter, sortOption, searchQuery, page, allArtworks]);

  const handleArtworkClick = async (artwork) => {
    if (artwork.objectNumber) {
      const details = await fetchRijksArtworkDetails(artwork.objectNumber);
      setSelectedArtwork(details);
    } else {
      setSelectedArtwork(artwork);
    }
  };

  return (
    <div className="artworks-container">
      <h1>Artworks</h1>

      <div className="filter-container">
        <div className="filter-dropdown">
          <label htmlFor="search-input">Search:</label>
          <input
            type="text"
            id="search-input"
            placeholder="Search artworks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="filter-dropdown">
          <label htmlFor="filter-select">Filter:</label>
          <select
            id="filter-select"
            onChange={(e) => {
              setFilter(e.target.value);
              setPage(1);
            }}
            value={filter}
          >
            <option value="All">All</option>
            <option value="Metropolitan">Metropolitan Museum</option>
            <option value="Rijksmuseum">Rijksmuseum</option>
          </select>
        </div>

        <div className="filter-dropdown">
          <label htmlFor="sort-select">Sort By:</label>
          <select
            id="sort-select"
            onChange={(e) => setSortOption(e.target.value)}
            value={sortOption}
          >
            <option value="Title">Title</option>
            <option value="Date">Date</option>
            <option value="Artist">Artist</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <p>Loading artworks...</p>
        </div>
      ) : (
        <section>
          <div className="artwork-list">
            {filteredArtworks.length > 0 ? (
              filteredArtworks.map((art) => (
                <div
                  key={art.objectID || art.objectNumber}
                  className="artwork-item"
                  onClick={() => handleArtworkClick(art)}
                  tabIndex={0}
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
              <p>No artworks found.</p>
            )}
          </div>

          {selectedArtwork && (
            <ArtworkModal
              artwork={selectedArtwork}
              onClose={() => setSelectedArtwork(null)}
            />
          )}
        </section>
      )}

      <div className="pagination">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          Previous
        </button>
        <span>Page {page}</span>
        <button
          onClick={() => setPage(page + 1)}
          disabled={filteredArtworks.length < limit}
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Artworks;
