package com.example.lms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.model.BookDetails;
import com.example.lms_backend.model.Categories;
import com.example.lms_backend.service.CategoriesService;

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class CategoriesController {
	@Autowired
	private CategoriesService categoriesService;
	
	@GetMapping
	public List<Categories> getBooksByBookId(){
		return categoriesService.findAll();
	}
}
