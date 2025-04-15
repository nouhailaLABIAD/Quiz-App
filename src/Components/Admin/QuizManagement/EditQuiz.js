import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

function EditQuiz() {
  const [quiz, setQuiz] = useState({
    title: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { quizId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:3001/quiz/${quizId}`)
      .then(response => {
        const { title, description } = response.data;
        setQuiz({ title, description });
      })
      .catch(error => {
        console.error("Erreur lors de la récupération du quiz", error);
        setError("Erreur lors du chargement du quiz");
      });
  }, [quizId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuiz(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    
    axios
      .put(`http://localhost:3001/quiz/${quizId}`, quiz)
      .then(() => {
        navigate("/dashboardAdmin/quizzes");
      })
      .catch(error => {
        console.error("Erreur lors de la mise à jour du quiz", error);
        setError("Erreur lors de la mise à jour");
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  return (
    <div className="edit-quiz-container">
      <button className="back-button" onClick={() => navigate(-1)}>
        <FiArrowLeft /> Retour
      </button>
      
      <h1 className="page-title">Éditer le Quiz</h1>
      
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <label className="form-label">Titre du Quiz:</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleInputChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleInputChange}
            className="form-textarea"
          />
        </div>

        <button 
          type="submit" 
          className="submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Enregistrement...' : 'Mettre à jour le Quiz'}
        </button>
      </form>

      <style jsx>{`
        .edit-quiz-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          background: #f3f4f6;
          color: #4b5563;
          border: none;
          padding: 0.7rem 1.2rem;
          border-radius: 8px;
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: 2rem;
          transition: all 0.2s ease;
        }
        
        .back-button:hover {
          background: #e5e7eb;
        }
        
        .page-title {
          color: #111827;
          font-size: 2rem;
          margin-bottom: 2rem;
          text-align: center;
        }
        
        .error-message {
          color: #dc2626;
          background-color: #fee2e2;
          padding: 1rem;
          border-radius: 8px;
          margin-bottom: 2rem;
          text-align: center;
          border: 1px solid #fecaca;
        }
        
        .quiz-form {
          background: white;
          padding: 2.5rem;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }
        
        .form-group {
          margin-bottom: 2rem;
        }
        
        .form-label {
          display: block;
          margin-bottom: 0.8rem;
          color: #374151;
          font-weight: 500;
          font-size: 1.05rem;
        }
        
        .form-input {
          width: 100%;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          font-size: 1rem;
          transition: all 0.2s ease;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .form-textarea {
          width: 100%;
          padding: 1rem;
          border: 1px solid #d1d5db;
          border-radius: 8px;
          min-height: 150px;
          font-size: 1rem;
          resize: vertical;
          transition: all 0.2s ease;
        }
        
        .form-textarea:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
        }
        
        .submit-button {
          width: 100%;
          padding: 1rem;
          background-color: #4f46e5;
          color: white;
          border: none;
          border-radius: 8px;
          font-size: 1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          margin-top: 1rem;
        }
        
        .submit-button:hover:not(:disabled) {
          background-color: #4338ca;
          transform: translateY(-1px);
        }
        
        .submit-button:disabled {
          background-color: #9ca3af;
          cursor: not-allowed;
        }
        
        @media (max-width: 768px) {
          .edit-quiz-container {
            padding: 1.5rem;
          }
          
          .quiz-form {
            padding: 1.5rem;
          }
          
          .page-title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </div>
  );
}

export default EditQuiz;