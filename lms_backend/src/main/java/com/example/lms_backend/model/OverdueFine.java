package com.example.lms_backend.model;

import java.math.BigDecimal;


public class OverdueFine {
    private int transactionId;
    private String bookTitle;
    private String borrowDate;
    private String dueDate;
    private String returnDate;
    private BigDecimal overdueFineAmount;
	
    public OverdueFine() {
		super();
		// TODO Auto-generated constructor stub
	}

	public OverdueFine(int transactionId, String bookTitle, String borrowDate, String dueDate, String returnDate,
			BigDecimal overdueFineAmount) {
		super();
		this.transactionId = transactionId;
		this.bookTitle = bookTitle;
		this.borrowDate = borrowDate;
		this.dueDate = dueDate;
		this.returnDate = returnDate;
		this.overdueFineAmount = overdueFineAmount;
	}

	public int getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}

	public String getBookTitle() {
		return bookTitle;
	}

	public void setBookTitle(String bookTitle) {
		this.bookTitle = bookTitle;
	}

	public String getBorrowDate() {
		return borrowDate;
	}

	public void setBorrowDate(String borrowDate) {
		this.borrowDate = borrowDate;
	}

	public String getDueDate() {
		return dueDate;
	}

	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}

	public String getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(String returnDate) {
		this.returnDate = returnDate;
	}

	public BigDecimal getOverdueFineAmount() {
		return overdueFineAmount;
	}

	public void setOverdueFineAmount(BigDecimal overdueFineAmount) {
		this.overdueFineAmount = overdueFineAmount;
	}
    
    
}
