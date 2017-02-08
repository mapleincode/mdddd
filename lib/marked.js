/**
 * marked
 * @authors maple (llkj13579@126.com)
 * @date    2017-02-08 11:04:58
 */

'use strict';

const marked = require('marked');
const hightlightjs = require('highlight.js');

/**
 * set highlight
 */
marked.setOptions({
  highlight: function (code) {
    return require('highlight.js').highlightAuto(code).value;
  }
});

module.exports = function(markdownString) {
    return marked(markdownString);
}