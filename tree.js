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
    remove(value, tmp = this.root){
        if(this.root === null){
            throw new Error('Tree is empty.');
        }
        else if(value != this.root.data){
            if(tmp.right.data === value){
                if(tmp.right.right === null && tmp.right.left === null){
                    tmp.right = null;
                }
                else if(tmp.right.right != null && tmp.right.left === null){
                    let replacingNode = tmp.right.right;
                    tmp.right = null;
                    tmp.right = replacingNode;
                }
                else if(tmp.right.right === null && tmp.right.left != null){
                    let replacingNode = tmp.right.left;
                    tmp.right = null;
                    tmp.right = replacingNode;
                }
                else if(tmp.right.right != null && tmp.right.left != null){
                    let rightSubT = tmp.right.right;
                    if(rightSubT.left != null){
                        while(rightSubT.left != null){
                            rightSubT = rightSubT.left;
                            tmp.right.right.left;
                        }
                        tmp.right.data = rightSubT.data;
                        tmp.right.right.left = null;
                    }
                    else{
                        while(rightSubT.right != null){
                            rightSubT = rightSubT.right;
                            tmp.right.right.right;
                        }
                        tmp.right.data = rightSubT.data;
                        tmp.right.right.right = null;
                    }
                    
                }
            }
            else if(tmp.left.data === value){
                if(tmp.left.left === null && tmp.left.right === null){
                    tmp.left = null;
                }
                else if(tmp.left.left != null && tmp.left.right === null){
                    let replacingNode = tmp.left.left;
                    tmp.left = null;
                    tmp.left = replacingNode;
                }
                else if(tmp.left.left === null && tmp.left.right != null){
                    let replacingNode = tmp.left.right;
                    tmp.left = null;
                    tmp.left = replacingNode;
                }
                else if(tmp.left.left != null && tmp.left.right != null){
                    let rightSubT = tmp.left.right;
                    if(rightSubT.left != null){
                        while(rightSubT.left != null){
                            rightSubT = rightSubT.left;
                            tmp.left.right.left;
                        }
                        tmp.left.data = rightSubT.data;
                        tmp.left.right.left = null;
                    }
                    else{
                        while(rightSubT.right != null){
                            rightSubT = rightSubT.right;
                            tmp.left.right.right;
                        }
                        tmp.right.data = rightSubT.data;
                        tmp.left.right.right = null;   
                    }
                    
                }
            }
            else if(value > tmp.data){
                this.remove(value, tmp.right);
            }else if(value < tmp.data){
                this.remove(value, tmp.left);
            }
        }
        else{
            
        }
    }
}