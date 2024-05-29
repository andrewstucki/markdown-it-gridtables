"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
class ParseTableResult {
    constructor() {
        this.Success = false;
        this.ColumnWidths = [];
        this.ColumnOffsets = [];
        this.ColumnAlignments = [];
        this.HeaderLess = false;
        this.HeaderLines = [];
        this.RowLines = [];
        this.SeparatorLineOffsets = [];
        this.CurrentLine = 0;
    }
}
exports.default = ParseTableResult;
//# sourceMappingURL=ParseTableResult.js.map