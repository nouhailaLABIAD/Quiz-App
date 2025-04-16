import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiPlus } from 'react-icons/fi';

const AddQuestion = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [choices, setChoices] = useState(['', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleChoiceChange = (i, value) => {
    const updated = [...choices];
    updated[i] = value;
    setChoices(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!choices.includes(correctAnswer)) {
      alert('La bonne réponse doit être parmi les choix proposés.');
      return;
    }
  
    const newQuestion = {
      quizId,
      text,
      choices,
      correctAnswer,
    };

    try {
      await axios.post('http://localhost:3001/questions', newQuestion, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      navigate(`/dashboardAdmin/quiz/${quizId}/questions`);
    } catch (error) {
      console.error('Erreur de requête:', error.response);
      alert(error.response?.data?.message || 'Erreur lors de l\'ajout.');
    }
  };

  return (
    <div className="form-container">
      <div className="header">
        <button 
          className="back-button"
          onClick={() => navigate(`/dashboardAdmin/quiz/${quizId}/questions`)}
        >
          <FiArrowLeft className="icon" /> Retour
        </button>
        <h1>Ajouter une question</h1>
      </div>

      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            placeholder="Entrez votre question"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Choix de réponse</label>
          {choices.map((choice, i) => (
            <input
              key={i}
              type="text"
              placeholder={`Option ${i + 1}`}
              value={choice}
              onChange={(e) => handleChoiceChange(i, e.target.value)}
              required
              className="form-input"
            />
          ))}
        </div>

        <div className="form-group">
          <label>Bonne réponse</label>
          <input
            type="text"
            placeholder="Entrez la bonne réponse"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          <FiPlus className="icon" /> Ajouter la question
        </button>
      </form>

      <style jsx>{`
        .form-container {
          padding: 2rem;
          max-width: 800px;
          margin: 0 auto;
          font-family: 'Inter', sans-serif;
        }
        
        .header {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          gap: 1rem;
        }
        
        h1 {
          color: #2d3748;
          font-size: 1.8rem;
          font-weight: 600;
          margin: 0;
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
        
        .question-form {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: #4a5568;
        }
        
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          font-size: 1rem;
          margin-bottom: 0.75rem;
          transition: border 0.2s;
        }
        
        .form-input:focus {
          outline: none;
          border-color: #4f46e5;
          box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
        }
        
        .submit-button {
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
          font-size: 1rem;
          margin-top: 1rem;
        }
        
        .submit-button:hover {
          background: #4338ca;
          transform: translateY(-1px);
        }
        
        @media (max-width: 768px) {
          .form-container {
            padding: 1rem;
          }
          
          .header {
            flex-direction: column;
            align-items: flex-start;
          }
          
          h1 {
            font-size: 1.5rem;
          }
          
          .question-form {
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default AddQuestion;