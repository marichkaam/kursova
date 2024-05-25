import React from 'react';
import { Link } from 'react-router-dom'; // Підключаємо компонент Link для навігації

const SuccessPage = () => {
  return (
    <div>
      <h1>Ваша заявка успішно прийнята!</h1>
      <Link to="/">Повернутись на головну сторінку</Link>
    </div>
  );
}

export default SuccessPage;
