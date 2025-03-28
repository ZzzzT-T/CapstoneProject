package com.example.lms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.*;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.BookDetails;
import com.example.lms_backend.service.*;

@RestController
@RequestMapping("/api/books")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class BookController {
    @Autowired
    private BookService bookService;
    
    @Autowired
    private BookDetailsService bookDetailsService;
    
    @GetMapping
    public List<Book> getBooks() {
    	List<Book> books = bookService.getAllBooks();
    	for (Book book : books) {
    		book.setBookDetails(bookDetailsService.findByBookId(book.getBook_id()));
		}
        return books;
    }
    
    @PostMapping
    public Book addBook(@RequestBody Book book) {
    	return bookService.addBook(book);
    }
    
    @DeleteMapping("/{id}") 
    public String deleteBook(@PathVariable("id") int id) {
    	Book book = bookService.getBookById(id);
    	if(!bookService.isNullOrEmpty(book)) {
    		bookDetailsService.deleteAllBookDetailsByBookId(book.getBook_id());
    		bookService.deleteBook(book);
    		return "Book deleted Successfully";
    	}
    	else {
    		return "Book not found";
    	}        
    }
    
    @PutMapping("/update") 
    public Book updateBook(@RequestBody Book book) {
    	bookService.save(book); // Save updated book to the database
        return book ; // "Book updated!"; // Return confirmation message
    }
    
}