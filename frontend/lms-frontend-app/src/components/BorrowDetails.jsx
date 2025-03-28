import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming you have the user ID from Auth context

const BorrowDetails = () => {
  const { userId } = useAuth(); // Get user ID from Auth context
  const [borrowDetails, setBorrowDetails] = useState([]);

  useEffect(() => {
    const fetchBorrowDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:9000/api/transaction/borrow-details/${userId}`);
        setBorrowDetails(response.data); // Assuming the backend returns a list of borrow details
      } catch (error) {
        console.error('Error fetching borrow details:', error);
      }
    };

    fetchBorrowDetails();
  }, [userId]);

  return (
    <div className="borrow-details">
      <h1>Your Borrowed Books</h1>
      <table>
        <thead>
          <tr>
            <th>Book Title</th>
            <th>Borrow Date</th>
            <th>Due Date</th>
            <th>Return Date</th>
            <th>Overdue Fine</th>
          </tr>
        </thead>
        <tbody>
          {borrowDetails.map((transaction) => (
            <tr key={transaction.transaction_Id}>
              <td>{transaction.bookTitle}</td>
              <td>{transaction.borrowDate}</td>
              <td>{transaction.dueDate}</td>
              <td>{transaction.returnDate || 'Not Returned'}</td>
              <td>
                {transaction.overdueFineAmount > 0
                  ? `$${transaction.overdueFineAmount.toFixed(2)}`
                  : 'No Fine'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BorrowDetails;
