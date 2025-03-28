package com.example.lms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.model.Book;
import com.example.lms_backend.model.BookDetails;
import com.example.lms_backend.repository.*;

@Service
public class BookDetailsService {
	
	@Autowired
    private BookDetailsRepository bookDetailsRepository;

	public List<BookDetails> findByBookId(int book_id) {
		// TODO Auto-generated method stub
		return bookDetailsRepository.findAllByBooksBookId(book_id);
	}
	
	public int getCountByBookId(int book_id) {
		// TODO Auto-generated method stub
		List<BookDetails> bookDetails = bookDetailsRepository.findAllByBooksBookId(book_id); 
		return bookDetails!=null? bookDetails.size(): 0;
	}
	
	public BookDetails addBookDetails(BookDetails bookDetail) {
    	bookDetail.setBook_detail_id(getNextId());
        return bookDetailsRepository.save(bookDetail);
    }
	
	public BookDetails updateBookDetails(BookDetails bookDetail) {
    	return bookDetailsRepository.save(bookDetail);
    }
	
	private int getNextId() {
    	return bookDetailsRepository.getNextId();
    }

	public void deleteAllBookDetailsByBookId(int book_id) {
		// TODO Auto-generated method stub
		bookDetailsRepository.deleteAllByBooksBookId(book_id);
	}

	public void deleteBookDetails(int book_detail_id) {
		// TODO Auto-generated method stub
		bookDetailsRepository.deleteById(book_detail_id);
	}

	public BookDetails findById(int book_detail_id) {
		// TODO Auto-generated method stub
		return bookDetailsRepository.findById(book_detail_id).orElse(null);
	}
	
	public boolean isNullOrEmpty(BookDetails bookDetails) {
		return bookDetails == null || (bookDetails.getBook_detail_status() == null);
	}

	public List<BookDetails> findAll() {
		// TODO Auto-generated method stub
		return bookDetailsRepository.findAll();
	}
}
