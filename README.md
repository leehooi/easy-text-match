[![Build Status](https://travis-ci.org/leehooi/easy-text-match.svg?branch=master)](https://travis-ci.org/leehooi/easy-text-match)

# easy-text-match
A simple method to search in complex text.
## Install
```bash
npm install --save easy-text-match
```

## Usage

Search all text by specify prefix-text and(or) suffix-text.
```js
var easyTextMatch = require('easy-text-match')

var result = easyTextMatch('the text you want to search in')
    .between('prefix-text', 'suffix-text');

if (result.success()) {
    console.log(result.innerText());
}
```

## API
The match method accept a string as paramenter.
Pass in full text that you want to search in, and it returns `RangeArray` as result.

### `RangeArray`
It extends javascript array, with elements of `Range` objects.

It also has the behalf of the first `Range` element in array. 

Besides, it has a `success()` method to identify if there are any elements in array.

### `Range`
A `Range` means a matched text paragraph.
#### `innerText()`
Get matched text exclude prefix-text and suffix-text.
* Returns: *\<string>* The matched text.
#### `outerText()`
Get matched text include prefix-text and suffix-text.
* Returns: *\<string>* The matched text.
#### `replaceInnerTextWith(newText)`
Replece matched text(exclude prefix-text and suffix-text) with specified text.
* `newText` *\<string>* The new text.
* Returns: *\<string>* The whole text after replaced.
#### `replaceOuterTextWith(newText)`
Replece matched text(include prefix-text and suffix-text) with specified text.
* `newText` *\<string>* The new text.
* Returns: *\<string>* The whole text after replaced.
#### `leftText(len)`
Get the text at the beginning of matched text(include prefix-text and suffix-text).
* `len` *\<integer>* The length of the text at the beginning.
* Returns: *\<string>* The text at the beginning.
#### `rightText(len)`
Get the text at the end of matched text(include prefix-text and suffix-text).
* `len` *\<integer>* The length of the text at the end.
* Returns: *\<string>* The text at the end.
#### `between(prefixText, suffixText)`
* `prefixText` *\<string>* The prefix-text used to search.
* `suffixText` *\<string>* The suffix-text used to search.
* Returns: *\<RangeArray>* Matched result.