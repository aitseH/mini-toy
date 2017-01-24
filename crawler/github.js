import {execSync} from 'child_process'
import request from 'superagent'
import bluebird from 'bluebird'

global.Promise = bluebird
const fs = bluebird.promisifyAll(require('fs'))

const date = execSync("date -v-7d '+%Y-%m-%d'").toString().replace(/\n/, '')

const maps = {
  'github_trending': encodeURI(`https://api.github.com/search/repositories?q=created:>${date}&sort=starts&order=desc`),
  'github_issues': encodeURI(`https://api.github.com/search/repositories?q=created:>${date}&sort=comments&order=desc`)

}
const keyMap = Object.keys(maps)
const keyValue = Object.values(maps)
let requests = []

for (let i of keyValue){
  requests.push( request.get(i) )
}

const start = async () => {
  for (let i in requests){
    let data = await Promise.resolve(requests[i])
    let storeDir = keyMap[i]
    if(!fs.existsSync(storeDir)){
      fs.mkdirSync(`${__dirname}/${storeDir}`)
    }
    fs.writeFileAsync(`${storeDir}/${date}.json`, JSON.stringify(data.body.items, null, 2))
    console.log(`${++i} finished, ${requests.length - i} working`)
  }
}

start()
