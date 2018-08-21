function createTextRange(text, left, right, padLeft, padRight) {
    var textRange = {};
    textRange.originText = text;
    textRange.left = left;
    textRange.right = right;
    textRange.padLeft = padLeft;
    textRange.padRight = padRight;
    textRange.innerText = text.slice(left + padLeft, right - padRight);
    textRange.outerText = text.slice(left, right);
    textRange.between = function (beginText, endText) {
        return matchBetween(this, beginText, endText)
    };
    textRange.replaceInnerTextWith = function (newText) {
        return this.originText.substring(0, this.left + this.padLeft) + newText + this.originText.substr(this.right - this.padRight);
    };
    textRange.replaceOuterTextWith = function (newText) {
        return this.originText.substring(0, this.left) + newText + this.originText.substr(this.right);
    }
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
    extendArray(objArray, obj.originText);
    return objArray;
}

function extendArray(array, originText) {
    var first = array[0];
    if (first) {
        array.originText = first.originText;
        array.left = first.left;
        array.right = first.right;
        array.padLeft = first.padLeft;
        array.padRight = first.padRight;
        array.innerText = first.innerText;
        array.outerText = first.outerText;
        array.replaceInnerTextWith = function (newText) {
            return first.replaceInnerTextWith(newText);
        }
        array.replaceOuterTextWith = function (newText) {
            return first.replaceOuterTextWith(newText);
        }
    }
    else {
        array.originText = originText;
        array.left = 0;
        array.right = originText.length - 1;
        array.padLeft = 0;
        array.padRight = 0;
        array.innerText = originText;
        array.outerText = originText;
        array.replaceInnerTextWith = function (newText) {
            return this.originText;
        }
        array.replaceOuterTextWith = function (newText) {
            return this.originText;
        }
    }
    array.between = function (beginText, endText) {
        var objArray = [];
        this.forEach(obj => {
            objArray = objArray.concat(matchBetween(obj, beginText, endText))
        });
        extendArray(objArray, originText);
        return objArray;
    }
}

module.exports = (text) => {
    return createTextRange(text, 0, text.length - 1, 0, 0);
}