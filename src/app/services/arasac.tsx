import axios from 'axios';

const BASE_URL = 'https://api.arasaac.org/v1';

export const getPictogramId = async (searchText: string): Promise<number> => {
  try {
    const response = await axios.get(`${BASE_URL}/pictograms/es/bestsearch/${searchText}`);
    const pictogram = response.data[0];
    return pictogram._id;
  } catch (error) {
    console.error('Error fetching pictogram ID:', error);
    throw error;
  }
};

export const getPictogramImage = async (id: number): Promise<string> => {
  try {
    const response = await axios.get(`${BASE_URL}/pictograms/${id}`, {
      params: {
        download: false,
        plural: false,
        color: true,
      },
      responseType: 'blob',
    });
    const imageUrl = URL.createObjectURL(response.data);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching pictogram image:', error);
    throw error;
  }
};
