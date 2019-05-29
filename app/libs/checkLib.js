'use strict'

let trim = (x) => {

    let value = String(x);
    // remove extra space
    return value.replace(/^\s+|\s+$/gm, '');

}

let isEmpty = (value) => {

    if (value === null || value === undefined || trim(value) === '' || value.length === 0) {
        return true
      } else {
        return false
      }

}

module.exports = {
    trim : trim,
    isEmpty : isEmpty
}