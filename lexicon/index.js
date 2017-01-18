import mongoose from 'mongoose'
import {mongodbUri} from './config'

mongoose.connect(mongodbUri)

const db = mongoose.connection

db.on('error', error => {
  console.error(error)
})

db.once('open', () => {
  console.log('connect success')
})