import quizIcon from "../../assets/quiz.png";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";

function DashboardUser() {
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

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get("http://localhost:3001/quiz")
      .then((response) => {
        setQuizzes(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des quiz", error);
        setLoading(false);
      });
  }, []);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#1a1a2e',
      color: '#fff',
      padding: '2rem',
      boxSizing: 'border-box',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem', position: 'absolute', top: 15 }}>
        <h1 style={{ color: '#4cc9f0', fontSize: '2.5rem', fontWeight: 'bold' }}>Quiz App</h1>
        <p style={{ fontSize: '1.1rem', color: '#a8d0e6' }}>Bienvenue sur la plateforme Quiz.</p>
      </div>
      <div style={{ alignSelf: 'flex-end', position: 'absolute', top: 20, right: 20 }}>
        <button onClick={handleLogout}
          className="button"
          style={{
            backgroundColor: '#4361ee',
            borderColor: '#3a0ca3',
            fontWeight: 'bold',
            cursor: 'pointer',
            color: 'white',
            padding: '0.5rem 1rem',
            borderRadius: '5px'
          }}>Déconnexion
        </button>
      </div>
      <div className="table-rows-container" style={{position:'absolute' , top:'18%'}}>
        {quizzes.length > 0 ? (
          quizzes.map((quiz) => (
            <div className="table-row" key={quiz._id}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h1 className="table-cell">{quiz.title}</h1>
                <div className="table-cell description" style={{ alignSelf: 'flex-start', color: '#caf0f8' }}>{quiz.description}</div>
              </div>
              <button className="button "
                style={{
                  borderColor: '#3a0ca3',
                  backgroundColor: '#4895ef',
                  alignSelf: 'flex-end',
                  cursor: 'pointer',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '5px',
                  fontWeight: 'bold'
                }}
                onClick={() => navigate(`/dashboardAdmin/quiz/${quiz._id}/questions1_1`)}
              >Commencer</button>
            </div>
          ))
        ) : (
          <div className="empty-state">
            Aucun quiz disponible. Créez-en un nouveau !
          </div>
        )}
      </div>
      <style jsx>{`
        .quiz-list-container {
          padding: 2rem;
          width: 100%;
          height: 100vh;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        
        h1 {
          color: #f8f9fa;
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0;
          flex-grow: 1;
          text-align: center;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #4a4e69;
          color: #f8f9fa;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .back-button:hover {
          background: #3a3e5b;
        }
        
        .add-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #7209b7;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .add-button:hover {
          background: #5a0891;
          transform: translateY(-1px);
        }
        
        .quiz-table {
          background: #16213e;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          overflow: hidden;
          height: calc(100vh - 180px);
          display: flex;
          flex-direction: column;
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 2fr 3fr 1fr;
          background: #0f3460;
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: #e2f3f5;
          border-bottom: 1px solid #1a1a2e;
          flex-shrink: 0;
        }
        
        .table-rows-container {
          display:grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2rem 1rem;
          width:100%;
        }
        
        .table-row {
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          padding: 1rem 1.5rem;
          align-items: center;
          transition: background 0.2s;
          border-bottom: 1px solid #1a1a2e;
          height:280px;
          width:99.5%;
          background-color: #0f3460;
          border-radius: 8px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.2);
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .table-row:hover {
          background: #1a1a2e;
          transform: translateY(-3px);
        }
        
        .table-cell {
          color: #f8f9fa;
          padding: 0.5rem 0;
          font-size:20px;
        }
        
        .description {
          color: #a8d0e6;
          font-size: 1em;
        }
        
        .actions {
          display: flex;
          gap: 0.75rem;
          justify-content: flex-end;
        }
        
        .action-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .action-btn .icon {
          font-size: 1.1rem;
        }
        
        .view {
          background: #ebf8ff;
          color: #3182ce;
        }
        
        .edit {
          background: #fefcbf;
          color: #d69e2e;
        }
        
        .delete {
          background: #fff5f5;
          color: #e53e3e;
        }
        
        .action-btn:hover {
          transform: scale(1.1);
        }
        
        .empty-state {
          padding: 3rem;
          text-align: center;
          color: #a0aec0;
          font-size: 1.1rem;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .loader {
          padding: 2rem;
          text-align: center;
          color: #4a5568;
          flex-grow: 1;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        @media (max-width: 768px) {
          .header {
            flex-direction: row;
            flex-wrap: wrap;
          }

          .Sbutton {
            background-color: #7209b7;
            color: white;
            width:200px;
            height:150px;
            position:absolute;
            bottom:10px;
            left: 50%;
          }
          
          h1 {
            order: 1;
            width: 100%;
            margin: 1rem 0;
          }
          
          .back-button {
            order: 0;
          }
          
          .add-button {
            order: 2;
          }
          
          .table-header, .table-row {
            grid-template-columns: 1fr 1fr;
          }
          
          .table-header .actions,
          .table-row .actions {
            grid-column: span 2;
            justify-content: center;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default DashboardUser;