import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/users", async (req, res) => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await response.json();
    res.json(users);
  } catch (error) {
    console.error("Ошибка при запросе:", error);
    res.status(500).json({ error: "Не удалось получить данные" });
  }
});

app.listen(port, () => {
  console.log(`✅ Сервер запущен: http://localhost:${port}`);
});
