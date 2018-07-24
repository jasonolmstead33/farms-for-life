var merge = require('package-merge')
var fs = require('fs');

var dst = fs.readFileSync('package.a.json');
var src = fs.readFileSync('package.b.json');
fs.writeFile("/tmp/package.merged.json", merge(dst,src));