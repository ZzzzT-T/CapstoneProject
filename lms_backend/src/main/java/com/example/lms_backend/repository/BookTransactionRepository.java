package com.example.lms_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.example.lms_backend.model.BookTransaction;
import com.example.lms_backend.model.User;

@Repository
public interface BookTransactionRepository extends JpaRepository<BookTransaction, Integer> {
	@Query("select coalesce(max(t.transaction_id), 0) + 1 from tbl_book_transaction t")
	int getNextId();

	List<BookTransaction> findAllByUser(User user);

	@Query("select t from tbl_book_transaction t where t.bookDetails.book_detail_id = :book_detail_id and t.transaction_status = 'Borrowed' "
			+ "order by transaction_date desc ")
	List<BookTransaction> findMaxTransactionWithDetailBookDetailId(@Param("book_detail_id") int book_detail_id);

	@Query("select t from tbl_book_transaction t where t.user.user_id = :userId and t.transaction_status = 'Borrowed'  and t.return_date is null ")
	List<BookTransaction> findByUserId(int userId);
	
}
