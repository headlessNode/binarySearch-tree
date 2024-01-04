import { Tree } from "./tree.js";

const dataArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const treeList = new Tree(dataArray);
const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
};


prettyPrint(treeList.root);
console.log(treeList.levelOrder());
console.log(treeList.preOrder());
console.log(treeList.inOrder());
console.log(treeList.postOrder());
console.log(treeList.height(treeList.root));
console.log(treeList.depth(4));
console.log(treeList.isBalanced() ? 'balanced' : 'Unbalanced');
treeList.insert(7000);
treeList.insert(8000);
prettyPrint(treeList.root);
console.log(treeList.height(treeList.root));
console.log(treeList.depth(4));
console.log(treeList.isBalanced() ? 'balanced' : 'Unbalanced');
treeList.reBalance();
prettyPrint(treeList.root);
console.log(treeList.isBalanced() ? 'balanced' : 'Unbalanced');
