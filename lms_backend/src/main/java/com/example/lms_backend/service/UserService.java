package com.example.lms_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.lms_backend.model.User;
import com.example.lms_backend.repository.UserRepository;

@Service
public class UserService {
	
	@Autowired
	private UserRepository userRepository; 
	
	public User addUser(User user) {
		user.setUser_id(getNextId());
		return userRepository.save(user);
	}
	
	public User findById(int id) {
		return userRepository.findById(id).orElse(null);
	}

	public User save(User user) {
		// TODO Auto-generated method stub
		return userRepository.save(user);
	}

	public List<User> getUsers() {
		// TODO Auto-generated method stub
		return userRepository.findAll();
	}
	
	public User getUsername(String username) {
		return userRepository.findFirstByUsername(username);
	}
	
	private int getNextId() {
		return userRepository.getNextId();
	}
	
	public boolean isNullOrEmpty(User user) {
		return user == null || (user.getUser_password() == null);
	}
	
}
