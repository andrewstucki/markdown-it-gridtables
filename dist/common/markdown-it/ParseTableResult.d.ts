import ColumnAlignments from "./ColumnAlignments";
export default class ParseTableResult {
    Success: boolean;
    ColumnWidths: number[];
    ColumnOffsets: number[];
    ColumnAlignments: ColumnAlignments[];
    HeaderLess: boolean;
    HeaderLines: string[][];
    RowLines: string[][][];
    SeparatorLineOffsets: number[];
    CurrentLine: number;
}
