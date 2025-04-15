import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";

function AddUser() {
    const [form, setForm] = useState({
        nom: '',
        prenom: '',
        email: '',
        password: '',
        role: 'user'
    });
    const navigate = useNavigate();
    const token = localStorage.getItem('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://localhost:3001/user', form, { headers: { Authorization: `Bearer ${token}` } });
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
                    .form-container {
                        background: white;
                        padding: 2rem;
                        border-radius: 10px;
                        box-shadow: 0 4px 12px rgba(89, 149, 253, 0.1);
                    }
                    
                    h2 {
                        color: #3a7bfd;
                        marginBottom: '1.5rem',
                        paddingBottom: '0.5rem',
                        borderBottom: '1px solid #e1e9ff'
                    }
                    
                    input, select {
                        width: 100%;
                        padding: 12px 15px;
                        margin: 8px 0;
                        border: 1px solid #e1e9ff;
                        border-radius: 6px;
                        font-size: 1rem;
                        transition: all 0.3s;
                        box-sizing: border-box;
                    }
                    
                    input:focus, select:focus {
                        border-color: #5995fd;
                        outline: none;
                        box-shadow: 0 0 0 2px rgba(89, 149, 253, 0.2);
                    }
                    
                    button {
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
                    
                    button:hover {
                        background: #3a7bfd;
                        transform: translateY(-1px);
                    }
                `}
            </style>

            <div className="form-container">
            <button className="back-button" onClick={() => navigate(-1)}>
                        <FiArrowLeft /> Retour
                      </button>
                <h2>Ajouter un utilisateur</h2>
                 
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
                        placeholder="Mot de passe" 
                        type="password" 
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })} 
                        required 
                    />
                    <select 
                        value={form.role} 
                        onChange={e => setForm({ ...form, role: e.target.value })}
                    >
                        <option value="user">Utilisateur</option>
                        <option value="admin">Administrateur</option>
                    </select>
                    <button type="submit">Ajouter l'utilisateur</button>
                </form>
            </div>
        </div>
    );
}

export default AddUser;