import React, { useEffect, useState } from "react";

function Journal() {
  const [entries, setEntries] = useState([]);

  // Загружаем данные журнала из localStorage
  useEffect(() => {
    const savedJournal = JSON.parse(localStorage.getItem("journal")) || [];
    setEntries(savedJournal);
  }, []);

  return (
    <div>
      <h1>Журнал действий</h1>
      {entries.length > 0 ? (
        <ul>
          {entries.map((entry, index) => (
            <li key={index}>
              {entry.date} — {entry.skill} (+{entry.amount})
            </li>
          ))}
        </ul>
      ) : (
        <p>Пока в журнале нет записей.</p>
      )}
    </div>
  );
}

export default Journal;
