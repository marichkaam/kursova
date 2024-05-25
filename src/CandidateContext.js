import React, { createContext, useState, useEffect } from 'react';

export const CandidateContext = createContext();

export const CandidateProvider = ({ children }) => {
  const [candidates, setCandidates] = useState([]);

  const fetchCandidates = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/candidate/all');
      const data = await response.json();
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const deleteCandidate = async (id) => {
    try {
      const response = await fetch(`http://localhost:8080/api/v1/candidate/delete/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setCandidates(candidates.filter(candidate => candidate.id !== id));
      } else {
        console.error('Failed to delete candidate');
      }
    } catch (error) {
      console.error('Error deleting candidate:', error);
    }
  };

  return (
    <CandidateContext.Provider value={{ candidates, fetchCandidates, deleteCandidate }}>
      {children}
    </CandidateContext.Provider>
  );
};
