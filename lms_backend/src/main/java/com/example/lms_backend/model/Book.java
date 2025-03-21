package com.example.lms_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity(name="tbl_books")
public class Book {
    @Id
    private int book_id;
    private String title;
    private String author;
    private String isbn;
    private String category;
    private int publication_year;
    private int copies_available;

    // Constructors
    public Book() {}
    
    public Book(int book_id, String title, String author, String isbn, String category, int publication_year,int copies_available) {
		super();
		this.book_id = book_id;
		this.title = title;
		this.author = author;
		this.isbn = isbn;
		this.category = category;
		this.publication_year = publication_year;
		this.copies_available = copies_available;
	}

    // Getters and Setters
    public int getBook_id() {return book_id;}

	public void setBook_id(int i) {this.book_id = i;}

	public String getTitle() {return title;}

	public void setTitle(String title) {this.title = title;}

	public String getAuthor() {return author;}

	public void setAuthor(String author) {this.author = author;}

	public String getIsbn() {return isbn;}

	public void setIsbn(String isbn) {this.isbn = isbn;}

	public String getCategory() {return category;}

	public void setCategory(String category) {this.category = category;}

	public int getPublication_year() {return publication_year;}

	public void setPublication_year(int publication_year) {this.publication_year = publication_year;}

	public int getCopies_available() {return copies_available;}

	public void setCopies_available(int copies_available) {	this.copies_available = copies_available;}

	
    
}