var fs = require("fs")
var match = require('../easy-text-match')
var assert = require('assert');

var text = fs.readFileSync('./test/config.xml', "utf-8");

describe('#between() ', function() {
    it('result should be an array when matched more than once', function() {
        var result = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>');
        assert.equal(result.length, 6);
    });
});

describe('#between()', function() {
    it('result should have the properties of the first element in array', function() {
        var result = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>');
        assert.equal(result.innerText, result[0].innerText);
    });
});

describe('#between() ', function() {
    it('result should have the same method to match for all element', function() {
        var result = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('<name>', '</name>');
        assert.equal(result.length, 6);
    });
});

describe('#between() ', function() {
    it('result should have the same method to match for all element', function() {
        var result = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('<name>', '</name>')
        assert.equal(result.length, 6);
    });
});

describe('#replaceWith() ', function() {
    it('should return the replaced text', function() {
        var newText = match(text)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>')
            .replaceWith('<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');
        var result = match(newText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>');
        assert.equal(result.innerText, '<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');
    });
});



