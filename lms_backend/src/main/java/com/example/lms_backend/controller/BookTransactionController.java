package com.example.lms_backend.controller;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.BookDetails;
import com.example.lms_backend.model.BookTransaction;
import com.example.lms_backend.model.BorrowReturnRequest;
import com.example.lms_backend.model.OverdueFine;
import com.example.lms_backend.model.User;
import com.example.lms_backend.service.BookDetailsService;
import com.example.lms_backend.service.BookService;
import com.example.lms_backend.service.BookTransactionService;

@RestController
@RequestMapping("/api/transaction")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class BookTransactionController {
	@Autowired
	BookTransactionService bookTransactionService;
	@Autowired
	BookDetailsService bookDetailsService;
	@Autowired
	BookService bookService;
	
	@GetMapping("/{userId}")
	public int getBorrowedCount(@PathVariable("userId") int userId) {
		User user = new User(userId);
		return bookTransactionService.findBorrowedCount(user);
	}
	
	@PostMapping("/borrow")
	public BookDetails borrowBook(@RequestBody BorrowReturnRequest borrowRequest) {
		BookTransaction bookTransaction = new BookTransaction();
		BookDetails bookDetails = bookDetailsService.findById(borrowRequest.getBookDetailId());
		bookDetails.setBook_detail_status("Borrowed");
		bookDetailsService.updateBookDetails(bookDetails);
		bookTransaction.setBookDetails(bookDetails);
		bookTransaction.setBorrow_date(LocalDate.now());
		bookTransaction.setDue_date(LocalDate.now().plusDays(14));
		bookTransaction.setTransaction_date(LocalDate.now());
		bookTransaction.setTransaction_status("Borrowed");
		User user = new User(borrowRequest.getUserId());
		bookTransaction.setUser(user);
		bookTransaction = bookTransactionService.save(bookTransaction);
		bookDetails.setBookTransaction(bookTransaction);
		return bookDetails;
	}
	
	@PostMapping("/return")
	public void returnBook(@RequestBody BorrowReturnRequest returnRequest) {
		BookTransaction bookTransaction = bookTransactionService.findById(returnRequest.getTransactionId());
		BookDetails bookDetails = bookDetailsService.findById(returnRequest.getBookDetailId());
		bookDetails.setBook_detail_status("Available");
		bookDetailsService.updateBookDetails(bookDetails);
		bookTransaction.setBookDetails(bookDetails);
		bookTransaction.setReturn_date(LocalDate.now());
		bookTransaction.setTransaction_date(LocalDate.now());
		bookTransaction.setTransaction_status("Returned");
		User user = new User(returnRequest.getUserId());
		bookTransaction.setUser(user);
        bookTransactionService.update(bookTransaction);
        
	}
	
	@GetMapping("/borrow-details/{userId}")
    public List<OverdueFine> getBorrowDetails(@PathVariable int userId) {
        // Fetch the borrow transactions for the given user
        List<BookTransaction> transactions = bookTransactionService.findByUserId(userId);

        // Map the transactions to OverdueFineDTOs and calculate fines
        List<OverdueFine> overdueFines = transactions.stream().map(transaction -> {
        	OverdueFine overdueFine = new OverdueFine();
            overdueFine.setTransactionId(transaction.getTransaction_id());
            Book book = bookService.getBookById(transaction.getBookDetails().getBooksBookId());
            overdueFine.setBookTitle(book.getTitle());
            overdueFine.setBorrowDate(transaction.getBorrow_date().toString());
            overdueFine.setDueDate(transaction.getDue_date().toString());
            overdueFine.setReturnDate(transaction.getReturn_date() != null ? transaction.getReturn_date().toString() : "Not Returned");

            BigDecimal fine = bookTransactionService.calculateOverdueFine(transaction.getDue_date(), transaction.getReturn_date());
            overdueFine.setOverdueFineAmount(fine);

            return overdueFine;
        }).collect(Collectors.toList());

        return overdueFines;
    }
}
