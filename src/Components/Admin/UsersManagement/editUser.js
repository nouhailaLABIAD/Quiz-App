import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const [form, setForm] = useState({
    nom: '',
    prenom: '',
    email: '',
    password: '',
    role: 'user'
  });
  
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/user/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { nom, prenom, email, role } = res.data;
        setForm({ nom, prenom, email, role, password: '' });
      } catch (error) {
        console.error("Erreur lors du chargement de l'utilisateur :", error);
      }
    };
    fetchUser();
  }, [id]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.put(`http://localhost:3001/user/${id}`, form, {
      headers: { Authorization: `Bearer ${token}` }
    });
    navigate('/dashboardAdmin/users');
  };

  return (
    <div style={{ 
      padding: '2rem',
      maxWidth: '600px',
      margin: '0 auto',
      fontFamily: "'Segoe UI', Roboto, sans-serif"
    }}>
      <style>
        {`
          .edit-form-container {
            background: white;
            padding: 2rem;
            border-radius: 10px;
            box-shadow: 0 4px 12px rgba(89, 149, 253, 0.1);
          }
          
          .edit-form-container h2 {
            color: #3a7bfd;
            margin-bottom: 1.5rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid #e1e9ff;
          }
          
          .edit-form-container input, 
          .edit-form-container select {
            width: 100%;
            padding: 12px 15px;
            margin: 8px 0;
            border: 1px solid #e1e9ff;
            border-radius: 6px;
            font-size: 1rem;
            transition: all 0.3s;
            box-sizing: border-box;
          }
          
          .edit-form-container input:focus, 
          .edit-form-container select:focus {
            border-color: #5995fd;
            outline: none;
            box-shadow: 0 0 0 2px rgba(89, 149, 253, 0.2);
          }
          
          .edit-form-container button {
            background: #5995fd;
            color: white;
            padding: 12px 20px;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            font-size: 1rem;
            font-weight: 500;
            margin-top: 1rem;
            width: 100%;
            transition: all 0.3s;
          }
          
          .edit-form-container button:hover {
            background: #3a7bfd;
            transform: translateY(-1px);
          }
          
          .edit-form-container input[type="password"]::placeholder {
            color: #adb5bd;
            font-size: 0.9rem;
          }
        `}
      </style>

      <div className="edit-form-container">
      <button className="back-button" onClick={() => navigate(-1)}>
                <FiArrowLeft /> Retour
        </button>
        <h2>Modifier l'utilisateur</h2>
         
        <form onSubmit={handleSubmit}>
          <input 
            placeholder="Nom" 
            type="text" 
            value={form.nom}
            onChange={e => setForm({ ...form, nom: e.target.value })} 
            required 
          />
          <input 
            placeholder="Prénom" 
            type="text" 
            value={form.prenom}
            onChange={e => setForm({ ...form, prenom: e.target.value })} 
            required 
          />
          <input 
            placeholder="Email" 
            type="email" 
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })} 
            required 
          />
          <input 
            placeholder="Mot de passe (laisser vide si inchangé)" 
            type="password"
            value={form.password} 
            onChange={e => setForm({ ...form, password: e.target.value })} 
          />
          <select 
            value={form.role} 
            onChange={e => setForm({ ...form, role: e.target.value })}
          >
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
          <button type="submit">Enregistrer les modifications</button>
        </form>
      </div>
    </div>
  );
}

export default EditUser;