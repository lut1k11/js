const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Подключение к MongoDB
mongoose.connect('mongodb+srv://lut1k11:picGopQd3httc8qV@cluster0.53sz9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Определение схемы и модели для пользователей
const userSchema = new mongoose.Schema({
    twitchUsername: String,
    gradient: String,
    font: String,
    lastUpdated: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

// Эндпоинт для регистрации кастомизации
app.post('/register', async (req, res) => {
    const { twitchUsername, gradient, font } = req.body;

    const user = await User.findOneAndUpdate(
        { twitchUsername },
        { gradient, font, lastUpdated: Date.now() },
        { upsert: true, new: true }
    );

    res.json(user);
});

// Эндпоинт для получения всех кастомизированных никнеймов
app.get('/users', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// Эндпоинт для верификации кода
app.post('/verify', async (req, res) => {
    const { code, twitchUsername } = req.body;
    // Логика проверки кода, связывание с ником пользователя.
    // Например, если код найден, сохранить никнейм.
    res.json({ success: true });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});
