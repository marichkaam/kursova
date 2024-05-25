import React, { useState } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import backgroundImage from './login.jpg'; // Ensure the path is correct

const PageContainer = styled(Container)`
  background-image: url(${backgroundImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 100vh;
  width: 100vw; /* Make the container full width */
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
`;
const FormContainer = styled.div`
  background-color: rgba(167, 199, 231, 0.9); /* Semi-transparent background */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  color: #000000;
`;

const StyledButton = styled(Button)`
  background-color: #0056b3;
  border-color: #0056b3;
  &:hover {
    background-color: #004494;
    border-color: #004494;
  }
`;

const LoginPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const history = useHistory();

  const handleLogin = async (e) => {
    e.preventDefault();

    const loginRequestDTO = {
      login: login,
      password: password,
    };

    try {
      const response = await fetch('http://localhost:8080/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginRequestDTO),
      });

      const data = await response.json();

      if (data) {
        console.log('Login successful');
        // Redirect to a different page or perform other actions on successful login
        history.push('/mainn'); // Example redirection
      } else {
        setErrorMessage('Неправильний логін або пароль. Будь ласка, спробуйте ще раз.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <PageContainer fluid>
      <FormContainer>
        <h2>Вхід</h2>
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Form onSubmit={handleLogin}>
          <Form.Group controlId="login">
            <Form.Label>Логін</Form.Label>
            <Form.Control
              type="text"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              pattern="\d{8}"
              required
              placeholder="Введіть 8 цифр"
            />
          </Form.Group>
          <Form.Group controlId="password" className="mt-3">
            <Form.Label>Пароль</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength="4"
              required
              placeholder="Введіть пароль"
            />
          </Form.Group>
          <StyledButton type="submit" className="mt-3">Увійти</StyledButton>
        </Form>
        <div className="mt-3">
          <Link to="/register">Ще не маєте акаунту? Зареєструйтесь</Link>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default LoginPage;
