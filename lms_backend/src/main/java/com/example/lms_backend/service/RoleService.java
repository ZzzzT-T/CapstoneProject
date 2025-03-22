package com.example.lms_backend.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.model.Role;
import com.example.lms_backend.repository.*;

@Service
public class RoleService {
	@Autowired
	private RoleRepository roleRepository;
	
	public List<Role> getAllRoles(){
		return roleRepository.findAll();
	}
	
	public Role getRoleById(int id){
		return roleRepository.findById(id).orElse(null);
	}
	
	private int getNextId() {
		return roleRepository.getNextId();
	}
	
}
