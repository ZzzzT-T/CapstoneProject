package com.example.lms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.lms_backend.model.Book;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {
	
	@Query("select max(book_id)+1 from tbl_books")
	int getNextId();
}