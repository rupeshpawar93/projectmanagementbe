'use strict'

import { ResponseBody, handleResponse } from '../utilties/index.js'
import UserRouter from './userRoute.js'
import ProjectRouter from './projectRoute.js'
import TaskRouter from './taskRoute.js'

const Routes = [
  { path: '/user', router: UserRouter },
  { path: '/project', router: ProjectRouter },
  { path: '/task', router: TaskRouter }
]

Routes.init = (app) => {
  if (!app || !app.use) {
    console.error('[Error] Route Initialization Failed: app / app.use is undefined')
    return process.exit(1)
  }

  // Custom Routes
  Routes.forEach(route => app.use(route.path, route.router))

  // Final Route Pipeline
  app.use('*', (request, response, next) => {
    if (!request.isMatched) {
      const { method, originalUrl } = request
      const message = `Cannot ${method} ${originalUrl}`
      const error = new ResponseBody(404, message)
      response.body = error
    }
    return handleResponse(request, response, next)
  })

  // Route Error Handler
  app.use((error, request, response, next) => {
    if (!error) { 
        return process.nextTick(next) 
    }
    console.log("---error in rout", error);
    const { statusCode = 500, message } = error
    let responseBody

    if (error.constructor.name === 'ResponseBody') {
      responseBody = error
    } else {
      responseBody = new ResponseBody(statusCode, message, error)
    }

    response.body = responseBody
    return handleResponse(request, response, next)
  })
}

export default Routes
