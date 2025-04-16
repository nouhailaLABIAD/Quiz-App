import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const EditQuestion = () => {
  const { quizId, questionId } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/questions/quiz/${quizId}`);
        const found = res.data.find((q) => q._id === questionId);
        setQuestion(found);
        setLoading(false);
      } catch (err) {
        alert("Erreur lors du chargement de la question");
        setLoading(false);
      }
    };

    fetchQuestion();
  }, [quizId, questionId]);

  const handleChoiceChange = (i, value) => {
    const updated = [...question.choices];
    updated[i] = value;
    setQuestion({ ...question, choices: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!question.choices.includes(question.correctAnswer)) {
      alert('La bonne réponse doit être parmi les choix proposés.');
      return;
    }
  
    const updatedQuestion = {
      text: question.text,
      choices: question.choices,
      correctAnswer: question.correctAnswer,
    };

    try {
      await axios.put(`http://localhost:3001/questions/${questionId}`, updatedQuestion);
      navigate(`/dashboardAdmin/quiz/${quizId}/questions`);
    } catch (error) {
      alert(error.response?.data?.message || "Erreur lors de la modification.");
      console.error('Erreur de modification:', error.response?.data);
    }
  };

  if (loading) return (
    <div className="loader">
      <p>Chargement...</p>
    </div>
  );

  if (!question) return (
    <div className="empty-state">
      <p>Question introuvable</p>
    </div>
  );

  return (
    <div className="form-container">
      <div className="header">
        <button 
          className="back-button"
          onClick={() => navigate(`/dashboardAdmin/quiz/${quizId}/questions`)}
        >
          <FiArrowLeft className="icon" /> Retour
        </button>
        <h1>Modifier la question</h1>
      </div>

      <form onSubmit={handleSubmit} className="question-form">
        <div className="form-group">
          <label>Question</label>
          <input
            type="text"
            value={question.text}
            onChange={(e) => setQuestion({ ...question, text: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <div className="form-group">
          <label>Choix de réponse</label>
          {question.choices.map((choice, i) => (
            <input
              key={i}
              type="text"
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
            value={question.correctAnswer}
            onChange={(e) => setQuestion({ ...question, correctAnswer: e.target.value })}
            required
            className="form-input"
          />
        </div>

        <button type="submit" className="submit-button">
          <FiSave className="icon" /> Enregistrer les modifications
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
        
        .loader,
        .empty-state {
          padding: 3rem;
          text-align: center;
          color: #4a5568;
          font-size: 1.1rem;
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

export default EditQuestion;