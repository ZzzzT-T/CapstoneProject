package com.example.lms_backend.model;

public class LoginResult {
	private String results;
	private int userId;
	private String userRole;
	public LoginResult() {
		super();
		// TODO Auto-generated constructor stub
	}
	public LoginResult(String results, int userId, String userRole) {
		super();
		this.results = results;
		this.userId = userId;
		this.userRole = userRole;
	}
	public String getResults() {
		return results;
	}
	public void setResults(String results) {
		this.results = results;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public String getUserRole() {
		return userRole;
	}
	public void setUserRole(String userRole) {
		this.userRole = userRole;
	}
	
	
}
