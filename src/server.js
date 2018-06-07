const express = require('express')
const fs = require('fs')
const mkdirp = require('mkdirp')
const os = require('os')
const exec = require('child_process').execSync
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const port = process.env.PORT || 5000
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(cors())

const dir = os.homedir() + '/.electio'

generateDirectory(dir, '0700')

app.post('/api/genKey', (req, res) => {

  generateDirectory(dir + '/keys', '0700')
  var s = req.body.election
  var obj = paillier(1, s);
  console.log(obj + "")
  res.status(201).send(obj)
})

app.post('/api/encrypt/', (req, res) => {
  var v = req.body.vote
  var pbk = req.body.pbk
  var s = v + " " + pbk.n + " " + pbk.nSquared + " " + pbk.g + " " + pbk.bits
  var obj = paillier(2, s)
  console.log("Encrypted :: " + obj)
  console.log()
  res.status(201).send(obj)
});

app.post('/api/decrypt/', (req, res) => {

  var file = dir + '/decrypt.json'
  var json = JSON.stringify(req.body)

  fs.writeFileSync(file, json, function(err) {
    if(err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

  var obj = paillier(3, file)
  console.log("Decrypted :: " + obj)
  res.status(201).send(obj)

  fs.truncate(file + '', 0, function(err)
  {
    if(err) {
      console.log(err);
    }
  })
})

app.post('/api/tally/', (req, res) => {
  var pbk = req.body.pbk
  var file = dir + '/tally.json'
  var json = JSON.stringify(req.body.votes)

  fs.writeFileSync(file, json, function(err) {
    if(err) {
      console.log(err)
      res.status(500).send(err)
    }
  })

  var s = pbk.n + " " + pbk.nSquared + " " + pbk.g + " " + pbk.bits + " " + file
  var obj = paillier(4, s)
  console.log("Tally :: " + obj)
  res.status(201).send(obj)

  fs.truncate(file + '', 0, function(err)
  {
    if(err) {
      console.log(err);
    }
  })
})

app.get('/api/pbk/:electionID', (req, res) => {

  var p = dir + '/keys/' + req.params.electionID + '.json'

  if (fs.existsSync(p)) {

    var election = require(p);
    var pbk = JSON.stringify(election.publickey, null, 4)
    res.header("Content-Type",'application/json')
    res.send(pbk)
  } else {
      res.status(500).send({ express: 'No file exists'})
  }
})

app.get('/api/pvk/:electionID', (req, res) => {

  var p = dir + '/keys/' + req.params.electionID + '.json'
  if (fs.existsSync(p)) {

    var election = require(p);
    var pvk = JSON.stringify(election.privatekey, null, 4)
    res.header("Content-Type",'application/json')
    res.send(pvk)
  } else {
      res.status(500).send({ express: 'No file exists'})
  }
})

app.listen(port, () => console.log(`Listening on port ${port}`))

function generateDirectory(path, mode) {

  if (!fs.existsSync(path)) {
    mkdirp(path, mode, function (err) {
      if (err) console.error(err)
      else console.log('Application folder ' + path + ' created')
    })
  }
}

function paillier(id, args) {
  return exec('java -jar ./crypto/paillier.jar ' + id + " " + args)
}
