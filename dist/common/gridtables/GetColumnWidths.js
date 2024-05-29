"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
/**
* getColumnWidths parses the provided line and returns the associated column widths.
*
* @param line The separator line to parse for the column widths.
* @returns The column widths for the provided line, or an empty array if the line is invalid.
*/
function getColumnWidths(line) {
    // try to parse as a row separator line
    let columnMatch = line
        .substr(1)
        .match(/[:-][-]+[:-]\+/g);
    if (columnMatch == null) {
        // try to parse as a header separator line
        columnMatch = line
            .substr(1)
            .match(/[:=][=]+[:=]\+/g);
    }
    if (columnMatch == null) {
        return [];
    }
    return columnMatch.map(s => s.length);
}
exports.default = getColumnWidths;
//# sourceMappingURL=GetColumnWidths.js.map