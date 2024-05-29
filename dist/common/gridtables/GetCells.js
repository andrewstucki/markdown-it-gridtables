"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
* getCells parses the lines found for a certain row, and transforms these to
* the separate cell lines.
*
* @param lines The lines for the row.
*/
function getCells(lines) {
    const cells = [];
    for (let i = 0; i < lines[0].length; i++) {
        let cell = [];
        for (let j = 0; j < lines.length; j++) {
            const s = trimEnd(lines[j][i]);
            if ((s.length === 0) &&
                (cell.length === 0)) {
                // skip leading empty lines
                continue;
            }
            cell.push(s);
        }
        // remove trailing empty lines
        let j = cell.length - 1;
        for (; j >= 0; j--) {
            if (cell[j].length > 0) {
                break;
            }
        }
        if (j < cell.length - 1) {
            cell = cell.slice(0, j + 1);
        }
        cells.push(cell);
    }
    return cells;
}
exports.default = getCells;
function trimEnd(s) {
    const trimmed = s.trim();
    if (trimmed.length === 0) {
        return '';
    }
    return s.slice(0, s.indexOf(trimmed) + trimmed.length);
}
//# sourceMappingURL=GetCells.js.map