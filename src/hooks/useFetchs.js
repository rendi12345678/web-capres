import axios from "axios";

function useFetchs({ cookies }) {
  let serverUrl = "";
  serverUrl = "http://localhost:5000";
  serverUrl = "https://lovely-tan-dove.cyclic.app";

  const postData = async (endpoint, dataToPost) => {
    const fullUrlString = `${serverUrl}/api${endpoint}`;
    try {
      const { data = {} } = await axios.post(fullUrlString, dataToPost);

      console.log(data);
      return data;
    } catch (e) {
      return [];
    }
  };

  const getData = async (endpoint) => {
    const token = cookies.token;
    const fullUrlString = `${serverUrl}/api${endpoint}`;
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
