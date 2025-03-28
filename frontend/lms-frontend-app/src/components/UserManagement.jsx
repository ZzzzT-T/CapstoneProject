import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]); // State to store roles
  const [editUser, setEditUser] = useState(null);

  // Fetch users from the API
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/users/getAll'); // Your API endpoint for users
        setUsers(response.data); // Assuming the response is an array of users
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Fetch roles from the API
  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await axios.get('http://localhost:9000/api/roles/getAll'); // Your API endpoint for roles
        setRoles(response.data); // Assuming the response is an array of roles
      } catch (error) {
        console.error('Error fetching roles:', error);
      }
    };

    fetchRoles();
  }, []);

  // Handle editing a user (only email and role)
  const handleEdit = (user) => {
    setEditUser({ ...user });
  };

  const handleSave = async () => {
    try {
      // Find the role ID based on the selected role name
      const selectedRole = roles.find(role => role.role_name === editUser.user_roles_id);
      
      if (selectedRole) {
        // Construct the updated user object
        const updatedUser = {
          ...editUser,
          user_roles_id: selectedRole.role_id, // Ensure we're sending the role_id
        };
  
        // Send a PUT request to update the user
        await axios.put(`http://localhost:9000/api/users/update`, updatedUser);
  
        // Update the local state with the updated user data
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === updatedUser.user_id ? updatedUser : user
          )
        );
        setEditUser(null); // Clear the edit form
      } else {
        console.error("Selected role not found");
      }
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  // Handle deleting a user
  const handleDelete = async (id) => {
    try {
      // Send a DELETE request to remove the user
      await axios.delete(`http://localhost:9000/api/users/delete/${id}`);

      // Update the local state to remove the user from the list
      setUsers((prevUsers) => prevUsers.filter((user) => user.user_id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Handle input changes for email and role
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const getRoleNameById = (roleId) => {
    const role = roles.find((role) => role.role_id === roleId);
    return role ? role.role_name : 'Unknown'; // Default to 'Unknown' if not found
  };

  return (
    <div>
      <h1>User Management</h1>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user_id}>
              <td>{user.user_fullname}</td>
              <td>
                {editUser && editUser.user_id === user.user_id ? (
                  <input
                    type="email"
                    name="email"
                    value={editUser.user_email}
                    onChange={handleChange}
                  />
                ) : (
                  user.user_email
                )}
              </td>
              <td>
                {editUser && editUser.user_id === user.user_id ? (
                  <select
                    name="user_roles_id"
                    value={editUser.user_roles_id} // Ensure this is the role_id
                    onChange={handleChange}
                  >
                    <option value="">Select a Role</option>
                    {/* Dynamically render role options */}
                    {roles.map((role) => (
                      <option key={role.role_id} value={role.role_name}>
                        {role.role_name}
                      </option>
                    ))}
                  </select>
                ) : (
                  getRoleNameById(user.user_roles_id) // Display role name
                )}
              </td>
              <td>
                {editUser && editUser.user_id === user.user_id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(user)}>Edit</button>
                )}
                <button onClick={() => handleDelete(user.user_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
