import {Link} from 'react-router-dom';

function BookItem({ book }) {
    return (
        <div className='book-item'>
            <div>{new Date(book.createdAt).toLocaleString('en-US')}</div>
            <div>{book.title}</div>
            <Link to={`/book/${book._id}`} className='view-button'>
                View
            </Link>
        </div>
    )
}

export default BookItem;