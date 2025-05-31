const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!nombre || !email || !password) return res.status(400).json({ message: 'Faltan datos' });

  const userExists = await User.findOne({ email });
  if (userExists) return res.status(409).json({ message: 'Ya registrado' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = await User.create({ nombre, email, password: hashed });
  res.status(201).json({ message: 'Usuario creado', user: newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'No registrado' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

  const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1d' });
  res.json({ token, user });
};

const getProfile = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json(user);
};

const updateProgress = async (req, res) => {
  const { modulo, insignia } = req.body;
  const user = await User.findById(req.user.id);
  if (!user.modulosCompletados.includes(modulo)) user.modulosCompletados.push(modulo);
  if (insignia && !user.insignias.includes(insignia)) user.insignias.push(insignia);
  await user.save();
  res.json({ message: 'Progreso actualizado', user });
};

module.exports = { register, login, getProfile, updateProgress };
