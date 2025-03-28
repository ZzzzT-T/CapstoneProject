package com.example.lms_backend.model;

import java.time.LocalDate;

import org.springframework.transaction.annotation.Transactional;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

@Entity(name="tbl_book_transaction")
public class BookTransaction {
	
	@Id
	private int transaction_id;
	@ManyToOne
    @JoinColumn(name = "users_user_id", nullable = false)
    private User user;
	@OneToOne
    @JoinColumn(name = "detail_book_detail_id", nullable = false)
	@JsonIgnore  // Prevent serialization of this field
    private BookDetails bookDetails;
	private LocalDate borrow_date;
	private LocalDate due_date;
	private LocalDate return_date;
	private LocalDate transaction_date;
	private String transaction_status;
	@Transient
	private int bookDetailId;
	
	public BookTransaction() {super();}

	public BookTransaction(int transaction_id, User user, BookDetails bookDetails, LocalDate borrow_date,
			LocalDate due_date, LocalDate return_date, LocalDate transaction_date,
			String transaction_status) {
		super();
		this.transaction_id = transaction_id;
		this.user = user;
		this.bookDetails = bookDetails;
		this.borrow_date = borrow_date;
		this.due_date = due_date;
		this.return_date = return_date;
		this.transaction_date = transaction_date;
		this.transaction_status = transaction_status;
	}

	public int getTransaction_id() {
		return transaction_id;
	}

	public void setTransaction_id(int transaction_id) {
		this.transaction_id = transaction_id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public BookDetails getBookDetails() {
		return bookDetails;
	}

	public void setBookDetails(BookDetails bookDetails) {
		this.bookDetails = bookDetails;
	}

	public LocalDate getBorrow_date() {
		return borrow_date;
	}

	public void setBorrow_date(LocalDate borrow_date) {
		this.borrow_date = borrow_date;
	}

	public LocalDate getDue_date() {
		return due_date;
	}

	public void setDue_date(LocalDate due_date) {
		this.due_date = due_date;
	}

	public LocalDate getReturn_date() {
		return return_date;
	}

	public void setReturn_date(LocalDate return_date) {
		this.return_date = return_date;
	}

	public LocalDate getTransaction_date() {
		return transaction_date;
	}

	public void setTransaction_date(LocalDate transaction_date) {
		this.transaction_date = transaction_date;
	}

	public String getTransaction_status() {
		return transaction_status;
	}

	public void setTransaction_status(String transaction_status) {
		this.transaction_status = transaction_status;
	}

	public int getBookDetailId() {
		if(bookDetails != null ) {
			return bookDetails.getBook_detail_id();
		}else {
			return bookDetailId;
		}
		
	}

	public void setBookDetailId(int bookDetailId) {
		this.bookDetailId = bookDetailId;
	}
	
	
	
}
