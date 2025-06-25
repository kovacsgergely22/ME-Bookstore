import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getBooks, reset } from "../features/books/bookSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import BookItem from "../components/BookItem";

function Books() {
  const { books, isLoading, isSuccess } = useSelector((state) => state.books);
  console.log(books);

  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      if (isSuccess) {
        dispatch(reset());
      }
    };
  }, [dispatch, isSuccess]);

  useEffect(() => {
    dispatch(getBooks());
  }, [dispatch]);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <h1>My Books</h1>
      <div className="books">
        <div className="book-headings">
          <div>Date</div>
          <div>Title</div>
          <div></div>
        </div>
        {Array.isArray(books) ? (
          books.map((book) => (
            <BookItem key={book._id} book={book} />
          ))
        ) : (
          <div>Nincsenek könyvek.</div>
        )}
      </div>
    </>
  );
}

export default Books;
