import jwt from 'jsonwebtoken';
import User from '../model/User.js'; // Import your User model here

const SECRET = 'your-secret-key'; // Replace with your actual secret key

export const signup = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (user) {
    res.status(403).json({ message: 'User already exists' });
  } else {
    const newUser = new User({ username, password });
    await newUser.save();
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.headers;
  const user = await User.findOne({ username, password });

  if (user) {
    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } else {
    res.status(403).json({ message: 'Invalid username or password' });
  }
};