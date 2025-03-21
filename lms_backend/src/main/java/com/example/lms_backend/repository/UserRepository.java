package com.example.lms_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.lms_backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{
	@Query("select max(user_id)+1 from tbl_users")
	int getNextId();

	User findFirstByUsername(String user_username);
}
