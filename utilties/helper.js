import http from 'http'
import { validationResult } from 'express-validator';

export const asyncWrapper = (fn) => {
  return function (req, res, next) {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

export class ResponseBody {
  constructor(statusCode, message, data, error) {
    this.statusCode = statusCode
    this.status = http.STATUS_CODES[statusCode]
    this.msg = message
    this.data = data
    this.error = error
  }
}

export const handleResponse = (request, response, next) => {
  const resBody = response.body || {}
  const { statusCode } = resBody
  const handler = ([301, 302].indexOf(statusCode) > -1)
    ? ""
    : sendResponse

  handler(request, response, next)
}

const sendResponse = (request, response, next) => {
  let resBody = response.body || {}
  const { statusCode } = resBody
  if (!resBody || !statusCode) {
    resBody = new ResponseBody(500, 'Response Data Not Found!')
  }
  response.status(resBody.statusCode).json(resBody)
}

export const validate = (req, res, next) => {
  const errors = validationResult(req);
  // if there is error then return Error
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }
  next()
};

export const routeSanity = (request, response, next) => {
  request.isMatched = true
  process.nextTick(next)
};