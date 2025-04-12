const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const chatRoutes = require('./routes/chat');

const app = express(); // ✅ MAKE SURE THIS LINE EXISTS

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/chat', chatRoutes);

app.get('/', (req, res) => {
  res.send('Backend running for Project UNMUTE Chatbot');
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
