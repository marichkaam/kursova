import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import registerUser from './api'; // Adjust path if necessary
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
  color: #000000; /* Black text for better contrast */
`;

const StyledButton = styled(Button)`
  background-color: #0056b3;
  border-color: #0056b3;
  &:hover {
    background-color: #004494;
    border-color: #004494;
  }
`;

const RegisterPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('candidate'); // Додано новий стан для ролі
  const history = useHistory();

  const handleRegister = (e) => {
    e.preventDefault();

    const userData = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      login: login,
      password: password,
      confirmPassword: confirmPassword,
      role: role, // Include role if needed
    };

    // Call registerUser function
    registerUser(userData)
      .then(() => {
        // Registration successful
        console.log('User registered successfully');
        history.push('/login'); // Redirect to login
      })
      .catch((error) => {
        // Registration failed
        console.error('Registration failed:', error);
        alert('Registration failed'); // Show error message
      });

    // Перевірка на валідність даних та логіка реєстрації
    if (password !== confirmPassword) {
      alert('Паролі не співпадають');
      return;
    }

    // Логіка реєстрації (приклад)
    // Тут ви можете додати ваш API-запит для реєстрації користувача
    const isSuccess = true; // Змінити на реальний результат реєстрації

    if (isSuccess) {
      // Перенаправлення на сторінку входу після успішної реєстрації
      history.push('/login');
    }
  };

  return (
    <PageContainer fluid>
      <FormContainer>
        <h2>Реєстрація</h2>
        <Form onSubmit={handleRegister}>
          <Form.Group controlId="firstName">
            <Form.Label>Ім'я</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              placeholder="Введіть ім'я"
            />
          </Form.Group>
          <Form.Group controlId="lastName" className="mt-3">
            <Form.Label>Прізвище</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              placeholder="Введіть прізвище"
            />
          </Form.Group>
          <Form.Group controlId="email" className="mt-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Введіть електронну адресу"
            />
          </Form.Group>
          <Form.Group controlId="login" className="mt-3">
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
          <Form.Group controlId="confirmPassword" className="mt-3">
            <Form.Label>Підтвердіть пароль</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              minLength="4"
              required
              placeholder="Підтвердіть пароль"
            />
          </Form.Group>
          <Form.Group controlId="role" className="mt-3">
            <Form.Label>Тип реєстрації</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="candidate">Зареєструватись як кандидат</option>
              <option value="voter">Зареєструватись як той хто голосує</option>
              <option value="admin">Адміністратор</option>
            </Form.Control>
          </Form.Group>
          <StyledButton type="submit" className="mt-3">Зареєструватись</StyledButton>
        </Form>
        <div className="mt-3">
          <Link to="/login" style={{ color: '#ffffff' }}>Вже маєте акаунт? Увійти</Link>
        </div>
      </FormContainer>
    </PageContainer>
  );
};

export default RegisterPage;
