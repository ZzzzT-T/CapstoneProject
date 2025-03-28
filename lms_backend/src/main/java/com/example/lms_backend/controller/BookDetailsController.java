package com.example.lms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.model.BookDetails;
import com.example.lms_backend.model.BookTransaction;
import com.example.lms_backend.service.BookDetailsService;
import com.example.lms_backend.service.BookTransactionService;

@RestController
@RequestMapping("/api/bookdetails")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class BookDetailsController {
	@Autowired
	private BookDetailsService bookDetailsService;
	
	@Autowired
	BookTransactionService bookTransactionService;	
	
	@GetMapping("/{bookId}")
	public List<BookDetails> getBooksByBookId(@PathVariable("bookId") int book_id){
		return bookDetailsService.findByBookId(book_id);
	}
	
	@GetMapping("/all")
	public List<BookDetails> getBookDetailsWithTransaction(){
		List<BookDetails> bookDetails = bookDetailsService.findAll();
		for (BookDetails bD : bookDetails) {
			BookTransaction bt= bookTransactionService.findMaxTransactionWithDetailBookDetailId(bD.getBook_detail_id());
			bD.setBookTransaction(bt);
		}
		return bookDetails;
	}
	
	@PostMapping
    public BookDetails addBook(@RequestBody BookDetails bookDetail) {
		return bookDetailsService.addBookDetails(bookDetail);
    }
    
	@PutMapping("/update")
	public BookDetails updateBook(@RequestBody BookDetails bookDetail) {
		return bookDetailsService.updateBookDetails(bookDetail);
    }
	@DeleteMapping("/{id}") 
	 public String deleteBookDetail(@PathVariable("id") int id) {
		BookDetails bookDetails = bookDetailsService.findById(id);
		if(!bookDetailsService.isNullOrEmpty(bookDetails)) {
			bookDetailsService.deleteBookDetails(id);
    		return "Book detail deleted Successfully";
		}else {
			return "Book detail not found";
		}
	}
}
