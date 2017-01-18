import mongoose from 'mongoose'  
  
const wordSchema = mongoose.Schema({
  chinese: String,
  english: String,
  japanese: String
})

const Word = mongoose.model('words', wordSchema)

export default Word