"use strict";
/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Bas Verweij. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/
Object.defineProperty(exports, "__esModule", { value: true });
const gridtable_1 = require("./rules/gridtable");
function gridTableRulePlugin(md, options) {
    md.block.ruler.before("table", "gridtable", (0, gridtable_1.default)(md));
}
exports.default = gridTableRulePlugin;
//# sourceMappingURL=index.js.map