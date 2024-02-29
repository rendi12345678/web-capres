import axios from "axios";

function useFetchs({ cookies }) {
  const productionServerUrl = "https://lovely-tan-dove.cyclic.app";
  const localServerUrl = "http://localhost:5000";

  const postData = async (endpoint, data) => {
    const fullUrlString = `${localServerUrl}/api${endpoint}`;
    try {
      const response = await axios.post(fullUrlString, data);

      return response.data;
    } catch (e) {
      return [];
    }
  };

  const getData = async (endpoint) => {
    const token = cookies.token;
    const fullUrlString = `${localServerUrl}/api${endpoint}`;
    const option = {
      headers: {
        authorization: token,
      },
    };

    try {
      const response = await axios.get(fullUrlString, option);

      return response.data;
    } catch (e) {
      return [];
    }
  };

  return { postData, getData };
}

export default useFetchs;
