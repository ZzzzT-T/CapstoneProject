package com.example.lms_backend.model;

public class BorrowReturnRequest {
	private int userId;
    private int bookDetailId;
    private int transactionId;
    
    // Getters and Setters
    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public int getBookDetailId() {
        return bookDetailId;
    }

    public void setBookDetailId(int bookDetailId) {
        this.bookDetailId = bookDetailId;
    }

	public int getTransactionId() {
		return transactionId;
	}

	public void setTransactionId(int transactionId) {
		this.transactionId = transactionId;
	}
    
}
