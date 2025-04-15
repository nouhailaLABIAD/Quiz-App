import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "../../Styles/dash.css"; // utilise ton CSS existant

import usersIcon from "../../assets/users.png";
import quizIcon from "../../assets/quiz.png";
import questionsIcon from "../../assets/question.png";

function DashboardAdmin() {
  const navigate = useNavigate();

  const handleLogout = () => {
    Swal.fire({
      title: 'Êtes-vous sûr de vouloir vous déconnecter ?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('token');
        navigate('/');
      }
    });
  };

  return (
    <div className="dashboard-admin">
      <div className="text-container">
        <h2>Dashboard Admin</h2>
        <p>Bienvenue sur le tableau de bord administrateur</p>
      </div>

      <div id="card-area">
        <h2 className="big">Espace d'administration</h2>
        <div className="wrapper">
          <div className="box-area">
            <div className="box">
              <img src={usersIcon} alt="Utilisateurs" />
              <div className="overlay">
                <h3>Gestion des utilisateurs</h3>
                <p>Créer, modifier, supprimer les utilisateurs.</p>
                <button onClick={() => navigate("/dashboardAdmin/users")}>Accéder</button>
              </div>
            </div>

            <div className="box">
              <img src={quizIcon} alt="Quiz" />
              <div className="overlay">
                <h3>Gestion des quiz</h3>
                <p>Ajouter, éditer ou supprimer les quiz.</p>
                <button onClick={() => navigate("/dashboardAdmin/quizzes")}>Accéder</button>
              </div>
            </div>

            
          </div>
        </div>

        <button className="logoutbtn" onClick={handleLogout}>
          <span className="spann"></span>Logout
        </button>
      </div>
    </div>
  );
}

export default DashboardAdmin;
