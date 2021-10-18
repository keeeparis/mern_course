import jwt from 'jsonwebtoken'
import config from 'config'
const {verify} = jwt

export default (req, res, next) => {
    if (req.method === 'OPTIONS') {
        return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(401).json({ message: 'Нет авторизации' })
        }

        const decoded = verify(token, config.get('jwtSecret'))
        req.user = decoded

        next()
    } catch (e) {
        res.status(401).json({ message: 'Нет авторизации' })
    }
}