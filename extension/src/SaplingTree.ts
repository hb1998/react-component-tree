import { getNonce } from './getNonce';
import { INode, IRawNode } from './types';
import { SaplingParser } from './SaplingParser';

export class Tree implements IRawNode, INode {
  index: number;
  id: string;
  name: string;
  fileName: string;
  filePath: string;
  importPath: string;
  aliases: Record<string, string>;
  expanded: boolean;
  depth: number;
  count: number;
  thirdParty: boolean;
  reactRouter: boolean;
  redux: boolean;
  children: Tree[];
  parent: Tree;
  parentList: string[];
  props: Record<string, boolean>;
  projectBaseURL: string | undefined;
  error: 
    | '' 
    | 'File not found.' 
    | 'Error while processing this file/node.'
    | string;

  constructor(node?: Partial<Tree>) {
    this.id = getNonce(); // shallow copies made from constructor do not share identifiers
    this.name = node?.name ?? '';
    this.fileName = node?.fileName ?? '';
    this.filePath = node?.filePath ?? '';
    this.importPath = node?.importPath ?? '';
    this.depth = node?.depth ?? 0;
    this.count = node?.count ?? 1;
    this.expanded = node?.expanded ?? false;
    this.thirdParty = node?.thirdParty ?? false;
    this.reactRouter = node?.reactRouter ?? false;
    this.redux = node?.redux ?? false;
    this.children = node?.children ?? [];
    this.parent = node?.parent;
    this.parentList = node?.parentList ?? [];
    this.props = node?.props ?? {};
    this.aliases = node?.aliases ?? node?.parent?.aliases ?? {};
    this.projectBaseURL = node?.projectBaseURL ?? node?.parent?.projectBaseURL;
    this.error = node?.error ?? '';
  }

  /** 
   * Sets or modifies value of class fields and performs input validation.
   * @param key The class field to be modified.
   * @param value The value to be assigned.
   * Use for complete replacement of 'children', 'props' elements (for mutation, use array/object methods).
   */
  public set(key: keyof Tree, value: Tree[keyof Tree]): void {
    if ([
      'count',
      'thirdParty',
      'reactRouter',
      'redux',
      'error'
    ].includes(key)) {
      this[String(key)] = value;
    } else if (key === 'children') {
      if (value && Array.isArray(value) && (!value.length || value[0] instanceof Tree)) {
        this.children.splice(0, this.children.length);
        this.children.push(...(value as Tree[]));
        return;
      }
      throw new Error('Invalid input children array.');
    } else if (key === 'props') {
      if (
        value &&
        typeof value === 'object' &&
        Object.entries(value).every(([k, v]) => typeof k === 'string' && typeof v === 'boolean')
      ) {
        Object.keys(this.props).forEach((k) => delete this.props[k]);
        Object.entries(value).forEach(([k, v]: [string, boolean]) => (this.props[k] = v));
        return;
      }
      throw new Error('Invalid input props object.');
    } else {
      throw new Error(`Altering property ${key} is not allowed. Create new tree instance instead.`);
    }
  }

  /** 
   * Finds tree node(s) and returns reference pointer.
   * @param id
   * @returns Tree node with matching id, or undefined if not found.
   * @param filePath
   * @returns Array of matching Tree nodes, or empty array if none are found.
   */
  public get(...input: string[]): Tree | Tree[] | undefined;
  /** 
   * Get by following traversal path from root to target node
   * @param path: path expressed by sequence of each intermediate vertex's index in its parent's children array property.
   * e.g. (0) is the first child of root
   * e.g. (0, 2, 1) would be the second child of the third child of the first child of root
   * i.e. this.children[0].children[2].children[1]
   * @returns Tree node found at the destination of input traversal path.
   */
  public get(...path: number[]): Tree;
  public get(...input: unknown[]): unknown {
    if (
      !input ||
      !Array.isArray(input) ||
      !input.length ||
      (typeof input[0] === 'string' && input.length > 1) ||
      (typeof input[0] !== 'string' && typeof input[0] !== 'number')
    ) {
      throw new Error('Invalid input type.');
    } else if (typeof input[0] === 'string') {
      const getById: INode | undefined = this.subtree().filter(({ id }) => input[0] === id).pop();
      const getByFilePath: INode[] = this.subtree().filter(({ filePath }) => input[0] === filePath);
      if (!getById && !getByFilePath.length) {
        throw new Error('Node not found with input: ' + input[0]);
      }
      return getById || getByFilePath;
    }
    return input.reduce((acc: Tree, curr: number, i) => {
      if (!acc || !acc.children[curr]) {
        throw new Error(`Invalid entry at index ${i} of input path array.`);
      }
      if (curr < 0 || curr >= acc.children.length) {
        throw new Error(`Entry out of bounds at index ${i} of input path array.`);
      }
      return acc.children[curr];
    }, this) as Tree;
  }

  /** 
   * @returns Normalized array containing current node and all of its descendants.
   */
  public subtree(): Tree[] {
    const descendants: Tree[] = [];
    const callback = (node: Tree) => {
      descendants.push(...node.children);
    };
    this.traverse(callback);
    return [this, ...descendants];
  }

  /** 
   * Recursively applies callback on current node and all of its descendants. 
   */
  public traverse(callback: (node: Tree) => void): void {
    callback(this);
    if (!this.children || !this.children.length) {
      return;
    }
    this.children.forEach((child) => {
      child.traverse(callback);
    });
  }

  public isFile(): boolean {
    return !this.thirdParty && !this.reactRouter;
  }

  /** Switches expanded property state. */
  public toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  /** 
   * Finds subtree node and changes expanded property state.
   * @param expandedState if not undefined, defines value of expanded property for target node.
   * If expandedState is undefined, expanded property is negated.
   */
  public findAndToggleExpanded(id: string, expandedState?: boolean): void {
    const target = this.get(id) as Tree | undefined;
    if (target === undefined) {
      throw new Error('Invalid input id.');
    }
    if (target.expanded !== expandedState) {
      target.toggleExpanded();
    }
  }

  /** 
   * Triggers on file save event.
   * Finds node(s) that match saved document's file path,
   * reparses their subtrees to reflect updated document content,
   * and restores previous isExpanded state for descendants.
   */
  public updateOnSave(savedFilePath: string): void {
    const targetNodes = this.get(savedFilePath) as Tree[];
    if (!targetNodes.length) {
      throw new Error('No nodes were found with file path: ' + savedFilePath);
    }
    targetNodes.forEach((target) => {
      const prevState = target.subtree().map((node) => {
        return { expanded: node.expanded, depth: node.depth, filePath: node.filePath };
      });

      // Subtree of target is newly parsed in-place.
      SaplingParser.parse(target);

      const restoreExpanded = (node: Tree): void => {
        if (
          node.expanded !==
          prevState.some(
            ({ expanded, depth, filePath }) =>
              expanded && node.depth === depth && node.filePath === filePath
          )
        ) {
          node.toggleExpanded();
        }
      };
      target.traverse(restoreExpanded);
    });
  }

  /** 
   * Recursively captures and exports internal state for all nested nodes.
   * Required for lossless conversion to/from workspaceState memento object (webview persistence).
   * @returns JSON-stringifyable Tree object
   */
  public serialize(): INode {
    const recurse = (node: Tree): INode => {
      const obj = {
        ...node,
        children: node.children?.map((child) => recurse(child)) ?? [],
      };
      delete obj.parent;
      return Object.entries(obj).reduce((acc, [k, v]) => {
        acc[k] = v;
        return acc;
      }, {} as INode);
    };
    return recurse(this);
  }

  /** 
   * Recursively converts all nested node data in Tree object into Tree class objects.
   * @param data: Tree object containing state data for all nodes in component tree to be restored into webview.
   * @returns Tree class object with all nested descendant nodes also of Tree class.
   */
  public static deserialize(data: Tree): Tree {
    const recurse = (node: Tree): Tree =>{
    return new Tree({
        ...node,
        children: node.children?.map((child) => recurse(child)),
      });
  };
    return recurse(data);
  }
}