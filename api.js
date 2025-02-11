import axios from "axios";


const metApiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1/';
const rijksApiUrl = 'https://www.rijksmuseum.nl/api/en/collection';

const searchMetMuseum = async (query) => {
  try {
    // Use the correct URL for searching
    const response = await axios.get(`${metApiUrl}/search`, {
      params: {
        q: query,
        hasImages: true,
      },
    });

    // Check if there are any object IDs returned
    if (!response.data.objectIDs) {
      return [];
    }

    // Limit the results to avoid too many requests
    const objectIDs = response.data.objectIDs.slice(0, 10);

    // Fetch detailed data for each object
    const artworkDetails = await Promise.all(
      objectIDs.map(async (id) => {
        const detailResponse = await axios.get(`${metApiUrl}/objects/${id}`);
        return detailResponse.data;
      })
    );

    return artworkDetails;
  } catch (error) {
    console.error("Error fetching data from the Met Museum:", error);
    return []; // Return an empty array to prevent crashes
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


export {searchMetMuseum, searchRijksMuseum,};
