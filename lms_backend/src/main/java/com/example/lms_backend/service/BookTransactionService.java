package com.example.lms_backend.service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.repository.BookTransactionRepository;

import com.example.lms_backend.model.*;

@Service
public class BookTransactionService {
	
	@Autowired
	private BookTransactionRepository bookTransactionRepository;
	
	public List<BookTransaction> findByUser(User user){
		return bookTransactionRepository.findAllByUser(user);
	}
	
	public int findBorrowedCount(User user){
		List<BookTransaction> bookTransaction = bookTransactionRepository.findByUserId(user.getUser_id());
		if(bookTransaction == null || bookTransaction.isEmpty())
			return 0;
		else
			return bookTransaction.size();
	}
	
	public boolean isNullOrEmpty(BookTransaction bookTransaction) {
		return bookTransaction == null || (bookTransaction.getTransaction_status() == null);
	}

	public BookTransaction findById(int transactionId) {
		// TODO Auto-generated method stub
		return bookTransactionRepository.findById(transactionId).orElse(null);
	}

	public BigDecimal calculateOverdueFine(LocalDate dueDate, LocalDate returnDate) {
        if (returnDate != null && returnDate.isAfter(dueDate)) {
            long overdueDays = ChronoUnit.DAYS.between(dueDate, returnDate);
            BigDecimal finePerDay = new BigDecimal("0.50"); 
            // Calculate the total fine
            BigDecimal totalFine = finePerDay.multiply(new BigDecimal(overdueDays));

            // Cap the fine at $20
            BigDecimal maxFine = new BigDecimal("20.00");
            if (totalFine.compareTo(maxFine) > 0) {
                return maxFine;
            }
            return totalFine;
        }else if(LocalDate.now().isAfter(dueDate)){
        	long overdueDays = ChronoUnit.DAYS.between(dueDate, LocalDate.now());
            BigDecimal finePerDay = new BigDecimal("0.50"); 
            // Calculate the total fine
            BigDecimal totalFine = finePerDay.multiply(new BigDecimal(overdueDays));

            // Cap the fine at $20
            BigDecimal maxFine = new BigDecimal("20.00");
            if (totalFine.compareTo(maxFine) > 0) {
                return maxFine;
            }
            return totalFine;
        }
        return BigDecimal.ZERO;
    }

	public BookTransaction save(BookTransaction bookTransaction) {
		// TODO Auto-generated method stub
		bookTransaction.setTransaction_id(bookTransactionRepository.getNextId());
		return bookTransactionRepository.save(bookTransaction);
	}
	
	public BookTransaction update(BookTransaction bookTransaction) {
		// TODO Auto-generated method stub
		return bookTransactionRepository.save(bookTransaction);
	}
	
	public BookTransaction findMaxTransactionWithDetailBookDetailId(int book_detail_id) {
		// TODO Auto-generated method stub
		List<BookTransaction> transactions = bookTransactionRepository.findMaxTransactionWithDetailBookDetailId(book_detail_id);
		return transactions.isEmpty() ? null : transactions.get(0);
	}

	public List<BookTransaction> findByUserId(int userId) {
		// TODO Auto-generated method stub
		return bookTransactionRepository.findByUserId(userId);
	}
	
}
