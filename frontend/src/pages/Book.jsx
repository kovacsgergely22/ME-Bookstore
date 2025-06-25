import { useEffect } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { getBook, reset } from "../features/books/bookSlice";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

function Book() {
  const { book, isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.books
  );

  const params = useParams();
  const dispatch = useDispatch();
  const { bookId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    dispatch(getBook(bookId));
    // eslint-disable-next-line
  }, [isError, message, bookId]);

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h3>Something went wrong</h3>;
  }

  if (isSuccess && !book) {
    return <h3>No book found with ID: {bookId}</h3>;
  }

  return (
    <div className="book-page">
      <header className="ticket-header">
        <BackButton url="/books" />
        <h2>Book ID: {book._id}</h2>
        <h3>
          Date Submitted: {new Date(book.createdAt).toLocaleString("en-US")}
        </h3>
      </header>
      <div className="book-details">
        <h3>Title: {book?.title}</h3>
        <h3>Author: {book?.author}</h3>
        <h3>Category: {book?.category}</h3>
        <h3>Publisher: {book?.publisher}</h3>
        <h3>Year: {book?.year}</h3>
        <h3>Is Favorite: {book?.isFavorite ? "Yes" : "No"}</h3>
      </div>
    </div>
  );
}

export default Book;
