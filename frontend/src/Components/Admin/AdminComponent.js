import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminComponent.css";

const AdminComponent = () => {
  const [users, setUsers] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkIfUserIsAdmin();
    if (isAdmin) {
      fetchUsers();
    }
  }, [isAdmin]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/v1/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error(`Failed to delete user ${userId}:`, error);
    }
  };

  const checkIfUserIsAdmin = () => {
    const isAdmin = localStorage.getItem("isAdmin");
    setIsAdmin(Boolean(isAdmin));
  };

  // Console log to know if user is admin
  console.log(isAdmin);

  // Only render the component if the user is an admin
  return isAdmin ? (
    <div>
      <h2>User Management</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => deleteUser(user._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : null;
};

export default AdminComponent;
