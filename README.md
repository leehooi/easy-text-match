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

var result = easyTextMatch('sampleText')
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
A `Range` means a matched text 
#### `innerText()`
* Returns: *\<string>*
#### `outerText()`
* Returns: *\<string>*
#### `replaceInnerTextWith(newText)`
* `newText` *\<string>*
* Returns: *\<string>*
#### `replaceOuterTextWith(newText)`
* `newText` *\<string>*
* Returns: *\<string>*
#### `leftText(len)`
* `len` *\<integer>*
* Returns: *\<string>*
#### `rightText(len)`
* `len` *\<integer>*
* Returns: *\<string>*
#### `between()`
* Returns: *\<RangeArray>*