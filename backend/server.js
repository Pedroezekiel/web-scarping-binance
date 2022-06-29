const express = require('express');
const cors = require('cors');
const app = express();

const PORT = process.env.PORT || 4000;

// // middlewares
app.use(express.json());
app.use(cors());

// // routes
app.get('/', (req, res) => {
  res.status(200).json({ message: 'Binance Web-Scraping Backend' });
});

app.listen(PORT, () => console.log(`web-scraping api running on port ${PORT} :)`));
