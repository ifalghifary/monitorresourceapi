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

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err)
  }
  res.status(500)
  res.render('error', { error: err })
}

app.get('/monitorcpu', (req, res) => {
  if (req.headers.token == 'd01ffd81-72e3-4cc5-b3d4-5e88282e20ad') {
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
  } else {
    res.send('simple tool for monitor resource this pc')
  }
})
app.use(function (req, res) {
  res.status(404).send('simple tool for monitor resource this pc')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
