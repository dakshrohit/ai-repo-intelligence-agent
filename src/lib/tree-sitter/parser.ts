import * as Parser from "web-tree-sitter";

let parser: Parser.Parser | null = null;

export async function getParser() {
  if (parser) {
    return parser;
  }

  parser = new Parser.Parser();

  return parser;
}