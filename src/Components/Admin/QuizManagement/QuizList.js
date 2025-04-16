import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiPlus, FiEye, FiEdit2, FiTrash2, FiArrowLeft } from "react-icons/fi";
import { FaQuestionCircle } from "react-icons/fa";

function QuizList() {
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

  const handleDeleteQuiz = (quizId) => {
      axios.delete(`http://localhost:3001/quiz/${quizId}`)
        .then(() => {
          setQuizzes(quizzes.filter(quiz => quiz._id !== quizId));
        })
        .catch(error => console.error("Erreur lors de la suppression", error));
  };

  return (
    <div className="quiz-list-container">
      <div className="header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          <FiArrowLeft className="icon" /> Retour
        </button>
        <h1>Gestion des Quiz</h1>
        <button 
          className="add-button"
          onClick={() => navigate("/dashboardAdmin/quizzes/add")}
        >
          <FiPlus className="icon" /> Nouveau Quiz
        </button>
      </div>

      {loading ? (
        <div className="loader">Chargement...</div>
      ) : (
        <div className="quiz-table">
          <div className="table-header">
            <div className="header-cell">Titre</div>
            <div className="header-cell">Description</div>
            <div className="header-cell actions">Actions</div>
          </div>

          <div className="table-rows-container">
            {quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <div className="table-row" key={quiz._id}>
                  <div className="table-cell">{quiz.title}</div>
                  <div className="table-cell description">{quiz.description}</div>
                  <div className="table-cell actions">
                    <button 
                      className="action-btn view"
                      onClick={() => navigate(`/dashboardAdmin/quiz/${quiz._id}/questions`)}
                    >
                      <FaQuestionCircle className="icon" />
                    </button>
                    <button 
                      className="action-btn edit"
                      onClick={() => navigate(`/dashboardAdmin/quizzes/edit/${quiz._id}`)}
                    >
                      <FiEdit2 className="icon" />
                    </button>
                    <button 
                      className="action-btn delete"
                      onClick={() => handleDeleteQuiz(quiz._id)}
                    >
                      <FiTrash2 className="icon" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="empty-state">
                Aucun quiz disponible. Créez-en un nouveau !
              </div>
            )}
          </div>
        </div>
      )}

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
          color: #2d3748;
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
          background: #edf2f7;
          color: #4a5568;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .back-button:hover {
          background: #e2e8f0;
        }
        
        .add-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #4f46e5;
          color: white;
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s;
        }
        
        .add-button:hover {
          background: #4338ca;
          transform: translateY(-1px);
        }
        
        .quiz-table {
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
          overflow: hidden;
          height: calc(100vh - 180px);
          display: flex;
          flex-direction: column;
        }
        
        .table-header {
          display: grid;
          grid-template-columns: 2fr 3fr 1fr;
          background: #f7fafc;
          padding: 1rem 1.5rem;
          font-weight: 600;
          color: #4a5568;
          border-bottom: 1px solid #e2e8f0;
          flex-shrink: 0;
        }
        
        .table-rows-container {
          overflow-y: auto;
          flex-grow: 1;
        }
        
        .table-row {
          display: grid;
          grid-template-columns: 2fr 3fr 1fr;
          padding: 1rem 1.5rem;
          align-items: center;
          transition: background 0.2s;
          border-bottom: 1px solid #edf2f7;
        }
        
        .table-row:last-child {
          border-bottom: none;
        }
        
        .table-row:hover {
          background: #f8fafc;
        }
        
        .table-cell {
          color: #2d3748;
          padding: 0.5rem 0;
        }
        
        .description {
          color: #718096;
          font-size: 0.95rem;
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

export default QuizList;