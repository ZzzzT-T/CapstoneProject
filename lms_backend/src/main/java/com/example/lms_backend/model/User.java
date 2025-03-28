package com.example.lms_backend.model;

import jakarta.persistence.Entity;
import jakarta.persistence.*;

@Entity(name="tbl_users")
public class User {
	@Id
	private int user_id;
	private String user_email; 
	private String user_fullname; 
	private String user_address; 
	private String user_contact_info;
	private int user_roles_id;
	private String user_password;
	@Column(name="user_username", nullable=false, length=512)
	private String username;
	
	public User() {}
	
	public User(int user_id, String user_email, String user_fullname, String user_address, String user_contact_info,
			int user_roles_id, String user_password,String username) {
		super();
		this.user_id = user_id;
		this.user_email = user_email;
		this.user_fullname = user_fullname;
		this.user_address = user_address;
		this.user_contact_info = user_contact_info;
		this.user_roles_id = user_roles_id;
		this.user_password = user_password;
		this.username = username;
	}
	
	public User(int user_id) {
		this.user_id = user_id;
	}
	
	public int getUser_id() {return user_id;}

	public void setUser_id(int user_id) {	this.user_id = user_id;}

	public String getUser_email() {return user_email;}

	public void setUser_email(String user_email) {this.user_email = user_email;}

	public String getUser_fullname() {	return user_fullname;}

	public void setUser_fullname(String user_fullname) {this.user_fullname = user_fullname;}

	public String getUser_address() {return user_address;}

	public void setUser_address(String user_address) {this.user_address = user_address;}

	public String getUser_contact_info() {return user_contact_info;}

	public void setUser_contact_info(String user_contact_info) {this.user_contact_info = user_contact_info;}

	public int getUser_roles_id() {return user_roles_id;}

	public void setUser_roles_id(int user_roles_id) {	this.user_roles_id = user_roles_id;}

	public String getUser_password() {return user_password;}

	public void setUser_password(String user_password) {this.user_password = user_password;}

	public String getUsername() {return username;}

	public void setUsername(String username) {this.username = username;}
	
	
	
	
}
