package com.example.lms_backend.service;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.User;
import com.example.lms_backend.repository.BookRepository;

@Service
public class BookService {
    @Autowired
    private BookRepository bookRepository;

    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book addBook(Book book) {
    	book.setBook_id(getNextId());
        return bookRepository.save(book);
    }
    
    public Book getBookById(int id) {
    	return bookRepository.findById(id).orElse(null);
    }
    
    public boolean isNullOrEmpty(Book book) {
		return book == null || (book.getIsbn() == null);
	}
	
    private int getNextId() {
    	return bookRepository.getNextId();
    }

	public void deleteBook(Book book) {
		// TODO Auto-generated method stub
		bookRepository.delete(book);
	}

	public void save(Book book) {
        bookRepository.save(book);		
	}
}