"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const wcwidth = require("wcwidth");
const GetColumnWidths_1 = require("../gridtables/GetColumnWidths");
const ColumnAlignments_1 = require("./ColumnAlignments");
const GetLine_1 = require("./GetLine");
const ParseTableResult_1 = require("./ParseTableResult");
function parseTable(state, startLine, endLine) {
    const result = new ParseTableResult_1.default();
    let rowLine = (0, GetLine_1.default)(state, startLine);
    if (rowLine.charAt(0) !== '+') {
        // line does not start with a '+'
        return result;
    }
    result.ColumnWidths = (0, GetColumnWidths_1.default)(rowLine);
    if (result.ColumnWidths.length === 0) {
        // no columns found
        return result;
    }
    // initialize column alignments
    result.ColumnAlignments = result.ColumnWidths
        .map(_ => ColumnAlignments_1.default.None);
    if (rowLine.indexOf(':') >= 0) {
        // column alignment specifiers present in first row line
        result.HeaderLess = true;
        // set column alignments
        result.ColumnAlignments = getColumnAlignments(rowLine, result.ColumnWidths);
        // remove alignment specifiers for further matching
        rowLine = rowLine.replace(/[:]/g, '-');
    }
    // create header line matcher
    const headerLineMatcher = new RegExp('^\\+' +
        result.ColumnWidths
            .map(w => `[=:][=]{${w - 3}}[=:]\\+`)
            .join('') +
        '$');
    // build column offsets
    result.ColumnOffsets = [0];
    for (let i = 0; i < result.ColumnWidths.length - 1; i++) {
        result.ColumnOffsets.push(result.ColumnOffsets[i] +
            result.ColumnWidths[i]);
    }
    // create cell line matcher
    const cellLineMatcher = new RegExp('^\\|' +
        result.ColumnWidths
            .map(w => `([^|]{${Math.ceil((w - 1) / 2)},${w - 1}})\\|`)
            .join('') +
        '$');
    // save first separator line offset
    result.SeparatorLineOffsets.push(startLine);
    // continue to scan until a complete table is found, or an invalid line is encountered
    let currentRow = [];
    let currentLine = startLine + 1;
    for (; currentLine <= endLine; currentLine++) {
        const line = (0, GetLine_1.default)(state, currentLine);
        if (line.charCodeAt(0) === 0x2B) // '+'
         {
            // separator line
            if (currentRow.length === 0) {
                // no row lines since last separator -> invalid table
                return result;
            }
            // save separator line offset
            result.SeparatorLineOffsets.push(currentLine);
            if (line === rowLine) {
                // new regular row
                result.RowLines.push(currentRow);
                if (result.HeaderLines.length === 0) {
                    result.HeaderLess = true;
                }
            }
            else if (!result.HeaderLess &&
                line.match(headerLineMatcher)) {
                // found header line
                if (result.HeaderLines.length > 0 ||
                    result.RowLines.length > 0) {
                    // header already found, or not the first row -> invalid table
                    return result;
                }
                // header row
                result.HeaderLines = currentRow;
                if (line.indexOf(':') >= 0) {
                    // set column alignments
                    result.ColumnAlignments = getColumnAlignments(line, result.ColumnWidths);
                }
            }
            else {
                // not a header or regular row -> invalid table
                return result;
            }
            // reset current row
            currentRow = [];
        }
        else if (line.charCodeAt(0) === 0x7C) // '|'
         {
            // cell line
            const matches = line.trim().match(cellLineMatcher);
            if (matches === null) {
                // cell line does not match -> invalid table
                return result;
            }
            const cells = validateColumnWidths(matches, result.ColumnWidths);
            if (cells === null) {
                // cell line does not match -> invalid table
                return result;
            }
            // add the line to the current row
            currentRow.push(cells);
        }
        else {
            // not a separator or cell line, check if we have a complete table
            if (currentRow.length === 0 &&
                ((result.HeaderLines.length > 0) ||
                    (result.RowLines.length > 0))) {
                // found a complete table
                break;
            }
            return result;
        }
    }
    result.CurrentLine = currentLine;
    result.Success = true;
    return result;
}
exports.default = parseTable;
function getColumnAlignments(line, columnWidths) {
    let alignments = [];
    let left = 1;
    let right = -1;
    for (let i = 0; i < columnWidths.length; i++) {
        right += columnWidths[i];
        let alignment = ColumnAlignments_1.default.None;
        if (line.charAt(right) === ':') {
            if (line.charAt(left) === ':') {
                alignment = ColumnAlignments_1.default.Center;
            }
            else {
                alignment = ColumnAlignments_1.default.Right;
            }
        }
        else if (line.charAt(left) === ':') {
            alignment = ColumnAlignments_1.default.Left;
        }
        alignments.push(alignment);
        left += columnWidths[i];
    }
    return alignments;
}
function validateColumnWidths(matches, columnWidths) {
    const cells = [];
    for (var i = 0; i < columnWidths.length; i++) {
        const cell = matches[i + 1];
        const columnWidth = wcwidth(cell) + 1; // add 1 for separator
        const targetWidth = columnWidths[i];
        if (columnWidth !== targetWidth && cell.length + 1 !== targetWidth) {
            return null;
        }
        cells.push(cell);
    }
    return cells;
}
//# sourceMappingURL=ParseTable.js.map