package com.example.lms_backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.model.Role;
import com.example.lms_backend.service.RoleService;

@RestController
@RequestMapping("/api/roles")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class RoleController {
	@Autowired
	private RoleService roleService;
	
	@GetMapping("/getAll")
	public List<Role> getAllRoles(){
		return roleService.getAllRoles();
	}
}
