var fs = require("fs")
var match = require('./easy-text-match')

var text = fs.readFileSync('./config.xml', "utf-8");


var newXml = match(text)
    .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
    .between('qin.supplierportal')
    .between('<name>', '</name>')
    .replaceWith('<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');

fs.writeFileSync('./config_output.xml', newXml)
    
return;


