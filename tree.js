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
    insert(value, tmp = this.root){
        if(this.root === null){
            this.root = new Node(value);
        }
        else{
            if(value > tmp.data){
                if(tmp.right === null){
                    tmp.right = new Node(value);
                }else{
                    this.insert(value, tmp.right);
                }
            }else if(value < tmp.data){
                if(tmp.left === null){
                    tmp.left = new Node(value);
                }else{
                    this.insert(value, tmp.left);
                }
            }else{
                throw new Error('Duplicates not allowed.');
            }
        }        
    }
}