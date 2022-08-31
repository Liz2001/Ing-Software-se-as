const Users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const sendMail = require('./sendMail')

const { CLIENT_URL } = process.env

const userCtrl = {
    register: async (req, res) => {
        try {
            const { name, email, password } = req.body
            if (!name || !email || !password) {
                return res.status(400).json({ msg: 'Por favor, complete los campos.' })
            }
            if (!validateEmail(email)) {
                return res.status(400).json({ msg: 'Email inválido!' })
            }
            const user = await Users.findOne({ email })
            if (user) {
                return res.status(400).json({ msg: 'Este email ya está en uso. Por favor, ingresa uno diferente.' })
            }
            if (password.length < 8) {
                return res.status(400).json({ msg: 'La contraseña es muy corta. Debe ser mayor o igual a 8 caracteres.' })
            }
            const passwordHash = await bcrypt.hash(password, 12)
            const newUser = {
                name, email, password: passwordHash
            }
            const activation_token = createActivationToken(newUser)
            const url = `${CLIENT_URL}/user/activate/${activation_token}`
            sendMail(email, url, 'Verifica tu correo.')
            res.json({ msg: 'Registro exitoso! Por favor, activa tu cuenta para iniciar.' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    activateEmail: async (req, res) => {
        try {
            const { activation_token } = req.body
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN_SECRET)
            const { name, email, password } = user
            const check = await Users.findOne({ email })
            if (check) {
                return res.status(400).json({ msg: 'Este correo ya se encuentra registrado.' })
            }
            const newUser = new Users({
                name, email, password
            })
            await newUser.save()
            res.json({ msg: 'La cuenta a sido activada exitosamente!' })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await Users.findOne({ email })
            if (!user) {
                return res.status(400).json({ msg: 'Este email no existe.' })
            }
            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) {
                return res.status(400).json({ msg: 'La contraseña es incorrecta.' })
            }
            const refresh_token = createRefreshToken({ id: user._id })
            res.cookie('refreshtoken', refresh_token, {
                httpOnly: true,
                path: '/user/refresh_token',
                maxAge: 7 * 24 * 60 * 60 * 1000 //Activo por 7 días.
            })
            res.json({ msg: "Acceso concedido!" })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    },

    getAccessToken: (req, res) => {
        try {
            const rf_token = req.cookies.refreshtoken
            if (!rf_token) return res.status(400).json({ msg: 'Por favor, vuelve a acceder.' })
            jwt.verify(rf_token, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) return res.status(400).json({ msg: 'Por favor, vuelve a acceder.' })
                const access_token = createAccessToken({ id: user.id })
                res.json({ access_token })
            })
        } catch (err) {
            return res.status(500).json({ msg: err.message })
        }
    }
}

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@\']+(\.[^<>()[\]\\.,;:\s@\']+)*)|(\'.+\'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

const createActivationToken = (payload) => {
    return jwt.sign(payload, process.env.ACTIVATION_TOKEN_SECRET, { expiresIn: '5m' })
}

const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '15m' })
}

const createRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' })
}

module.exports = userCtrl