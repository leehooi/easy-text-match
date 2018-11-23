function createRange(left, right, padLeft, padRight, findBetween, replaceBetween) {
    return {
        left: () => left,
        right: () => right,
        innerText: () => findBetween(left + padLeft, right - padRight),
        outerText: () => findBetween(left, right),
        leftText: (len) => findBetween(left - (len || 0), left),
        rightText: (len) => findBetween(right, right + (len || 0)),
        replaceInnerTextWith: (newText) => replaceBetween(left + padLeft, right - padRight, newText),
        replaceOuterTextWith: (newText) => replaceBetween(left, right, newText)
    };
}

function executeMatch(text, beginPos, endPos, beginText, endText, matchHandler) {
    var index = beginPos;

    while (index < endPos) {
        var left = index;
        var padLeft = 0;
        if (beginText) {
            left = text.indexOf(beginText, index);
            if (left == -1) {
                break;
            }
            padLeft = beginText.length;
        }
        var right = endPos;
        var padRight = 0;
        if (endText) {
            right = text.indexOf(endText, left + padLeft);
            if (right == -1 || right > endPos) {
                break;
            }
            right += endText.length;
            padRight = endText.length;
        }
        if (matchHandler) {
            if (!matchHandler(left, right, padLeft, padRight)) {
                break;
            }
        }
        index = right;
    }
}

function fillResult(result, rangeArray, emptyRange) {
    //clear elements
    result.splice(0, result.length);

    //reload elements
    rangeArray.forEach(element => {
        result.push(element);
    });

    //update properties
    var range = rangeArray[0] || emptyRange;
    result.left = () => range.left();
    result.right = () => range.right();
    result.leftText = (len) => range.leftText(len);
    result.rightText = (len) => range.rightText(len);
    result.innerText = () => range.innerText();
    result.outerText = () => range.outerText();
    result.replaceInnerTextWith = (newText) => range.replaceInnerTextWith(newText);
    result.replaceOuterTextWith = (newText) => range.replaceOuterTextWith(newText);
}

module.exports = (text) => {
    var findBetween = (left, right) => text.slice(left, right);

    var replaceBetween = (left, right, newText) => text.substring(0, left) + newText + text.substr(right);

    var initialRange = createRange(0, text.length - 1, 0, 0, findBetween, replaceBetween);

    var emptyRange = createRange(-1, -1, 0, 0, () => '', () => text);

    var result = [];

    fillResult(result, [initialRange], emptyRange);

    result.between = function (beginText, endText) {
        var rangeArray = [];
        this.forEach(range => {
            executeMatch(text, range.left(), range.right(), beginText, endText,
                (left, right, padLeft, padRight) =>
                    rangeArray.push(createRange(left, right, padLeft, padRight, findBetween, replaceBetween))
            );
        });

        fillResult(this, rangeArray, emptyRange);
        return this;
    }

    result.filter = function(callback, thisValue) {
        var rangeArray = Array.prototype.filter.call(this, callback, thisValue);
        fillResult(this, rangeArray, emptyRange);
        return this;
    };

    result.success = function () {
        return this.length > 0;
    };

    return result;
}