import React from 'react';
import './Home.css';
import mayorImage from './mayor.jpg';  // Ensure this path is correct

function Home() {
  return (
    <div className="container">
      <div className="left-side">
        <h1>ВИБОРИ МЕРА 2024</h1>
        <div className="button-group">
          <button className="main-button" onClick={() => window.location.href = '/login'}>ВХІД НА СТОРІНКУ</button>
          <button className="main-button" onClick={() => window.location.href = '/register'}>ЗАРЕЄСТРУВАТИСЬ</button>
        </div>
        <img src={mayorImage} alt="Mayor 2024" className="mayor-image" />
      </div>
      <div className="right-side">
        <div className="sidebar">
          <h2>Вибори Мера 2024: Запрошуємо Кандидатів Подати Заявку</h2>
          <p>
            Ласкаво просимо на офіційний сайт виборів мера 2024 року! Якщо ви прагнете змінити своє місто на краще та маєте бачення його розвитку, ми запрошуємо вас подати свою кандидатуру.
          </p>
          <p>
            Місцеві вибори – це можливість для кожного активного громадянина взяти участь у формуванні майбутнього своєї громади. Подавши заявку, ви зможете:
          </p>
          <ul>
            <li>Реалізувати свої ідеї та запропонувати ефективні рішення для розвитку міста.</li>
            <li>Залучити підтримку від мешканців, які поділяють ваші погляди та цінності.</li>
            <li>Внести свій вклад у прозорість та демократичність виборчого процесу.</li>
          </ul>
          <p>
            На нашому сайті ви знайдете всю необхідну інформацію для реєстрації кандидатів, включаючи вимоги, строки та процедури. Не втрачайте шанс змінити своє місто на краще – подайте заявку вже сьогодні! Ваше місто потребує саме вас!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Home;
