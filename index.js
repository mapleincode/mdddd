#!/usr/bin/env node
 
'use strict';
/**
 * Module dependencies.
 */
const async = require('async');
const path = require('path');
const program = require('commander');
const fs = require('fs');

const marked = require('./lib/marked');
const htmlTitle = require('./lib/title');
 
program.version('0.0.1')
    .usage('[options] <file ...>')
    .option('-j, --highlight_js_path <value>', 'modify highlight-js-path')
    .option('-c, --highlight_css_path <value>', 'modify highlight-css-path')
    .option('-m, --markdown_css_path <value>', 'modify markdown-css-path')
    .option('-t, --title <value>', 'modify file title')
    .parse(process.argv);

const fileName = program.args[0];
const pathName = program.args[1] || './';

const filePath = path.resolve(process.cwd(), fileName);

if(!filePath) {
    throw new Error('file is inexistence！');
}
const _filePathParse = path.parse(filePath);

if(_filePathParse.ext.toLowerCase() !== '.md') {
    throw new Error('file should be md file!');
}

async.waterfall([
    (callback) => {
        fs.stat(filePath, (err, state) => {
            if(err) return callback(new Error('file is inexistence！'));
            if(state.isDirectory()) return callback(new Error('file is directory!'));
            callback();
        });
    },
    (callback) => {
        fs.readFile(filePath, { encoding: 'utf-8'}, (err, text) => {
            if(err) return callback(err);
            callback(undefined, text);
        });
    },
    (text, callback) => {
        const htmlCode = marked(text);
        const highlightJsPath = program['highlight_js_path'] || '/js/highlight.mini.js';
        const highlightCSSPath = program['highlight_css_path'] || '/css/highlight-default.css';
        const markdownCSSPath = program['markdown_css_path'] || '/css/md-style.css';

        const title = (program.title || _filePathParse.name);
        const rightText = htmlTitle(htmlCode, highlightJsPath, highlightCSSPath, markdownCSSPath, title);
        fs.writeFile(path.resolve(process.cwd(), pathName, _filePathParse.name + '.html'), rightText, callback);
    }
], (err) => {
    if(err) throw err;
});
