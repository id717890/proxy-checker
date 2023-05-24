export const HttpStatus = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  CONFLICT: 409,
  INTERNAL_SERVER_ERROR: 500,
};

export const HttpStatusMessage = {
  [HttpStatus.FORBIDDEN]: 'Недостаточно прав',
  [HttpStatus.BAD_REQUEST]: 'Неправильный запрос',
  [HttpStatus.METHOD_NOT_ALLOWED]: 'Недопустимый метод',
  [HttpStatus.CONFLICT]: 'Конфликт данных',
};
