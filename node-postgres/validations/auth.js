import { body } from 'express-validator'

export const registerValidation = [
    body('login', 'Длина логина должна быть больше 3 символов').isLength({ min: 3 }),
    body('password', 'Длина пароля больше 3 символов').isLength({ min: 3 }),
]