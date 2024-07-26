import axios from "axios";

const FindMyAddress = async (lon, lat) => {
  try {
    const result = await axios.get(
      `https://api.neshan.org/v5/reverse?lat=${lat}&lng=${lon}`,
      {
        headers: {
          "Api-Key": "service.8c4e2b2e5591460aae35e18680909e70",
          "Content-Type": "application/json",
        },
      }
    );

    console.log(result);
    return result.data;
  } catch (error) {
    console.error(error);
  }
};
export default FindMyAddress;
