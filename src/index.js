function createRange(left, right, padLeft, padRight, getTextBetween, replaceTextBetween) {
    return {
        left: left,
        right: right,
        padLeft: padLeft,
        padRight: padRight,
        innerText() {
            return getTextBetween(this.left + this.padLeft, this.right - this.padRight);
        },
        outerText() {
            return getTextBetween(this.left, this.right);
        },
        replaceInnerTextWith(newText) {
            return replaceTextBetween(this.left + this.padLeft, this.right - this.padRight, newText)
        },
        replaceOuterTextWith(newText) {
            return replaceTextBetween(this.left, this.right, newText)
        }
    };
}

function executeMatch(text, beginPos, endPos, beginText, endText, handleMatched) {
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
        if (handleMatched) {
            if (!handleMatched(left, right, padLeft, padRight)) {
                break;
            }
        }
        index = right;
    }
}

function fillResult(result, array, failedElement) {
    //clear elements
    result.splice(0, result.length);

    //reload elements
    array.forEach(element => {
        result.push(element);
    });

    //update properties
    result.success = array.length > 0;
    var obj = array[0] || failedElement;
    result.left = obj.left;
    result.right = obj.right;
    result.padLeft = obj.padLeft;
    result.padRight = obj.padRight;
    result.innerText = () => obj.innerText();
    result.outerText = () => obj.outerText();
    result.replaceInnerTextWith = (newText) => obj.replaceInnerTextWith(newText);
    result.replaceOuterTextWith = (newText) => obj.replaceOuterTextWith(newText);
}

module.exports = (text) => {
    var getTextBetween = (left, right) => {
        return text.slice(left, right);
    };
    var replaceTextBetween = (left, right, newText) => {
        return text.substring(0, left) + newText + text.substr(right);
    };

    var failedElement = createRange(0, text.length - 1, 0, 0, () => text, () => text);

    var result = [];
    result.between = function (beginText, endText) {
        var objArray = [];
        this.forEach(obj => {
            executeMatch(text, obj.left, obj.right, beginText, endText,
                (left, right, padLeft, padRight) => {
                    objArray.push(createRange(left, right, padLeft, padRight, getTextBetween, replaceTextBetween));
                    return true;
                }
            );
        });

        fillResult(this, objArray, failedElement);
        return this;
    }

    fillResult(result, [createRange(0, text.length - 1, 0, 0, getTextBetween, replaceTextBetween)], failedElement);
    return result;
}