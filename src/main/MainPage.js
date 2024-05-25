import React, { useState, useContext } from 'react';
import './MainPage.css';
import { CandidateContext } from '../CandidateContext';
import Header from './Header';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import axios from 'axios';

const MainPage = () => {
  const { candidates, fetchCandidates } = useContext(CandidateContext);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [selectedCandidateInitials, setSelectedCandidateInitials] = useState('');
  const [showModal, setShowModal] = useState(false);

  const handleSearch = (searchQuery) => {
    setSearchQuery(searchQuery);
  };

  const handleClear = () => {
    setSearchQuery('');
  };

  const handleRowClick = (id, initials) => {
    if (selectedCandidateId === id) {
      setSelectedCandidateId(null);
      setSelectedCandidateInitials('');
    } else {
      setSelectedCandidateId(id);
      setSelectedCandidateInitials(initials);
    }
  };

  const handleDeleteClick = () => {
    if (selectedCandidateId) {
      setShowModal(true);
    }
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

  const filteredCandidates = candidates.filter(candidate =>
    candidate.surnameInitials && candidate.surnameInitials.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="main-page">
      <Header
        onSearch={handleSearch}
        onClear={handleClear}
        selectedCandidateId={selectedCandidateId}
        selectedCandidateInitials={selectedCandidateInitials}
        fetchCandidates={fetchCandidates}
        onDelete={handleDeleteClick}
      />
      <h1>Кандидати</h1>
      {filteredCandidates.length === 0 && searchQuery.length > 0 ? (
        <div className="no-results">
          <p>На жаль, кандидата не знайдено</p>
        </div>
      ) : (
        <div className="candidates-scroll-container">
          <table className="candidates-table">
            <thead>
              <tr>
                <th>#</th>
                <th>ПІБ</th>
                <th>Дата народження</th>
                <th>Місце народження</th>
                <th>Індекс популярності</th>
              </tr>
            </thead>
            <tbody>
              {filteredCandidates.map((candidate, index) => (
                <tr
                  key={index}
                  className={`candidate ${candidate.id === selectedCandidateId ? 'selected' : ''}`}
                  onClick={() => handleRowClick(candidate.id, candidate.surnameInitials)}
                >
                  <td>{index + 1}</td>
                  <td>{candidate.surnameInitials}</td>
                  <td>{candidate.birthDate}</td>
                  <td>{candidate.birthPlace}</td>
                  <td>{candidate.popularityIndex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <DeleteConfirmationModal
        show={showModal}
        handleClose={() => setShowModal(false)}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default MainPage;
