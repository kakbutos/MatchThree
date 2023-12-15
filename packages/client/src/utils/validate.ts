export const requiredValidate = {
  required: 'Поле обязательно для заполнения',
};

export const passwordValidate = {
  pattern: {
    value: /^.*(([A-Z].*[\d])|([\d].*[A-Z])).*$/,
    message:
      'Длина пароля от 8 до 40 символов. Обязательно должен сдержать заглавную букву и цифру.',
  },
};

export const phoneValidate = {
  pattern: {
    value: /^(\+)?[\d]{10,15}$/,
    message: 'Номер телефона должен содержать от 10 до 15 цифр',
  },
};

export const emailValidate = {
  pattern: {
    value: /^[A-Za-z-_\d]+@[A-Za-z-_\d]+\.[A-Za-z-_\d]+$/,
    message: 'Некорректный email',
  },
};

export const loginValidate = {
  pattern: {
    value: /^[\da-zA-Z_-]*[a-zA-Z][\da-zA-Z_-]*$/,
    message:
      'Допустимые символы: латиница, цифры, дефис и нижнее подчёркивание. Должен содержать хотя бы одну букву',
  },
};

export const nameValidate = {
  pattern: {
    value: /^[A-ZА-Я][a-zA-Zа-я-А-Я-]*$/,
    message:
      'Допустимые символы: латиница, кириллица, дефис. Первая буква должна быть заглавной.',
  },
};

export const maxLengthValidate = (length: number) => ({
  maxLength: {
    value: length,
    message: `Максимальная длина ${length}`,
  },
});

export const minLengthValidate = (length: number) => ({
  minLength: {
    value: length,
    message: `Минимальная длина ${length}`,
  },
});
