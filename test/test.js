var fs = require("fs")
var match = require('../dist/easy-text-match')
var assert = require('assert');

var text = fs.readFileSync('./test/config.xml', "utf-8");

describe('#between() ', function () {
    it('result should be an array of matched result', function () {
        var result = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>');
        assert.equal(result.length, 6);
    });
    
    it('result should have correct innerText and outerText', function () {
        var result = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.backoffice.git')
            .between('<name>', '</name>')
        assert.equal(result.innerText, 'feature/QINR-2187-Extension-Order-Item-Problem');
        assert.equal(result.outerText, '<name>feature/QINR-2187-Extension-Order-Item-Problem</name>');
    });

    it('result should have the same field and value of the first element in array', function () {
        var result = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>');
        assert.equal(result.innerText, result[0].innerText);
        assert.equal(result.outerText, result[0].outerText);
        assert.equal(result.originText, result[0].originText);
        assert.equal(result.originText, text);
    });
    
    it('result should have the method "between" to match for all element', function () {
        var result = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('<name>', '</name>');
        assert.equal(result.length, 6);
    });
});


describe('#replaceInnerTextWith() ', function () {
    it('should replace inner text with specified text', function () {
        var newText = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>')
            .replaceInnerTextWith('feature/QINR-2067-Price-Breakdown-for-Extensions');
        var result = match(newText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>');
        assert.equal(result.innerText, 'feature/QINR-2067-Price-Breakdown-for-Extensions');
        assert.equal(result.outerText, '<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');
    });
});

describe('#replaceOuterTextWith() ', function () {
    it('should replace outer text with specified text', function () {
        var newText = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>')
            .replaceOuterTextWith('<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');
        var result = match(newText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>');
        assert.equal(result.innerText, 'feature/QINR-2067-Price-Breakdown-for-Extensions');
        assert.equal(result.outerText, '<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');
    });
});



