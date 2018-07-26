function createTextRange(text, beginPos, endPos) {
    return {
        origin: text,
        beginPos: beginPos,
        endPos: endPos,
        innerText: text.slice(beginPos, endPos),
        between: function (beginText, endText) {
            return matchBetween(this, beginText, endText)
        },
        replaceWith: function (newText) {
            return this.origin.substring(0, this.beginPos) + newText + this.origin.substr(this.endPos);
        }
    };
}

function matchBetween(obj, beginText, endText) {
    var objArray = [];
    var index = obj.beginPos;

    while (index < obj.endPos) {
        var beginPos = index;
        if (beginText) {
            beginPos = obj.origin.indexOf(beginText, index);
            if (beginPos == -1) {
                break;
            }
        }
        var endPos = obj.endPos;
        if (endText) {
            endPos = obj.origin.indexOf(endText, beginPos);
            if (endPos == -1 || endPos > obj.endPos) {
                break;
            }
            endPos += endText.length;
        }
        objArray.push(createTextRange(obj.origin, beginPos, endPos));
        index = endPos;
    }
    extendArray(objArray, obj.origin);
    return objArray;
}

function extendArray(array, origin) {
    var first = array[0];
    array.origin = first ? first.origin : origin;
    array.beginPos = first ? first.beginPos : 0;
    array.endPos = first ? first.endPos : (origin.length - 1);
    array.innerText = first ? first.innerText : origin;
    array.between = function (beginText, endText) {
        var objArray = [];
        this.forEach(obj => {
            objArray = objArray.concat(matchBetween(obj, beginText, endText))
        });
        extendArray(objArray, origin);
        return objArray;
    }

    array.replaceWith = function (newText) {
        if (first) {
            return first.replaceWith(newText);
        }
        else {
            return this.origin;
        }
    }
}

module.exports = function (text) {
    return createTextRange(text, 0, text.length - 1);
}