const express = require('express');
const cors = require('cors');
require('dotenv').config();

const newsRoutes = require('./routes/news');
const analyzeRoutes = require('./routes/analyze');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/news', newsRoutes); 
app.use('/analyze', analyzeRoutes);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
