import { FunctionDeclaration, VariableDeclarator, ArrowFunctionExpression } from "@babel/types";

export type ExportData = {
  exportPath?: string;
  exportName?: string;
  declaration?: FunctionDeclaration | ArrowFunctionExpression;
  default?: boolean;
};