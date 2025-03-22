import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookManagement.css';

const BookManagement = () => {
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
      book.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
      book.author.toLowerCase().includes(searchAuthor.toLowerCase()) &&
      book.publication_year.toString().includes(searchYear) &&
      book.isbn.toString().includes(searchIsbn)&&
      book.category.toLowerCase().includes(searchCategory.toLowerCase())&&
      book.copies_available.toString().includes(searchCopiesAvailable)
    );
  });

  // Fetch books when the component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

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
                Copies Available
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
                <tr key={book.book_id}>
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
                    {editBook && editBook.book_id === book.book_id ? (
                    <input
                        type="text"
                        name="copies_available"
                        value={editBook.copies_available}
                        onChange={handleEditChange}
                    />
                    ) : (
                    book.copies_available
                    )}
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
                <input
                    type="text"
                    value={newBook.copies_available}
                    onChange={(e) => setNewBook({ ...newBook, copies_available: e.target.value })}
                    placeholder="New Book Copies Available"
                />
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
