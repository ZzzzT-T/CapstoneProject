import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookManagement.css';

const temp = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [searchAuthor, setSearchAuthor] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [searchIsbn, setSearchIsbn] = useState('');
  const [searchCategory, setSearchCategory] = useState('');
  const [searchCopiesAvailable, setSearchCopiesAvailable] = useState('');
  const [newBook, setNewBook] = useState({ title: '', author: '', publication_year: '', isbn: '', category: '', copies_available: '' });
  const [editBook, setEditBook] = useState(null);
  const [bookDetails, setBookDetails] = useState(null); // For storing details of individual book copies
  const [newBookDetail, setNewBookDetail] = useState({ book_status: '' }); // For storing the new book detail input

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  // Fetch book details based on book ID
  const fetchBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/book_details/${bookId}`);
      setBookDetails(response.data); // Store the book details for this book
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  // Handle editing of book status
  const handleBookStatusChange = (bookDetailId, status) => {
    setBookDetails(
      bookDetails.map((detail) =>
        detail.book_detail_id === bookDetailId ? { ...detail, book_status: status } : detail
      )
    );
  };

  const handleSaveBookDetails = async () => {
    try {
      // Send updated book details back to the server
      for (const detail of bookDetails) {
        await axios.put(`http://localhost:9000/api/book_details/${detail.book_detail_id}`, {
          book_status: detail.book_status,
        });
      }
      // Optionally, you can refetch book details after saving to ensure the changes are reflected
      alert('Book details updated successfully');
    } catch (error) {
      console.error('Error saving book details:', error);
    }
  };

  // Add new row to the book details
  const handleAddNewRow = async () => {
    if (!newBookDetail.book_status) {
      alert("Please provide the book status.");
      return;
    }
    
    try {
      // Assuming we already have the `bookId` and want to add a new detail for that book
      const newDetail = {
        books_book_id: bookDetails[0].books_book_id, // Assuming you get the book id from the first item
        book_status: newBookDetail.book_status
      };
      
      const response = await axios.post('http://localhost:9000/api/book_details', newDetail);
      setBookDetails([...bookDetails, response.data]); // Add the new book detail to the list
      setNewBookDetail({ book_status: '' }); // Reset the new book detail input
    } catch (error) {
      console.error('Error adding new book detail:', error);
    }
  };

  const handleDeleteBookDetail = async (bookDetailId) => {
    try {
      await axios.delete(`http://localhost:9000/api/book_details/${bookDetailId}`);
      setBookDetails(bookDetails.filter((detail) => detail.book_detail_id !== bookDetailId)); // Remove the deleted book detail from the list
    } catch (error) {
      console.error('Error deleting book detail:', error);
    }
  };

  // Filter books based on search criteria
  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(searchAuthor.toLowerCase()) &&
      book.publication_year.toString().includes(searchYear) &&
      book.isbn.toString().includes(searchIsbn) &&
      book.category.toLowerCase().includes(searchCategory.toLowerCase()) &&
      book.copies_available.toString().includes(searchCopiesAvailable)
    );
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book Management</h1>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by title"
        />
      </div>

      <div className="table-container">
        <table border="1">
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Publication Year</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Copies Available</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredBooks.map((book) => (
              <tr key={book.book_id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publication_year}</td>
                <td>{book.isbn}</td>
                <td>{book.category}</td>
                <td>
                  <span
                    onClick={() => fetchBookDetails(book.book_id)}
                    style={{ cursor: 'pointer', color: 'blue' }}
                  >
                    {book.copies_available}
                  </span>
                </td>
                <td>
                  <button onClick={() => setEditBook(book)}>Edit</button>
                  <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Displaying the nested table when book details are available */}
        {bookDetails && (
          <div className="nested-table-container">
            <h2>Book Copies</h2>
            <table border="1">
              <thead>
                <tr>
                  <th>Book Detail ID</th>
                  <th>Book Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookDetails.map((detail) => (
                  <tr key={detail.book_detail_id}>
                    <td>{detail.book_detail_id}</td>
                    <td>
                      <input
                        type="text"
                        value={detail.book_status}
                        onChange={(e) =>
                          handleBookStatusChange(detail.book_detail_id, e.target.value)
                        }
                      />
                    </td>
                    <td>
                      <button onClick={() => handleDeleteBookDetail(detail.book_detail_id)}>Delete</button>
                    </td>
                  </tr>
                ))}

                {/* Row to Add New Book Detail */}
                <tr>
                  <td>New</td>
                  <td>
                    <input
                      type="text"
                      value={newBookDetail.book_status}
                      onChange={(e) => setNewBookDetail({ ...newBookDetail, book_status: e.target.value })}
                      placeholder="Enter Book Status"
                    />
                  </td>
                  <td>
                    <button onClick={handleAddNewRow}>Add New</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default temp;
