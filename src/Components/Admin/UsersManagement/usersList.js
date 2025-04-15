import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UsersList() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get('http://localhost:3001/user', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUsers(res.data));
  }, []);

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:3001/user/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    setUsers(users.filter(u => u._id !== id));
  };

  return (
    <div className="premium-users-list">
      <style>
        {`
          .premium-users-list {
            padding: 2.5rem;
            font-family: 'Segoe UI', Roboto, sans-serif;
            min-height: 100vh;
          }
          
          .premium-users-list h2 {
            color: #2c3e50;
            margin-bottom: 2rem;
            font-size: 2rem;
            font-weight: 600;
            padding-bottom: 1rem;
            border-bottom: 1px solid #e0e6f5;
          }
          
          .premium-button {
            padding: 0.7rem 1.8rem;
            margin: 0 1rem 2rem 0;
            background: linear-gradient(135deg, #5995fd 0%, #3a7bfd 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 0.95rem;
            font-weight: 500;
            box-shadow: 0 4px 12px rgba(89, 149, 253, 0.25);
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
          }
          
          .premium-button:hover {
            transform: translateY(-1px);
            box-shadow: 0 6px 16px rgba(89, 149, 253, 0.35);
            background: linear-gradient(135deg, #3a7bfd 0%, #2064fd 100%);
          }
          
          .premium-button.secondary {
            background: linear-gradient(135deg, #6c757d 0%, #495057 100%);
            box-shadow: 0 4px 12px rgba(108, 117, 125, 0.2);
          }
          
          .premium-button.secondary:hover {
            background: linear-gradient(135deg, #495057 0%, #343a40 100%);
          }
          
          .premium-button.danger {
            background: linear-gradient(135deg, #ff6b6b 0%, #f03e3e 100%);
            box-shadow: 0 4px 12px rgba(255, 107, 107, 0.25);
          }
          
          .premium-button.danger:hover {
            background: linear-gradient(135deg, #f03e3e 0%, #c92a2a 100%);
          }
          
          .premium-table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            margin-top: 1.5rem;
            background: white;
            border-radius: 12px;
            overflow: hidden;
            box-shadow: 0 5px 15px rgba(89, 149, 253, 0.08);
          }
          
          .premium-table thead {
            background: linear-gradient(to right, #5995fd, #3a7bfd);
            color: white;
            text-shadow: 0 1px 1px rgba(0,0,0,0.1);
          }
          
          .premium-table th {
            padding: 1.3rem 1.8rem;
            text-align: left;
            font-weight: 600;
            letter-spacing: 0.3px;
          }
          
          .premium-table td {
            padding: 1.2rem 1.8rem;
            border-bottom: 1px solid #f0f4ff;
            color: #495057;
            font-weight: 400;
          }
          
          .premium-table tr:last-child td {
            border-bottom: none;
          }
          
          .premium-table tr:hover td {
            background-color: #f5f8ff;
          }
          
          .action-buttons {
            display: flex;
            gap: 0.8rem;
          }
          
          .action-button {
            padding: 0.5rem 1.2rem;
            border-radius: 6px;
            font-size: 0.85rem;
            font-weight: 500;
            transition: all 0.2s ease;
          }
        `}
      </style>

      <h2>Gestion des Utilisateurs</h2>
      <button 
        className="premium-button" 
        onClick={() => navigate('./addUser')}
      >
        + Nouvel Utilisateur
      </button>

      <table className="premium-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Rôle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.nom}</td>
              <td>{user.prenom}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <div className="action-buttons">
                  <button 
                    className="premium-button secondary"
                    onClick={() => navigate(`./editUser/${user._id}`)}
                  >
                    Éditer
                  </button>
                  <button 
                    className="premium-button danger"
                    onClick={() => deleteUser(user._id)}
                  >
                    Supprimer
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        className="premium-button secondary" 
        onClick={() => navigate('../DashboardAdmin')}
      >
        ← Retour
      </button>
    </div>
  );
}

export default UsersList;