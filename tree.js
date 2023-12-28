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

function sortAndUnique(dataArray){
    return dataArray.sort((a,b)=>{
        if(a > b){
            return 1;
        }
        else if(a < b){
            return -1;
        }
        else{
            return 0;
        }
    }).filter((element, index, arr)=>{
        if(arr[index] != arr[index + 1]){
            return true;
        }
    });
}

export class Tree{
    constructor(dataArray){
        const uniqueSortedArray = sortAndUnique(dataArray); 
        this.root = buildTree(uniqueSortedArray, 0, uniqueSortedArray.length - 1);
    }
}