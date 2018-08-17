var formidable = require('formidable');
var fs = require('fs');
var path = require('path');

export default {
  Word(req, res) {
    let name = req.params.Name
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../static/words');

    form.on('file', function(field, file) { fs.rename(file.path, path.join(form.uploadDir, name)); });
    form.on('error', function(info) { return res.status(500).json({message: 'Ошибка загрузки аудио файла', info}) });
    form.on('end', function(file) { return res.json({result: true, Path: `/words/${name}`}); });
    form.parse(req);
  },
  Img(req, res) {
    let name = ""
    var form = new formidable.IncomingForm();
    form.uploadDir = path.join(__dirname, '../static/img');

    form.on('file', function(field, file) { fs.rename(file.path, path.join(form.uploadDir, file.name)); name = file.name; });
    form.on('error', function(info) { return res.status(500).json({message: 'Ошибка загрузки файла изображения', info}) });
    form.on('end', function(file) { return res.json({location: name}); });
    form.parse(req);
  }
}