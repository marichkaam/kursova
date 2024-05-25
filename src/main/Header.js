import React, { useState } from 'react';
import './MainPage.css';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import axios from 'axios';  // Import axios to make HTTP requests

const Header = ({ onSearch, onClear, selectedCandidateId, selectedCandidateInitials, fetchCandidates }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchButtonClick = () => {
    onSearch(searchQuery);
  };

  const handleClearButtonClick = () => {
    setSearchQuery('');
    onClear();
  };

  const handleApplyClick = () => {
    window.location.href = '/apply';
  };

  const handleDeleteApplicationClick = () => {
    if (!selectedCandidateId) {
      alert('Please select a candidate to delete.');
      return;
    }
    setShowModal(true);
  };

  const handleDelete = async (login, password) => {
    try {
      const response = await axios.delete('http://localhost:8080/api/v1/candidate/delete', {
        data: {
          login,
          password
        }
      });
      if (response.status === 200) {
        alert('Кандидата успішно видалено.');
        fetchCandidates(); // Refresh the candidates list
      } else {
        alert('Не вдалося видалити кандидата. Спробуйте ще раз.');
      }
    } catch (error) {
      alert('Помилка під час видалення кандидата. Перевірте свої дані.');
    } finally {
      setShowModal(false);
    }
  };

  const handleLogout = () => {
    window.location.href = '/login';
  };

  return (
    <header className="header">
      <div className="top-buttons">
        <div className="left-buttons">
          <button className="main-button" onClick={handleApplyClick}>Подати заявку</button>
          <button className="main-button" onClick={handleDeleteApplicationClick}>Видалити заявку</button>
        </div>
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Пошук кандидатів..." 
            value={searchQuery} 
            onChange={handleSearchInputChange} 
          />
          <button className="search-button" onClick={handleSearchButtonClick}>Пошук</button>
          <button className="clear-button" onClick={handleClearButtonClick}>Очистити</button>
        </div>
        <button className="logout-button" onClick={handleLogout}>Вихід</button>
      </div>
      <DeleteConfirmationModal 
        show={showModal} 
        handleClose={() => setShowModal(false)} 
        handleDelete={handleDelete} 
      />
    </header>
  );
};

export default Header;
