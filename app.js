var os = require('os-utils')
var os2 = require('os')
const checkDiskSpace = require('check-disk-space').default
var fs = require('fs')
const express = require('express')
const app = express()
const port = 58100

// fs.readFile('temp.json', function (err, buf) {
//   console.log(buf.toString())
// })

fs.readFile('data.json', 'utf-8', (err, data) => {
  if (err) {
    // console.log(err)
    fs.writeFile('data.json', `{ "tes": "tes" }`, (err) => {
      if (err) console.log(err)
      //   console.log('Successfully Written to File.')
    })
  }
  console.log(data)
})
var disk = checkDiskSpace('C:/blabla/bla').then((diskSpace) => {
  return diskSpace
})
async function mrmr() {
  return os.cpuUsage(async (v) => {
    // console.log(v)
    Promise.all([disk, os2.freemem() / 1000000000, v]).then((x) => {
      let data = {
        disk: x[0],
        ram: x[1],
        cpu: x[2],
      }
      let final = JSON.stringify(data)

      fs.writeFile('data.json', final, (err) => {
        if (err) console.log(err)
        //   console.log('Successfully Written to File.')
      })
    })
  })
}

setInterval(() => {
  mrmr()
}, 5000)

app.get('/monitorcpu', (req, res) => {
  fs.readFile('data.json', 'utf-8', (err, data) => {
    if (err) {
      // console.log(err)
      fs.writeFile('data.json', `{ "tes": "tes" }`, (err) => {
        if (err) console.log(err)
        //   console.log('Successfully Written to File.')
      })
    }
    res.send(data)
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
