import Node from './treeNode.js';

function buildTree(dataArray, start, end){
    if(start > end){
        return null;
    }
    const mid = Math.floor((start + end) / 2);
    const root = new Node(dataArray[mid]);
    root.left = buildTree(dataArray, start, mid - 1);
    root.right = buildTree(dataArray,mid + 1, end);
    return root
}

export class Tree{
    constructor(dataArray, start, end){
        this.root = buildTree(dataArray, start, end);
    }
}