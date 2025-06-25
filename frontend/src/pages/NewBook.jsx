import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createBook, reset } from "../features/books/bookSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import "./pages.css"; // Assuming you have a CSS file for styling

function NewBook() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.book
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [category, setCategory] = useState("Cybersecurity");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [publisher, setPublisher] = useState("");
  const [year, setYear] = useState("");
  const [isFavorite, setIsFavorite] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/books");
    }

    dispatch(reset());
  }, [dispatch, isError, isSuccess, navigate, message]);

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(
      createBook({ category, author, title, publisher, year, isFavorite })
    );
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Book</h1>
        <p>Please fill out the form below to add a new book.</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input type="text" className="form-control" value={name} disabled />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              disabled
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author</label>
            <input
              type="text"
              className="form-control"
              placeholder="Author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="category">Category</label>
            <select
              className="form-control"
              name="category"
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="AI">AI</option>
              <option value="Blockchain">Blockchain</option>
              <option value="Cloud Computing">Cloud Computing</option>
              <option value="Cybersecurity">Cybersecurity</option>
              <option value="Data Science">Data Science</option>
              <option value="Database">Database</option>
              <option value="DevOps">DevOps</option>
              <option value="Game Development">Game Development</option>
              <option value="Machine Learning">Machine Learning</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Networking">Networking</option>
              <option value="OS">OS</option>
              <option value="Programming">Programming</option>
              <option value="Software Engineering">Software Engineering</option>
              <option value="Web Development">Web Development</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              className="form-control"
              placeholder="Publisher"
              value={publisher}
              onChange={(e) => setPublisher(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="year">Year</label>
            <input
              type="number"
              className="form-control"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="isFavorite">Is Favorite</label>
            <input
              type="checkbox"
              className="form-control"
              checked={isFavorite}
              onChange={(e) => setIsFavorite(e.target.checked)}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Add Book
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default NewBook;
