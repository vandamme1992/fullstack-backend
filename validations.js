import { body } from 'express-validator';

//Валидатор форм? проверка какие данные прийдут
export const loginValidation = [
  body('email', 'wrong format email').isEmail(),
  body('password', 'password must be more than 5 characters').isLength({ min: 5 }),
];

export const registerValidation = [
  body('email', 'wrong format email').isEmail(),
  body('password', 'password must be more than 5 characters').isLength({ min: 5 }),
  body('fullName', 'name must be more than 3 characters').isLength({ min: 3 }),
  body('avatarUrl', 'wrong avatar link').optional().isURL(),
];

export const postCreateValidation = [
  body('title', 'enter article title').isLength({min: 3}).isString(),
  body('text', 'enter the text of the article').isLength({ min: 3 }).isString(),
  body('tags', 'invalid tags format (specify array').optional().isString(),
  body('imageUrl', 'wrong image link').optional().isString(),
];