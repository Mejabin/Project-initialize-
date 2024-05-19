import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import usersRouter from './app/module/user/users.route'

const app: Application = express()

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
//application routes
console.log(process.env)
app.use('api/v1/user',usersRouter)
//testing
app.get('/', (req: Request, res: Response) => {
  res.send('working successfully')
})

export default app
