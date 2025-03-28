import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';
import './BookManagement.css';

const BookManagement = () => {
  const { userRole } = useAuth(); // Get user role from the authentication hook
  const [books, setBooks] = useState([]); // Array to store books
  const [searchQuery, setSearchQuery] = useState(''); // For global search
  const [searchTitle, setSearchTitle] = useState(''); // For search by title
  const [searchAuthor, setSearchAuthor] = useState(''); // For search by author
  const [searchYear, setSearchYear] = useState(''); // For search by year
  const [searchIsbn, setSearchIsbn] = useState(''); // For search by isbn
  const [searchCategory, setSearchCategory] = useState(''); // For search by isbn
  const [searchCopiesAvailable, setSearchCopiesAvailable] = useState(''); // For search by copies available
  const [newBook, setNewBook] = useState({ title: '', author: '', publication_year: '' , isbn: '', category:'', copies_available: ''}); // For adding new books
  const [editBook, setEditBook] = useState(null); // For handling book update
  const [bookDetails, setBookDetails] = useState(null); // For storing details of individual book copies
  const [newBookDetail, setNewBookDetail] = useState({ book_detail_status: '' }); // For storing the new book detail input
  const [selectedBookId, setSelectedBookId] = useState(null);

  // Fetch books from the server
  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:9000/api/books'); // Replace with your API endpoint
      setBooks(response.data); // Set the books state with the fetched data
      console.log(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleRowClick = (bookId) => {
    setSelectedBookId(selectedBookId === bookId ? null : bookId); // Toggle the nested table
  };

  // Fetch book details based on book ID
  const fetchBookDetails = async (bookId) => {
    try {
      const response = await axios.get(`http://localhost:9000/api/bookdetails/${bookId}`);
      const bookDetailData = response.data;
  
      if (bookDetailData.length === 0) {
        // If no book details exist, create a new empty book detail entry with status 'Available'
        const newDetail = {
          books_book_id: bookId,
          book_status: 'Available', // Default status if no details exist
        };
        const createResponse = await axios.post('http://localhost:9000/api/bookdetails', newDetail);
        setBookDetails([createResponse.data]); // Set the new book detail as the first entry
      } else {
        setBookDetails(bookDetailData); // Set the existing book details
      }
    } catch (error) {
      console.error('Error fetching book details:', error);
    }
  };

  // Handle editing of book status
  const handleBookStatusChange = (bookDetailId, newStatus) => {
    const updatedDetails = bookDetails.map((detail) => {
      if (detail.book_detail_id === bookDetailId) {
        // Handle status validation based on current status
        if (detail.book_detail_status === 'Available' && (newStatus === 'Borrowed' || newStatus === 'Missing')) {
          return { ...detail, book_detail_status: newStatus }; // Allow change to Borrowed or Missing
        } else if (detail.book_detail_status === 'Borrowed' && (newStatus === 'Available' || newStatus === 'Missing')) {
          return { ...detail, book_detail_status: newStatus }; // Allow change to Available or Missing
        } else if (detail.book_detail_status === 'Missing' && newStatus === 'Available') {
          return { ...detail, book_detail_status: newStatus }; // Only allow change to Available
        }
      }
      return detail;
    });
  
    setBookDetails(updatedDetails); // Update the state with the modified book details
  };

  // Add new row to the book details
  const handleAddNewRow = async () => {
    if (newBookDetail.book_detail_status===null || newBookDetail.book_detail_status==='') {
      alert("Please provide the book status.");
      return;
    }
  
    // Restrict status to 'Available' or 'Missing' if there are no existing book details
    if (bookDetails.length === 0 && !['Available', 'Missing'].includes(newBookDetail.book_detail_status)) {
      alert("Please select a valid status (Available or Missing) for a new book copy.");
      return;
    }
  
    try {
      // Create new book detail based on the provided status
      const newDetail = {
        booksBookId: bookDetails[0]?.booksBookId, // Use book_id from existing details or from the new book
        book_detail_status: newBookDetail.book_detail_status,
      };
      const response = await axios.post('http://localhost:9000/api/bookdetails', newDetail);
      setBookDetails([...bookDetails, response.data]); // Add the new book detail to the list
      setBooks(books.map((book) => 
        book.book_id === newDetail.booksBookId 
          ? { ...book, copies_available: (book.copies_available || 0) + 1 } // Increment copies_available
          : book
      ));
      setNewBookDetail({ book_detail_status: '' }); // Reset the new book detail input
    } catch (error) {
      console.error('Error adding new book detail:', error);
    }
  };

  const handleDeleteBookDetail = async (bookDetailId) => {
											  
    try {
      // Find the book detail that will be deleted
      const bookDetailToDelete = bookDetails.find(detail => detail.book_detail_id === bookDetailId);
    
      await axios.delete(`http://localhost:9000/api/bookdetails/${bookDetailId}`);
      setBookDetails(bookDetails.filter((detail) => detail.book_detail_id !== bookDetailId)); // Remove the deleted book detail from the list
			
      setBooks(books.map((book) => 
        book.book_id === bookDetailToDelete.booksBookId
          ? { ...book, copies_available: (book.copies_available || 0) - 1 } // Decrement copies_available
          : book
      ));

    } catch (error) {
      console.error('Error deleting book detail:', error);
    }
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle adding a new book
  const handleAddBook = async () => {
    try {
      const response = await axios.post('http://localhost:9000/api/books', newBook); // Replace with your API endpoint
      setBooks([...books, response.data]); // Add the new book to the list
      setNewBook({ title: '', author: '', publication_year: '' , isbn: '',category:'', copies_available: '' }); // Clear the input fields
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  // Handle deleting a book
  const handleDeleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:9000/api/books/${bookId}`); // Replace with your API endpoint
      setBooks(books.filter((book) => book.book_id !== bookId)); // Remove the deleted book from the list
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  // Handle updating a book
  const handleUpdateBook = async (bookId) => {
    try {
      const response = await axios.put(`http://localhost:9000/api/books/update`, editBook); // Replace with your API endpoint
      setBooks(books.map((book) => (book.book_id === bookId ? response.data : book))); // Update the book in the list
      setEditBook(null); // Reset the edit state
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  // Handle input changes for editing books
  const handleEditChange = (e) => {
    setEditBook({
      ...editBook,
      [e.target.name]: e.target.value,
    });
  };

  // Filter books based on search input for each column
  const filteredBooks = books.filter((book) => {
    return (
      (book.title || '').toLowerCase().includes(searchTitle.toLowerCase()) &&
      (book.author || '').toLowerCase().includes(searchAuthor.toLowerCase()) &&
      (book.publication_year ? book.publication_year.toString() : '').includes(searchYear) &&
      (book.isbn ? book.isbn.toString() : '').includes(searchIsbn) &&
      (book.category || '').toLowerCase().includes(searchCategory.toLowerCase()) &&
      (book.copies_available ? book.copies_available.toString() : '').includes(searchCopiesAvailable)
    );
  });

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  // Return early if the user is not a LIBRARIAN
  if (userRole !== 'LIBRARIAN') {
    return <div>You do not have permission to access this page.</div>;
  }
  
  return (
    <div>
      <h1>Book Management</h1>
      <div>
      
        {/* Search bar */}
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Search by title"
        />
      
      </div>
      <div className='table-container'>
        <table border="1">
          <thead>
            <tr>
                {/* Column Headers with Search Inputs */}
                <th>
                Title
                <input
                    type="text"
                    value={searchTitle}
                    onChange={(e) => setSearchTitle(e.target.value)}
                    placeholder="Search by title"
                />
                </th>
                <th>
                Author
                <input
                    type="text"
                    value={searchAuthor}
                    onChange={(e) => setSearchAuthor(e.target.value)}
                    placeholder="Search by author"
                />
                </th>
                <th>
                Publication Year
                <input
                    type="text"
                    value={searchYear}
                    onChange={(e) => setSearchYear(e.target.value)}
                    placeholder="Search by publication year"
                />
                </th>
                <th>
                ISBN
                <input
                    type="text"
                    value={searchIsbn}
                    onChange={(e) => setSearchIsbn(e.target.value)}
                    placeholder="Search by ISBN"
                />
                </th>
                <th>
                Category
                <input
                    type="text"
                    value={searchCategory}
                    onChange={(e) => setSearchCategory(e.target.value)}
                    placeholder="Search by Category"
                />
                </th>
                <th>
                Copies Availables
                <input
                    type="text"
                    value={searchCopiesAvailable}
                    onChange={(e) => setSearchCopiesAvailable(e.target.value)}
                    placeholder="Search by Copies Available"
                />
                </th>
                <th>Actions</th>
            </tr>
          </thead>
          <tbody> 
            {/* Displaying the filtered books */}
            {filteredBooks.map((book) => (
              <React.Fragment key={book.book_id}>
                <tr onClick={() => handleRowClick(book.book_id)} style={{ cursor: 'pointer' }}>
                  <td>
                      {editBook && editBook.book_id === book.book_id ? (
                      <input
                          type="text"
                          name="title"
                          value={editBook.title}
                          onChange={handleEditChange}
                      />
                      ) : (
                      book.title
                      )}
                  </td>
                  <td>
                      {editBook && editBook.book_id === book.book_id ? (
                      <input
                          type="text"
                          name="author"
                          value={editBook.author}
                          onChange={handleEditChange}
                      />
                      ) : (
                      book.author
                      )}
                  </td>
                  <td>
                      {editBook && editBook.book_id === book.book_id ? (
                      <input
                          type="text"
                          name="publication_year"
                          value={editBook.publication_year}
                          onChange={handleEditChange}
                      />
                      ) : (
                      book.publication_year
                      )}
                  </td>
                  <td>
                      {editBook && editBook.book_id === book.book_id ? (
                      <input
                          type="text"
                          name="isbn"
                          value={editBook.isbn}
                          onChange={handleEditChange}
                      />
                      ) : (
                      book.isbn
                      )}
                  </td>
                  <td>
                      {editBook && editBook.book_id === book.book_id ? (
                      <input
                          type="text"
                          name="category"
                          value={editBook.category}
                          onChange={handleEditChange}
                      />
                      ) : (
                      book.category
                      )}
                  </td>
                  <td>
                    <span
                        onClick={() => fetchBookDetails(book.book_id)}
                        style={{ cursor: 'pointer', color: 'blue' }}
                      >
                        {book.copies_available}
                    </span>

                  </td>
                  <td>
                      {/* Actions for Add, Edit, Delete */}
                      {editBook && editBook.book_id === book.book_id ? (
                      <button onClick={() => handleUpdateBook(book.book_id)}>Save</button>
                      ) : (
                      <button onClick={() => setEditBook(book)}>Edit</button>
                      )}
                      <button onClick={() => handleDeleteBook(book.book_id)}>Delete</button>
                  </td>
                </tr>
                {selectedBookId === book.book_id && bookDetails && (
                  <tr>
                    <td colSpan={7}>
                      <div className="nested-table-container">
                      <h2>Book Copies</h2>
                      <table border="1">
                        <thead>
                          <tr>
                            <th>Books Book ID</th>
                            <th>Book Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bookDetails.map((detail) => (
                            <tr key={detail.book_detail_id}>
                              <td>
                                {detail.booksBookId}
                              </td>
                              <td>
                                <label>Current status: <b>{detail.book_detail_status}</b>, change to:</label>
                                <select
                                  value={detail.book_detail_status}
                                  onChange={(e) => handleBookStatusChange(detail.book_detail_id, e.target.value)}
                                >
                                  {detail.book_detail_status === 'Available' && (
                                    <>
                                      <option value="Missing">Missing</option>
                                      <option value="Borrowed">Borrowed</option>
                                    </>
                                  )}
                                  {detail.book_detail_status === 'Borrowed' && (
                                    <>
                                      <option value="Available">Available</option>
                                      <option value="Missing">Missing</option>
                                    </>
                                  )}
                                  {detail.book_detail_status === 'Missing' && (
                                    <>
                                      <option value="Available">Available</option>
                                    </>
                                  )}
                                </select>
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
                              <select
                                value={newBookDetail.book_detail_status}
                                onChange={(e) => setNewBookDetail({ ...newBookDetail, book_detail_status: e.target.value })}
                              >
                                <option value="" >Please select..</option>
                                <option value="Available">Available</option>
                                <option value="Missing">Missing</option>
                              </select>
                            </td>
                            <td>
                              <button onClick={handleAddNewRow}>Add New</button>
                                                        
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
            {/* Add new book row */}
            <tr>
                <td>
                <input
                    type="text"
                    value={newBook.title}
                    onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
                    placeholder="New Book Title"
                />
                </td>
                <td>
                <input
                    type="text"
                    value={newBook.author}
                    onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                    placeholder="New Book Author"
                />
                </td>
                <td>
                <input
                    type="text"
                    value={newBook.publication_year}
                    onChange={(e) => setNewBook({ ...newBook, publication_year: e.target.value })}
                    placeholder="New Book Year"
                />
                </td>
                <td>
                <input
                    type="text"
                    value={newBook.isbn}
                    onChange={(e) => setNewBook({ ...newBook, isbn: e.target.value })}
                    placeholder="New Book ISBN number"
                />
                </td>
                <td>
                <input
                    type="text"
                    value={newBook.category}
                    onChange={(e) => setNewBook({ ...newBook, category: e.target.value })}
                    placeholder="New Book category"
                />
                </td>
                <td>
                
                </td>
                <td>
                <button onClick={handleAddBook}>Add</button>
                </td>
            </tr>
            </tbody>
        </table>
        
      </div>
    </div>
  );
};

export default BookManagement;
