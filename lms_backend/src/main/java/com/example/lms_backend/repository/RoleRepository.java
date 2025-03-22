package com.example.lms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.lms_backend.model.*;

@Repository
public interface RoleRepository extends JpaRepository<Role, Integer> {
	
	@Query("select max(role_id)+1 from tbl_roles")
	int getNextId();
}
