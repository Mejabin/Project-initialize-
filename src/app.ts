import express, { Application, Request, Response } from 'express'
import cors from 'cors'

const app: Application = express()

app.use(cors())

// Parser middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Testing endpoint
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})

export default app
