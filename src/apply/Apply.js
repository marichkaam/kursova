// src/Apply.js
import React, { useState, useContext } from 'react';
import './Apply.css';
import { useHistory } from 'react-router-dom'; // Import useHistory hook
import { CandidateContext } from '../CandidateContext';

const Apply = () => {
  const history = useHistory(); // Initialize useHistory
  const { fetchCandidates } = useContext(CandidateContext);
  const [form, setForm] = useState({
    surnameInitials: '',
    birthDate: '',
    birthPlace: '',
    popularityIndex: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitted Form:', form);

    try {
      const response = await fetch('http://localhost:8080/api/v1/candidate/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        const result = await response.json();
        fetchCandidates(); // Fetch updated list of candidates
      } else {
        console.error('Failed to submit the application');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="form-container">
      <button className="back-button" onClick={() => history.goBack()}>Назад</button> {/* Back button */}
      <h1>Подання заявки на кандидата в мери</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Прізвище та ініціали:</label>
          <input
            type="text"
            name="surnameInitials"
            value={form.surnameInitials}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Дата народження:</label>
          <input
            type="date"
            name="birthDate"
            value={form.birthDate}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Місце народження:</label>
          <input
            type="text"
            name="birthPlace"
            value={form.birthPlace}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Індекс популярності:</label>
          <input
            type="number"
            name="popularityIndex"
            value={form.popularityIndex}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="submit-button">Подати заявку</button>
      </form>
    </div>
  );
};

export default Apply;
