import axios from "axios";

function useFetchs({ cookies }) {
  const productionServerUrl = "https://lovely-tan-dove.cyclic.app";
  const localServerUrl = "http://localhost:5000";

  const postData = async (endpoint, data) => {
    const fullUrlString = `${productionServerUrl}/api${endpoint}`;
    try {
      const { data = {} } = await axios.post(fullUrlString, data);

      return data;
    } catch (e) {
      return [];
    }
  };

  const getData = async (endpoint) => {
    const token = cookies.token;
    const fullUrlString = `${productionServerUrl}/api${endpoint}`;
    const option = {
      headers: {
        authorization: token,
      },
    };

    try {
      const { data = {} } = await axios.get(fullUrlString, option);

      return data;
    } catch (e) {
      return [];
    }
  };

  return { postData, getData };
}

export default useFetchs;
