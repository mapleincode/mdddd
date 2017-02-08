/**
 * gen html title
 * @authors maple (llkj13579@126.com)
 * @date    2017-02-08 11:40:33
 * @version $Id$
 */

'use strict';

module.exports = function(
    codeSegment,
    highlightJsPath,
    highlightCSSPath,
    markdownCSSPath,
    title) {
    return '<!DOCTYPE html> <html> <head> <meta charset="utf-8">' +
    '<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">' + 
    `<title>${title}</title>` +
    `<link rel="stylesheet" href="${highlightCSSPath}">` +
    `<link rel="stylesheet" href="${markdownCSSPath}">` +
    `<script src="${highlightJsPath}">` + 
    '</script> <script>hljs.initHighlightingOnLoad();</script> </head>' +
    `<body>${codeSegment}</body> </html>`;
};