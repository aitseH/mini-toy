import request from 'superagent'
import cheerio from 'cheerio'

let text = []

const requests = [
  request.get('https://zh.moegirl.org/Template:%E5%A4%A9%E6%9C%9D%E7%BD%91%E7%BB%9C%E6%B5%81%E8%A1%8C%E8%AF%AD%E5%8F%A5'),
  request.get('https://zh.moegirl.org/Template:%E6%88%90%E5%8F%A5'),
  request.get('https://zh.moegirl.org/Template:ACG%E7%BB%8F%E5%85%B8%E5%8F%B0%E8%AF%8D'),
  request.get('https://zh.moegirl.org/Template:ACG%E5%9C%88%E7%94%A8%E8%AF%AD')
]

const start = async () => {
  const rawDatas = await Promise.all(requests)
  const datas = rawDatas.map(o => o.res.text)

  datas.forEach(async o => {
    text = text.concat(filter(o))
  })
  console.log(text)
}

const filter = (data) => {
  let $ = cheerio.load(data)
  return $('.navbox .navbox-list a').map((i, el) => $(el).text()).get()
}

start()
