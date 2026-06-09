const UserModel = require('../models/user');
const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth');

async function register(req, res) {
    const { email, password, name } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ error: 'Email, senha e nome são obrigatórios' });
    }

    if (password.length < 6) {
        return res.status(400).json({ error: 'A senha deve ter pelo menos 6 caracteres' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Email inválido' });
    }

    const novo = await UserModel.createUser(email, password, name);
    return res.status(201).json({ id: novo.id, email: novo.email, name: novo.name });
}

async function login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email e senha são obrigatórios' });
    }

    const user = await UserModel.getUserByEmail(email);

    if (!user || user.password !== password) {
        return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    const token = jwt.sign(
        { id: user.id, email: user.email },
        authConfig.jwt.secret,
        { expiresIn: authConfig.jwt.expiresIn }
    );

    return res.status(200).json({ token });
}

module.exports = { register, login };