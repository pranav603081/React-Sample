import axios from "axios";
import { Data } from "../interfaces/Form.interface";

const endPoints = {
  NNIAddress: "https://demo4307061.mockable.io/getNniAddress",
  address: "https://demo4307061.mockable.io/getAddress",
};

export const loadData = (isNNI: boolean) => {
  return fetchData(isNNI ? endPoints.address : endPoints.NNIAddress);
};

const fetchData = async (endPoint: string): Promise<Data[]> => {
  const wantError = false;
  try {
    const result = await axios.get(
      !wantError ? endPoint : "https://demo4307061.mockable.io/heros"
    );
    return result.data.data as Data[];
  } catch (error) {
    console.error(error);
    return [];
  }
};
