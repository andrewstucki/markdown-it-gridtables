"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const EmitTable_1 = require("../common/markdown-it/EmitTable");
const GetCharCodeAtStartOfLine_1 = require("../common/markdown-it/GetCharCodeAtStartOfLine");
const ParseTable_1 = require("../common/markdown-it/ParseTable");
function gridTableRule(md) {
    return function (state, startLine, endLine, silent) {
        if ((0, GetCharCodeAtStartOfLine_1.default)(state, startLine) !== 0x2B) {
            // line does not start with a '+'
            return false;
        }
        let parseResult = (0, ParseTable_1.default)(state, startLine, endLine);
        if (!parseResult.Success) {
            return false;
        }
        if (silent) {
            return true;
        }
        (0, EmitTable_1.default)(md, state, parseResult);
        state.line = parseResult.CurrentLine;
        return true;
    };
}
exports.default = gridTableRule;
//# sourceMappingURL=gridtable.js.map