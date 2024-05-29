import IState from "../../interfaces/markdown-it/IState";
/**
 * Returns the char code of the character at the start of the current line,
 * or -1 if this is not available (e.g. on an empty line).
 *
 * @param state The Markdown It state.
 */
export default function getCharCodeAtStartOfLine(state: IState, line: number): number;
