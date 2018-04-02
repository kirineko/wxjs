var express = require('express');
var router = express.Router();
const crypto = require('crypto');

/* GET home page. */
router.get('/', function(req, res, next) {
  try {
    let data = req.query;
    console.log(data);
    if (Object.keys(data).length == 0) {
      res.send('no params');
    }
    let signature = data.signature;
    let timestamp = data.timestamp;
    let nonce = data.nonce;
    let echostr = data.echostr;
    let token = 'hello2016';
    
    let list = [token, timestamp, nonce];
    list.sort();
    let sha1 = crypto.createHash('sha1');
    list.map(key => sha1.update(key));
    let hashcode = sha1.digest('hex');
    console.log("handle/GET func: hashcode, signature: ", hashcode, signature);
    if (hashcode == signature) {
      res.send(echostr)
    } else {
      res.send('')
    }
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
