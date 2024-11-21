import React, { useState } from "react";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import SkillTracker from "./components/SkillTracker";
import TrackerActions from "./components/TrackerActions";

function App() {
  const [currentTab, setCurrentTab] = useState(0); // Состояние для отслеживания текущей вкладки

  const renderTabContent = () => {
    switch (currentTab) {
      case 0:
        return <SkillTracker />; // Главная страница с навыками
      case 1:
        return <TrackerActions />; // Трекер прокачки
      default:
        return <SkillTracker />;
    }
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Контент текущей вкладки */}
      <Box sx={{ flex: 1, overflow: "auto" }}>{renderTabContent()}</Box>

      {/* Нижняя панель навигации */}
      <BottomNavigation
        value={currentTab}
        onChange={(event, newValue) => setCurrentTab(newValue)}
        showLabels
        sx={{ backgroundColor: "#f5f5f5", borderTop: "1px solid #ddd" }}
      >
        <BottomNavigationAction label="Главная" icon={<HomeIcon />} />
        <BottomNavigationAction label="Трекер прокачки" icon={<TrackChangesIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default App;
