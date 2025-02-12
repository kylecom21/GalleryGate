import axios from "axios";


const metApiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/';
const rijksApiUrl = 'https://www.rijksmuseum.nl/api/en/collection';

const searchMetMuseum = async (query) => {
  try {
    const response = await axios.get(`${metApiUrl}/search`, {
      params: {
        q: query,
        hasImages: true,
      },
    });

    if (!response.data.objectIDs) {
      return [];
    }

    const objectIDs = response.data.objectIDs.slice(0, 10);

    const artworkDetails = await Promise.all(
      objectIDs.map(async (id) => {
        const detailResponse = await axios.get(`${metApiUrl}/objects/${id}`);
        return detailResponse.data;
      })
    );

    return artworkDetails;
  } catch (error) {
    console.error("Error fetching data from the Met Museum:", error);
    return []; 
  }
};

const searchRijksMuseum = async (query) => {
  try {
    const response = await axios.get(rijksApiUrl, {
      params: {
        key: 'LGjWsRbT',
        q: query,
        format: 'json',
      },
    });

    return response.data.artObjects || [];
  } catch (error) {
    console.error("Error fetching data from the Rijksmuseum:", error);
    return [];
  }
};

const fetchMetArtworks = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://collectionapi.metmuseum.org/public/collection/v1/search?q=art&hasImages=true`
    );

    const objectIDs = response.data.objectIDs || [];
    const paginatedIDs = objectIDs.slice((page - 1) * limit, page * limit);

    const artworkPromises = paginatedIDs.map(async (id) => {
      const artResponse = await axios.get(
        `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
      );
      return artResponse.data;
    });

    return await Promise.all(artworkPromises);
  } catch (error) {
    console.error("Error fetching Met artworks:", error);
    return [];
  }
};

const fetchRijksArtworks = async (page = 1, limit = 10) => {
  try {
    const response = await axios.get(
      `https://www.rijksmuseum.nl/api/en/collection?key=LGjWsRbT&ps=${limit}&p=${page}`
    );
    return response.data.artObjects;
  } catch (error) {
    console.error("Error fetching Rijks artworks:", error);
    return [];
  }
};


export {searchMetMuseum, searchRijksMuseum, fetchRijksArtworks, fetchMetArtworks};
