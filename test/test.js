var fs = require("fs")
var easyTextMatch = require('../dist/easy-text-match')
var assert = require('assert');

var sampleText = fs.readFileSync('./test/config.xml', "utf-8");

describe('#between()', function () {
    it('should return an array of matched items', function () {
        var result = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>');
        assert.equal(result.success(), true);
        assert.equal(result.length, 6);
    });

    it('should support chain method', function () {
        var result = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('<name>', '</name>');
        assert.equal(result.success(), true);
        assert.equal(result.length, 6);
    });
});

describe('#innerText() & #outerText()', function () {
    it('should return correct innerText and outerText', function () {
        var result = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.backoffice.git')
            .between('<name>', '</name>')
        assert.equal(result.success(), true);
        assert.equal(result.innerText(), 'feature/QINR-2187-Extension-Order-Item-Problem');
        assert.equal(result.outerText(), '<name>feature/QINR-2187-Extension-Order-Item-Problem</name>');
    });

    it('should return the same value with the first element in array', function () {
        var result = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>');
        assert.equal(result.success(), true);
        assert.equal(result.innerText(), result[0].innerText());
        assert.equal(result.outerText(), result[0].outerText());
    });

    it('should return empty text when match nothing', function () {
        var result = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('no.such.text')
            .between('<name>', '</name>')
        assert.equal(result.success(), false);
        assert.equal(result.innerText(), '');
        assert.equal(result.outerText(), '');
    });
});

describe('#replaceInnerTextWith()', function () {
    it('should replace inner text with specified text', function () {
        var newText = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>')
            .replaceInnerTextWith('feature/QINR-2067-Price-Breakdown-for-Extensions');
        var result = easyTextMatch(newText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>');
        assert.equal(result.innerText(), 'feature/QINR-2067-Price-Breakdown-for-Extensions');
        assert.equal(result.outerText(), '<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');
    });

    it('should replace nothing and return original text when match nothing', function () {
        var result = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('no.such.text')
            .between('<name>', '</name>')
        assert.equal(result.success(), false);
        var newText = result.replaceInnerTextWith('feature/QINR-2067-Price-Breakdown-for-Extensions');
        assert.equal(newText, sampleText);
    });
});

describe('#replaceOuterTextWith()', function () {
    it('should replace outer text with specified text', function () {
        var newText = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>')
            .replaceOuterTextWith('<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');
        var result = easyTextMatch(newText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('qin.supplierportal')
            .between('<name>', '</name>');
        assert.equal(result.innerText(), 'feature/QINR-2067-Price-Breakdown-for-Extensions');
        assert.equal(result.outerText(), '<name>feature/QINR-2067-Price-Breakdown-for-Extensions</name>');
    });

    it('should replace nothing and return original text when match nothing', function () {
        var result = easyTextMatch(sampleText)
            .between('<hudson.plugins.git.GitSCM', '</hudson.plugins.git.GitSCM>')
            .between('no.such.text')
            .between('<name>', '</name>')
        assert.equal(result.success(), false);
        var newText = result.replaceOuterTextWith('feature/QINR-2067-Price-Breakdown-for-Extensions');
        assert.equal(newText, sampleText);
    });
});



