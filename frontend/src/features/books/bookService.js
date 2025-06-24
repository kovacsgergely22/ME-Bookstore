import axios from "axios";

const API_URL = "/api/books/";

// Create a new book
const createBook = async (bookData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, bookData, config);

  return response.data;
};

const bookService = {
  createBook,
}

export default bookService;