package com.example.lms_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.lms_backend.model.Categories;

public interface CategoriesRepository extends JpaRepository<Categories, Integer> {

}
