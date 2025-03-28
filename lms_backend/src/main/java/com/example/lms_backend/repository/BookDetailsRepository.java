package com.example.lms_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.lms_backend.model.BookDetails;

@Repository
public interface BookDetailsRepository extends JpaRepository<BookDetails, Integer> {

	List<BookDetails> findAllByBooksBookId(int books_book_id);
	
	@Query("select max(book_detail_id)+1 from tbl_book_details")
	int getNextId();

	void deleteAllByBooksBookId(int books_book_id);
	
}
