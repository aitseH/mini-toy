import mongoose from 'mongoose'
import Word from './model'
import {mongodbUri} from './config'

mongoose.connect(mongodbUri)

const db = mongoose.connection

db.on('error', error => {
  console.error(error)
})

db.on('open', () => {
  const wordtest = new Word({ chinese:'你好', japanese: 'こんにちは', english: 'hello'})

  wordtest.save()
})