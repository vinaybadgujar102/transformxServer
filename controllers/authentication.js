import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../model/User.js'; 

const SECRET = 'your-secret-key'; 

export const signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'User created successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.headers;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(403).json({ message: 'Invalid username or password' });
    }

    const token = jwt.sign({ username, role: 'user' }, SECRET, { expiresIn: '1h' });
    res.json({ message: 'Logged in successfully', token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
