import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'; // Import de l'icône de flèche

function AddQuiz() {
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    questions: []
  });
  
  const [currentQuestion, setCurrentQuestion] = useState({
    questionText: '',
    answers: ['', '', ''],
    correctAnswer: null
  });
  
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleQuizChange = (e) => {
    const { name, value } = e.target;
    setQuiz(prev => ({ ...prev, [name]: value }));
  };

 

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
  
    try {
      const response = await axios.post('http://localhost:3001/quiz', {
        title: quiz.title.trim(),
        description: quiz.description.trim()
      });
  
      const createdQuiz = response.data; // doit contenir l’_id du quiz
      navigate(`/dashboardAdmin/quizzes/`);
    } catch (error) {
      setError('Erreur lors de la création du quiz.');
    } finally {
      setIsSubmitting(false);
    }
  };
  

 
  return (
    <div className="quiz-form-container">
          
      <h1 className="form-title">Créer un nouveau Quiz</h1>
      <button 
        className="back-button"
        onClick={() => navigate(-1)} // Retour à la page précédente
      >
        <FiArrowLeft className="icon" /> Retour
      </button>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit} className="quiz-form">
        <div className="form-group">
          <label className="form-label">Titre du quiz:</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleQuizChange}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Description:</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleQuizChange}
            className="form-textarea"
          />
        </div>

        <button 
          type="submit" 
          disabled={isSubmitting}
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
        >
          {isSubmitting ? 'Création en cours...' : 'Créer le Quiz'}
        </button>
      </form>

      <style jsx>{`
        .quiz-form-container {
          width: 100%;
          padding: 2rem;
          font-family: 'Inter', sans-serif;
        }
        /* Style pour le nouveau bouton de retour */
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
          margin-bottom: 1.5rem;
          transition: all 0.2s ease;
        }
        .form-title {
          color: #2d3748;
          text-align: center;
          margin-bottom: 2rem;
          font-size: 2.2rem;
          font-weight: 600;
        }
        
        .error-message {
          color: #dc2626;
          background-color: #fee2e2;
          padding: 1.2rem;
          border-radius: 8px;
          margin-bottom: 2.5rem;
          text-align: center;
          border: 1px solid #fecaca;
          font-size: 1rem;
          width: 100%;
        }
        
        .quiz-form {
          background: #ffffff;
          padding: 3rem;
          border-radius: 12px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
          width: 100%;
          max-width: none;
          margin: 0 auto;
        }
        
        .form-group {
          margin-bottom: 2.5rem;
          width: 100%;
        }
        
        .form-label {
          display: block;
          margin-bottom: 1rem;
          color: #374151;
          font-weight: 500;
          font-size: 1.1rem;
        }
        
        .form-input {
          width: 100%;
          padding: 1.2rem;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          font-size: 1.1rem;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: #f9fafb;
        }
        
        .form-textarea {
          width: 100%;
          padding: 1.2rem;
          border: 1px solid #e5e7eb;
          border-radius: 10px;
          min-height: 150px;
          font-size: 1.1rem;
          resize: vertical;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          background-color: #f9fafb;
          line-height: 1.6;
        }
        
        .submit-btn {
          width: 100%;
          padding: 1.2rem;
          background-color: #6366f1;
          color: white;
          border: none;
          border-radius: 10px;
          font-size: 1.1rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          margin-top: 1rem;
        }
        
        @media (min-width: 1200px) {
          .quiz-form {
            padding: 3rem 5rem;
          }
          
          .form-input,
          .form-textarea {
            padding: 1.3rem;
          }
        }
      `}</style>
    </div>
  );
}


export default AddQuiz;
