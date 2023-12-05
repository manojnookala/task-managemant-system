const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/taskDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Task Schema
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: String,
});

const Task = mongoose.model('Task', taskSchema);

// Routes
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task({
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });

  try {
    const savedTask = await task.save();
    res.json(savedTask);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Other CRUD operations can be added similarly

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
