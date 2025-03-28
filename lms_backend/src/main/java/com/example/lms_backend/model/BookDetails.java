package com.example.lms_backend.model;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.*;

@Entity(name="tbl_book_details")
public class BookDetails {
	@Id
	private int book_detail_id;
	@Column(name="books_book_id", nullable=false)
	private int booksBookId;
	private String book_detail_status;
	@OneToMany(mappedBy = "bookDetails")
	private List<BookTransaction> bookTransactions;
	@Transient	
	private BookTransaction bookTransaction;
	
	public BookDetails() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public BookDetails(int book_detail_id, int booksBookId, String book_detail_status) {
		super();
		this.book_detail_id = book_detail_id;
		this.booksBookId = booksBookId;
		this.book_detail_status = book_detail_status;
	}
	
	
	
	public BookTransaction getBookTransaction() {
		
        return bookTransaction;
        
	}

	public void setBookTransaction(BookTransaction bookTransaction) {
		this.bookTransaction = bookTransaction;
	}

	public int getBook_detail_id() {
		return book_detail_id;
	}
	public void setBook_detail_id(int book_detail_id) {
		this.book_detail_id = book_detail_id;
	}
	public int getBooksBookId() {
		return booksBookId;
	}
	public void setBooksBookId(int booksBookId) {
		this.booksBookId = booksBookId;
	}
	public String getBook_detail_status() {
		return book_detail_status;
	}
	public void setBook_detail_status(String book_detail_status) {
		this.book_detail_status = book_detail_status;
	}

	public List<BookTransaction> getBookTransactions() {
		return bookTransactions;
	}

	public void setBookTransactions(List<BookTransaction> bookTransactions) {
		this.bookTransactions = bookTransactions;
	}
	
	
}
