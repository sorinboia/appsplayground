var express = require('express');
var router = express.Router();
var Busboy   = require('busboy');
var inspect = require('util').inspect;
var md5 = require('js-md5');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/upload', function(req, res, next) {
  res.json({error:'POST expected not GET'});
});

router.post('/upload', function(req, res, next) {
  console.log('*******************************************************');
  console.log(req.headers);
  var busboy = new Busboy({ headers: req.headers });
  fileBuffer = {};
  resStatus={};
  busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
    console.log('New file',filename, encoding, mimetype);
    fileBuffer[filename] = new Buffer(0);
    file.on('data', function(data) {
      fileBuffer[filename] = Buffer.concat([fileBuffer[filename],data]);
    });
    file.on('end', function() {
      console.log('File [' + filename + '] MD5 ',md5(fileBuffer[filename]));
      resStatus[filename] = md5(fileBuffer[filename]);
    });
  });
  busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
    console.log('Field [' + fieldname + ']: value: ' + inspect(val));
  });
  busboy.on('finish', function() {
    res.json(resStatus);
    res.end();
  });
  req.pipe(busboy);

});









module.exports = router;
