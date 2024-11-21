import React, { useEffect, useState } from "react";
import { Typography, Button, Box, Tooltip } from "@mui/material";

const SkillTracker = () => {
  const [skills, setSkills] = useState([]);
  const [coins, setCoins] = useState(0); // Состояние для монет

  const skillDescriptions = {
    Лидерство: {
      description: "Способность управлять командой и принимать решения.",
      recommendations: "Рекомендуется читать книги по управлению и участвовать в проектах.",
    },
    "Уверенность в себе": {
      description: "Умение верить в свои силы и принимать вызовы.",
      recommendations: "Практикуйте публичные выступления и улучшайте свои навыки самопрезентации.",
    },
    "Стрессоустойчивость": {
      description: "Способность сохранять спокойствие в сложных ситуациях.",
      recommendations: "Попробуйте техники медитации и управление временем.",
    },
    Коммуникабельность: {
      description: "Навыки эффективного общения с окружающими.",
      recommendations: "Посещайте мероприятия и улучшайте навыки активного слушания.",
    },
    "Креативность и инновационность": {
      description: "Способность придумывать оригинальные решения и идеи.",
      recommendations: "Занимайтесь творческими хобби и участвуйте в мозговых штурмах.",
    },
    "Организаторские способности": {
      description: "Умение планировать и эффективно организовывать задачи.",
      recommendations: "Создавайте списки задач и работайте с инструментами планирования.",
    },
    "Настойчивость и целеустремлённость": {
      description: "Способность достигать целей несмотря на препятствия.",
      recommendations: "Устанавливайте небольшие цели и награждайте себя за их достижение.",
    },
    "Эмоциональный интеллект": {
      description: "Умение понимать и управлять эмоциями.",
      recommendations: "Изучите практики эмпатии и техники контроля эмоций.",
    },
    Дисциплина: {
      description: "Способность выполнять задачи регулярно и в срок.",
      recommendations: "Следите за режимом дня и ведите дневник привычек.",
    },
  };

  useEffect(() => {
    const storedSkills = localStorage.getItem("skills");
    const storedCoins = localStorage.getItem("coins") || "0"; // Загружаем монеты
    const lastUpdate = localStorage.getItem("lastUpdate");

    // Текущая дата в формате yyyy-MM-dd
    const now = new Date();
    const moscowDate = new Date(
      now.toLocaleString("en-US", { timeZone: "Europe/Moscow" })
    );
    const today = moscowDate.toISOString().split("T")[0]; // Получаем yyyy-MM-dd

    if (storedSkills) {
      const parsedSkills = JSON.parse(storedSkills);

      if (lastUpdate !== today) {
        // Обновляем дисциплину и монеты
        const updatedSkills = parsedSkills.map((skill) => {
          if (skill.name === "Дисциплина") {
            const newEarned = Math.min(skill.earned + 0.3, skill.max);
            return { ...skill, earned: Math.round(newEarned * 10) / 10 };
          }
          return skill;
        });

        const updatedCoins = parseInt(storedCoins, 10) + 10; // Добавляем 10 монет
        setSkills(updatedSkills);
        setCoins(updatedCoins);

        localStorage.setItem("skills", JSON.stringify(updatedSkills));
        localStorage.setItem("coins", updatedCoins.toString());
        localStorage.setItem("lastUpdate", today);

        alert("Вы получили +0.3 к дисциплине и 10 монет за ежедневный вход!");
      } else {
        setSkills(parsedSkills);
        setCoins(parseInt(storedCoins, 10));
      }
    }
  }, []);

  const calculateProgress = (skill) => {
    const total = skill.current + skill.earned;
    const base = skill.current / skill.max;
    const extra = skill.earned / skill.max;

    return {
      base: base * 100,
      extra: extra * 100,
      remaining: 100 - base * 100 - extra * 100,
    };
  };

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h4" gutterBottom>
        Ваши навыки
      </Typography>

      {/* Отображение количества монет */}
      <Typography variant="h6" gutterBottom>
        Ваши монеты: {coins}
      </Typography>

      {skills.map((skill) => {
        const { base, extra, remaining } = calculateProgress(skill);
        return (
          <Box key={skill.name} sx={{ marginBottom: "20px" }}>
            <Tooltip
              title={
                <>
                  <Typography variant="body2">
                    <b>Описание:</b> {skillDescriptions[skill.name]?.description}
                  </Typography>
                  <Typography variant="body2">
                    <b>Рекомендации:</b> {skillDescriptions[skill.name]?.recommendations}
                  </Typography>
                </>
              }
              arrow
            >
              <Typography>{skill.name}</Typography>
            </Tooltip>
            <Box sx={{ display: "flex", height: "20px", marginTop: "5px" }}>
              <Box
                sx={{
                  width: `${base}%`,
                  backgroundColor: "#42a5f5",
                  height: "100%",
                }}
              />
              <Box
                sx={{
                  width: `${extra}%`,
                  backgroundColor: "#66bb6a",
                  height: "100%",
                }}
              />
              <Box
                sx={{
                  width: `${remaining}%`,
                  backgroundColor: "#e0e0e0",
                  height: "100%",
                }}
              />
            </Box>
            <Typography variant="body2" align="right" sx={{ marginTop: "5px" }}>
              {skill.current + skill.earned} / {skill.max}
            </Typography>
          </Box>
        );
      })}
      <Button variant="contained" color="primary" href="/tracker-actions">
        Прокачать навыки
      </Button>
    </div>
  );
};

export default SkillTracker;
