package com.example.lms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.model.Categories;
import com.example.lms_backend.repository.CategoriesRepository;

@Service
public class CategoriesService {
	@Autowired
	private CategoriesRepository categoriesRepository;

	public List<Categories> findAll() {
		// TODO Auto-generated method stub
		return categoriesRepository.findAll();
	}
	
}
