import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";

const TrackerActions = () => {
  const [skills, setSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [action, setAction] = useState(""); // Для ввода действия
  const [dailyCount, setDailyCount] = useState(0);
  const [journal, setJournal] = useState([]); // Журнал действий

  // Загружаем данные из localStorage при загрузке
  useEffect(() => {
    const storedSkills = localStorage.getItem("skills");
    const storedDailyCount = localStorage.getItem("dailyCount");
    const storedJournal = localStorage.getItem("journal");

    if (storedSkills) {
      setSkills(JSON.parse(storedSkills));
    }

    if (storedDailyCount) {
      setDailyCount(parseInt(storedDailyCount, 10));
    }

    if (storedJournal) {
      setJournal(JSON.parse(storedJournal));
    }
  }, []);

  // Обработчик выбора навыка
  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  // Обработчик ввода действия
  const handleActionChange = (event) => {
    setAction(event.target.value);
  };

  // Обработчик добавления действия
  const handleAddAction = () => {
    if (!selectedSkill || !action) {
      alert("Выберите навык и введите действие.");
      return;
    }

    if (dailyCount >= 3) {
      alert("Вы уже использовали 3 действия сегодня. Попробуйте завтра!");
      return;
    }

    // Обновляем навыки
    const updatedSkills = skills.map((skill) => {
        if (skill.name === selectedSkill) {
          // Увеличиваем прогресс навыка на 0.2
          const newEarned = Math.min(skill.earned + 0.2, skill.max - skill.current); // Ограничение по максимальному значению
          return { ...skill, earned: Math.round(newEarned * 10) / 10 }; // Округляем до 1 знака после запятой
        }
        return skill;
      });

    setSkills(updatedSkills);
    setDailyCount(dailyCount + 1);

    localStorage.setItem("skills", JSON.stringify(updatedSkills));
    localStorage.setItem("dailyCount", dailyCount + 1);

    // Добавляем запись в журнал
    const newEntry = {
      skill: selectedSkill,
      action: action,
      date: new Date().toLocaleString("ru-RU"),
      pointsAdded: 0.2, // Сохраняем количество очков
    };

    const updatedJournal = [...journal, newEntry];
    setJournal(updatedJournal);
    localStorage.setItem("journal", JSON.stringify(updatedJournal));

    // Сбрасываем ввод действия
    setAction("");
    alert(`Навык "${selectedSkill}" успешно прокачан!`);
  };

  // Функция для сброса лимита
  const handleReset = () => {
    setDailyCount(0);
    localStorage.setItem("dailyCount", "0");
    alert("Лимит действий сброшен!");
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Прокачать навыки
      </Typography>

      {/* Выбор навыка */}
      <FormControl fullWidth margin="normal">
  <InputLabel id="skill-label">Выберите навык</InputLabel>
  <Select
    labelId="skill-label"
    value={selectedSkill}
    onChange={handleSkillChange}
  >
    {skills
      .filter((skill) => skill.name !== "Дисциплина") // Исключаем "Дисциплину"
      .map((skill) => (
        <MenuItem key={skill.name} value={skill.name}>
          {skill.name}
        </MenuItem>
      ))}
  </Select>
</FormControl>

      {/* Ввод действия */}
      <TextField
        fullWidth
        label="Что вы сделали?"
        value={action}
        onChange={handleActionChange}
        placeholder="Например: Прочитал главу книги"
        margin="normal"
      />

      {/* Кнопка добавления действия */}
      <Box marginTop={2}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddAction}
          disabled={dailyCount >= 3}
        >
          Добавить действие
        </Button>
      </Box>
      <Typography variant="body2" color="textSecondary" marginTop={2}>
        Доступно действий сегодня: {3 - dailyCount}
      </Typography>

      {/* Кнопка сброса лимита */}
      <Box marginTop={4}>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Сбросить лимит
        </Button>
      </Box>

      {/* Секция журнала */}
      <Box marginTop={4}>
        <Typography variant="h5" gutterBottom>
          Журнал действий
        </Typography>
        {journal.length > 0 ? (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Навык</TableCell>
                <TableCell>Действие</TableCell>
                <TableCell>Дата</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {journal.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{entry.skill}</TableCell>
                  <TableCell>{entry.action}</TableCell>
                  <TableCell>{entry.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Typography color="textSecondary">
            Пока нет записей в журнале.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default TrackerActions;
