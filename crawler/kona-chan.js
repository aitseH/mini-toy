import request from 'superagent'
import cheerio from 'cheerio'
import http from 'http'
import fs from 'fs'


let storeDir = __filename.split('/').pop().split('.').shift()

const download = (data) => {
  const file = fs.createWriteStream(`${storeDir}/${data.filename}`)
  http.get(data.url, res => {
    res.pipe(file)
  })
}

const range = (count) => {
  let arr = []
  for (let i = 0; i<count; i++){
    arr.push(i)
  }
  return arr
}

const main = async () => {

  for (let x of range(1)){
    let res = await request.get(`http://konachan.net/post?page=${x}&tag=`)
    let $ = cheerio.load(res.text)
    let datas = []
    $('.preview').each((i,el) => {
      let src = `http:${$(el).attr('src')}`
      datas.push({
        src,
        filename: src.split('/').pop()
      })
    })

    for (let data of datas) {
      console.log(data)
      download(data)
    }
  }
  console.log('end')
}


const checkDir = async (storeDir) => {
  if(!fs.existsSync(storeDir)){
      fs.mkdirSync(`${__dirname}/${storeDir}`)
    }
}

checkDir(storeDir)
main()
