package com.example.lms_backend.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.lms_backend.model.LoginResult;
import com.example.lms_backend.model.Role;
import com.example.lms_backend.model.User;
import com.example.lms_backend.service.RoleService;
import com.example.lms_backend.service.UserService;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173") // Allow React frontend
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private RoleService roleService;
	
	@PostMapping("/addUser")
    public User addBook(@RequestBody User user) {
        return userService.addUser(user);
    }
	
	@GetMapping("/getAll")
	public List<User> getUsers(){
		return userService.getUsers();
	}
	
	@GetMapping("/getUsername/{username}")
	public String getUsername(@PathVariable String username){
		User user = userService.getUsername(username);
		if(userService.isNullOrEmpty(user)) {
			return "true";
		}else {
			return "false";
		}
		
	}
	
	
	@GetMapping("/verifyLogin")
	public LoginResult checkLogin(@RequestParam(defaultValue = "empty") String username, @RequestParam(defaultValue = "empty") String password){
		
		User user = userService.getUsername(username);
		LoginResult lr;
		Role role = roleService.getRoleById(user.getUser_roles_id()) ;
		if(!userService.isNullOrEmpty(user)) {
			if(user.getUser_password().equals(password)) {
				lr = new LoginResult("Login Successfully", user.getUser_id(), role.getRole_name());
				return lr;
			}else {
				lr = new LoginResult("Login Failed. Incorrect Password", 0, role.getRole_name());
				return lr;
			}
		}else {
			lr = new LoginResult("Login Failed. User not found", 0, role.getRole_name());
			return lr;
		}
		
		
		
	}
	
	
	@PutMapping("/updatePassword") // Endpoint for updating an user password
    public String updateUserPassword(@RequestBody User user) {
		userService.save(user); // Save updated password to the database
        return "Password updated!"; // Return confirmation message
    }
	
	@GetMapping("/getLoginDetails/{userId}")
	public User getOneUser(@PathVariable int userId){
		return userService.findById(userId);
	}
	
	public static boolean isNullOrEmpty(User user) {
		return user == null || (user.getUser_password() == null);
	}
	
	
}
