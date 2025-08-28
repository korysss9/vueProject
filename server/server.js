import express from "express";
import cors from "cors";

const app = express();
const port = 5000;

app.use(cors());

app.get("/api/products", (req, res) => {
  res.json([
    {
      name: "Apple MacBook Pro 17",
      color: "Серый",
      category: "Ноутбук",
      price: "$2999",
      brand: "Apple",
      stock: 10,
      rating: 4.8,
    },
    {
      name: "Microsoft Surface Pro",
      color: "Белый",
      category: "Ноутбук",
      price: "$1999",
      brand: "Microsoft",
      stock: 5,
      rating: 4.5,
    },
    {
      name: "Magic Mouse 2",
      color: "Черный",
      category: "Аксессуары",
      price: "$99",
      brand: "Apple",
      stock: 20,
      rating: 4.7,
    },
    {
      name: "Logitech MX Master 3",
      color: "Черный",
      category: "Аксессуары",
      price: "$120",
      brand: "Logitech",
      stock: 15,
      rating: 4.9,
    },
    {
      name: "Dell XPS 13",
      color: "Серебристый",
      category: "Ноутбук",
      price: "$1599",
      brand: "Dell",
      stock: 8,
      rating: 4.6,
    },
    {
      name: "Samsung Galaxy Tab S8",
      color: "Серый",
      category: "Планшет",
      price: "$699",
      brand: "Samsung",
      stock: 12,
      rating: 4.4,
    },
    {
      name: "HP Spectre x360",
      color: "Темно-серый",
      category: "Ноутбук",
      price: "$1899",
      brand: "HP",
      stock: 7,
      rating: 4.5,
    },
    {
      name: "Apple iPad Air",
      color: "Розовый",
      category: "Планшет",
      price: "$599",
      brand: "Apple",
      stock: 18,
      rating: 4.7,
    },
    {
      name: "Samsung Galaxy Buds Pro",
      color: "Черный",
      category: "Аксессуары",
      price: "$199",
      brand: "Samsung",
      stock: 25,
      rating: 4.6,
    },
    {
      name: "Asus ROG Zephyrus G14",
      color: "Белый",
      category: "Ноутбук",
      price: "$1499",
      brand: "Asus",
      stock: 6,
      rating: 4.8,
    }
  ]);
});

app.listen(port, () => {
  console.log(`✅ Сервер запущен: http://localhost:${port}`);
});
