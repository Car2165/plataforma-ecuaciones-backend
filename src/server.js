const express = require('express');
const connectDB = require('./config/db');
const usersRoutes = require('./routes/users');
const cors = require('cors');
require('dotenv').config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRoutes);

const PORT = process.env.PORT || 5000;
app.get('/', (req, res) => {
  res.send('✅ Plataforma de ecuaciones funcionando correctamente.');
});
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
