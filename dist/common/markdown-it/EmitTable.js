"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const GetCells_1 = require("../gridtables/GetCells");
const ColumnAlignments_1 = require("./ColumnAlignments");
function emitTable(md, state, result) {
    let offsets = result.SeparatorLineOffsets;
    let token = state.push('table_open', 'table', 1);
    token.map = [offsets[0], offsets[offsets.length - 1]];
    if (result.HeaderLines.length > 0) {
        // emit table header
        const token = state.push('thead_open', 'thead', 1);
        token.map = [offsets[0], offsets[1]];
        const cells = (0, GetCells_1.default)(result.HeaderLines);
        processRow(md, state, 'th', result.ColumnAlignments, offsets[0], offsets[1], cells);
        state.push('thead_close', 'thead', -1);
        offsets = offsets.slice(1);
    }
    // emit table body
    token = state.push('tbody_open', 'tbody', 1);
    token.map = [offsets[0], offsets[offsets.length - 1]];
    for (let i = 0; i < result.RowLines.length; i++) {
        let cells = (0, GetCells_1.default)(result.RowLines[i]);
        processRow(md, state, 'td', result.ColumnAlignments, offsets[i], offsets[i + 1], cells);
    }
    state.push('tbody_close', 'tbody', -1);
    state.push('table_close', 'table', -1);
}
exports.default = emitTable;
function processRow(md, state, tag, columnAlignments, lineBegin, lineEnd, cells) {
    let token = state.push('tr_open', 'tr', 1);
    token.map = [lineBegin, lineEnd];
    for (let i = 0; i < cells.length; i++) {
        let token = state.push(tag + '_open', tag, 1);
        token.map = [lineBegin + 1, lineEnd - 1];
        if (columnAlignments[i] !== ColumnAlignments_1.default.None) {
            token.attrSet("style", `text-align: ${columnAlignments[i]};`);
        }
        if (cells[i].length === 0) {
            // empty cell
        }
        else if (cells[i].length === 1) {
            // single line cell -> emit as inline markdown
            let token = state.push('inline', '', 0);
            token.content = cells[i][0].trim();
            token.children = [];
        }
        else {
            // multi line cell -> render and emit as html
            let cell = md
                .render(cells[i].join('\r\n'))
                .trim();
            // remove single p tag because we're in a table cell
            if ((cell.slice(0, 3) === '<p>') &&
                (cell.slice(-4) === '</p>') &&
                (cell.indexOf('<p>', 3) === -1)) {
                cell = cell.slice(3, cell.length - 4);
            }
            let token = state.push('html_block', '', 0);
            token.content = cell;
            token.children = [];
        }
        state.push(tag + '_close', tag, -1);
    }
    state.push('tr_close', 'tr', -1);
}
//# sourceMappingURL=EmitTable.js.map