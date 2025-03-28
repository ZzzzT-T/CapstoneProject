import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming useAuth gives you the login ID
import './BookSearchAndBorrowReturn.css'; // Optional, for styling the table

const BookSearchAndBorrowReturn = () => {
  const { userId } = useAuth(); // Assuming you have the user ID from Auth context
  const [books, setBooks] = useState([]);
  const [borrowedCount, setBorrowedCount] = useState(0); // To track borrowed books count

  const [categories, setCategories] = useState([]); // State to store the list of categories
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [publicationYear, setPublicationYear] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {

    // Fetch categories
    const fetchCategories = async () => {
      try {
        const categoriesResponse = await axios.get('http://localhost:9000/api/categories');
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching categories', error);
      }
    };

    // Fetch the books and book details from the server
    const fetchBooks = async () => {
      try {
        const booksResponse = await axios.get('http://localhost:9000/api/books');
        const booksData = booksResponse.data;
        console.log('Books Data:', booksData);
        const bookDetailsResponse = await axios.get('http://localhost:9000/api/bookdetails/all');
        const bookDetailsData = bookDetailsResponse.data;
        
        const updatedBooks = booksData.map((book) => {
          // Link the book details to each book based on booksBookId matching book_id
          const associatedDetails = bookDetailsData.filter(detail => detail.booksBookId === book.book_id);
    
          // Attach the book details to the book object
          book.bookDetails = associatedDetails;
    
          // Now let's handle nested bookTransaction if needed
          book.bookDetails = book.bookDetails.map(detail => {
            if (detail.bookTransaction) {
              // If bookTransaction exists, you can update or manage it here
              detail.bookTransaction = {
                ...detail.bookTransaction,
                // If you need to modify or update, do it here (e.g. borrowing, returning)
              };
            }
            return detail;
          });
    
          return book;
        });
    
        // Update state with the modified books
        setBooks(updatedBooks);
      } catch (error) {
        console.error('Error fetching books and book details', error);
      }
    };

    fetchCategories();
    fetchBooks();

    // Fetch the user's borrowed books count to apply the 3-book limit
    const fetchBorrowedCount = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/transaction/${userId}`);
        setBorrowedCount(response.data); 
      } catch (error) {
        console.error('Error fetching borrowed count', error);
      }
    };

    fetchBorrowedCount();
  }, [userId]);

  const handleBorrow = async (bookDetailId) => {
    if (borrowedCount >= 3) {
      alert('You cannot borrow more than 3 books.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:9000/api/transaction/borrow`, { userId: userId, bookDetailId });
      alert('Book borrowed successfully');
      // After borrowing, refresh book details

      const updatedBookDetails = response.data;  // The book details returned from the server


      setBooks(prevBooks => prevBooks.map(book => {
        // If the book contains the updated bookDetails, merge them
        const updatedDetails = book.bookDetails.map(detail => 
          detail.book_detail_id === bookDetailId 
            ? { ...detail, ...updatedBookDetails, book_detail_status: 'Borrowed' } // Merge the updated data and status
            : detail
        );
        return { ...book, bookDetails: updatedDetails }; }));

        setBorrowedCount(borrowedCount + 1);

    } catch (error) {
      console.error('Error borrowing the book', error);
      alert('Error borrowing the book');
    }
  };

  const handleReturn = async (bookDetailId, transaction_id) => {
    try {
      const response = await axios.post(`http://localhost:9000/api/transaction/return`, { userId: userId, bookDetailId, transactionId: transaction_id });
      alert('Book returned successfully');
      // After returning, refresh book details
      setBooks(prevBooks => prevBooks.map(book => ({
        ...book,
        bookDetails: book.bookDetails.map(detail => detail.book_detail_id === bookDetailId 
          ? { ...detail, book_detail_status: 'Available' } 
          : detail)
      })));
      // Update borrowed count after returning a book
      setBorrowedCount(borrowedCount - 1);
    } catch (error) {
      console.error('Error returning the book', error);
      alert('Error returning the book');
    }
  };

  // Filter books based on search criteria
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(title.toLowerCase()) &&
    (category ? book.category === category : true) &&
    (publicationYear ? String(book.publication_year) === String(publicationYear) : true) &&
    book.author.toLowerCase().includes(author.toLowerCase())
  );


  return (
    <div className="book-search-and-borrow-return">
      <h1>Book Search and Borrow/Return</h1>
      <div className="search-filters">
        <input 
          type="text" 
          placeholder="Search by Title" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
        />
        <input 
          type="text" 
          placeholder="Search by Author" 
          value={author} 
          onChange={(e) => setAuthor(e.target.value)} 
        />
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.category_name} value={cat.category_name}>
              {cat.category_name}
            </option>
          ))}
        </select>
        <input 
          type="number" 
          placeholder="Search by Publication Year" 
          value={publicationYear} 
          onChange={(e) => setPublicationYear(e.target.value)} 
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Category</th>
            <th>Publication Year</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.map(book => (
            book.bookDetails.map(detail => (
              <tr key={detail.book_detail_id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>{book.publication_year}</td>
                <td>{detail.book_detail_status}</td>
                <td>
                {detail.book_detail_status === 'Available' ? (
                    <button 
                      onClick={() => handleBorrow(detail.book_detail_id)} 
                      className="borrow" 
                      disabled={borrowedCount >= 3} // Disable if user has borrowed 3 books
                    >
                      Borrow
                    </button>
                  ) : detail.book_detail_status === 'Borrowed' ? (
                    (detail.borrowerId === userId && borrowedCount <= 3) ? (
                      <button 
                      className="return"
                      disabled>
                        Return
                      </button>
                    ) : (
                      <button onClick={() => handleReturn(detail.book_detail_id, detail.bookTransaction.transaction_id)} 
                      disabled={borrowedCount > 3}
                      className="return">
                        Return
                      </button>
                    )
                  ) : null}
                </td>
              </tr>
            ))
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookSearchAndBorrowReturn;
