import React from "react";

const Test = ({ onComplete }) => {
  const handleTestCompletion = () => {
    // Логика завершения теста
    onComplete();
  };

  return (
    <div>
      <h1>Тест</h1>
      <p>Здесь пользователь сможет пройти тест.</p>
      <button onClick={handleTestCompletion}>Завершить тест</button>
    </div>
  );
};

export default Test;
