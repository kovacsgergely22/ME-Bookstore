import { use, useEffect } from "react";
import {useSelector, useDispatch} from "react-redux";
import { getBooks, reset } from "../features/books/bookSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function Books() {
const { books, isLoading, isSuccess} = useSelector((state) => state.books);

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
        <div>
        <h1>Books</h1>
        <p>List of books will be displayed here.</p>
        </div>
    );
}

export default Books;