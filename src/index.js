function createTextRange(text, left, right, padLeft, padRight) {
    var textRange = {};
    textRange.originText = text;
    textRange.left = left;
    textRange.right = right;
    textRange.padLeft = padLeft;
    textRange.padRight = padRight;
    textRange.innerText = text.slice(left + padLeft, right - padRight);
    textRange.outerText = text.slice(left, right);
    return textRange;
}

function matchBetween(obj, beginText, endText) {
    var objArray = [];
    var index = obj.left;

    while (index < obj.right) {
        var left = index;
        var padLeft = 0;
        if (beginText) {
            left = obj.originText.indexOf(beginText, index);
            if (left == -1) {
                break;
            }
            padLeft = beginText.length;
        }
        var right = obj.right;
        var padRight = 0;
        if (endText) {
            right = obj.originText.indexOf(endText, left);
            if (right == -1 || right > obj.right) {
                break;
            }
            right += endText.length;
            padRight = endText.length;
        }
        objArray.push(createTextRange(obj.originText, left, right, padLeft, padRight));
        index = right;
    }
    return objArray;
}

function extendArray(array, originText) {
    var obj = array[0] || {
        originText: originText,
        left: 0,
        right: originText.length - 1,
        padLeft: 0,
        padRight: 0,
        innerText: originText,
        outerText: originText
    };

    array.originText = obj.originText;
    array.left = obj.left;
    array.right = obj.right;
    array.padLeft = obj.padLeft;
    array.padRight = obj.padRight;
    array.innerText = obj.innerText;
    array.outerText = obj.outerText;
}

module.exports = (text) => {
    var result = [];
    result.push(createTextRange(text, 0, text.length - 1, 0, 0));
    extendArray(result, text);
    
    result.replaceInnerTextWith = function (newText) {
        return this.originText.substring(0, this.left + this.padLeft) + newText + this.originText.substr(this.right - this.padRight);
    };
    result.replaceOuterTextWith = function (newText) {
        return this.originText.substring(0, this.left) + newText + this.originText.substr(this.right);
    }
    result.between = function (beginText, endText) {
        var objArray = [];
        this.forEach(obj => {
            objArray = objArray.concat(matchBetween(obj, beginText, endText))
        });
        this.splice(0, this.length);
        objArray.forEach(obj => {
            this.push(obj);
        });
        extendArray(this, text);
        return this;
    }
    return result;
}