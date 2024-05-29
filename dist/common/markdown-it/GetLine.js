"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
function getLine(state, line) {
    const start = state.bMarks[line] + state.blkIndent;
    const end = state.eMarks[line];
    return state.src.substr(start, end - start);
}
exports.default = getLine;
//# sourceMappingURL=GetLine.js.map