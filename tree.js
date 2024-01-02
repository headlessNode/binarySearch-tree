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
        if(tmp === null){
            throw new Error(`${value} doesnot exist in the tree.`);
        }
        else {
            //IF ROOT NODE IS TO BE DELETED
            if(value === this.root.data){
                if(this.root.right != null){
                    let rightSubT = tmp.right;
                    if(tmp.left === null && tmp.right != null){
                        this.root.data = tmp.data;
                        if(rightSubT != null){
                            tmp.data = rightSubT.data;
                            tmp.right = null;
                        }
                    }
                    else if(tmp.left === null && tmp.right === null){
                        this.root.data = tmp.data;
                        let nTmp = this.root;
                        while(nTmp.right.left != null && nTmp.right.right != null){
                            nTmp = nTmp.right;
                        }
                        if(nTmp.left.left === null && nTmp.left.right === null){
                            nTmp.left = null;
                        }
                    }
                    else{
                        if(rightSubT.left != null){
                            this.remove(value, rightSubT.left);
                        }
                        else{
                            this.root.data = rightSubT.data;
                            if(rightSubT.right != null){
                                this.root.right = rightSubT.right;
                                rightSubT.right = null;
                            }else{
                                this.root.right = rightSubT.data;
                                this.root.right = null;
                            }
                        }
                        
                    }
                }
                else{
                    if(this.root.left != null){
                        this.root = this.root.left;
                    }
                    else{
                        this.root = null;
                        console.log("The Tree is now empty.")
                    }
                    
                }
            }
            else{ 
                if(tmp.right != null && tmp.right.data === value){
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
                            }
                            tmp.right.data = rightSubT.data;
                            tmp.right.right.left = null;
                        }
                        else{
                            tmp.right.data = rightSubT.data;
                            tmp.right.right = rightSubT.right;

                        }
                        
                    }
                }
                else if(tmp.left != null && tmp.left.data === value){
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
                            }
                            tmp.left.data = rightSubT.data;
                            tmp.left.right.left = null;
                        }
                        else{
                            tmp.left.data = rightSubT.data;
                            tmp.left.right = rightSubT.right;
                        }
                        
                    }
                }
                //IF VALUE TO DELETE IS GREATER THAN ROOT NODE
                else if(value > tmp.data){
                    this.remove(value, tmp.right);
                }
                //IF VALUE TO DELETE IS LESS THAN ROOT NODE
                else if(value < tmp.data){
                    this.remove(value, tmp.left);
                }
            }
        }
    }
    find(value, tmp=this.root){
        if(tmp === null){
            return `${value} doesnot exist in the tree.`
        }
        else if(value > tmp.data){
            return this.find(value, tmp.right);
        }else if(value < tmp.data){
            return this.find(value, tmp.left);
        }else{
            return tmp;
        }
    }
    levelOrder(cb = (node)=>{ return node.data}){
        let queue = [this.root];
        let values = [];
        const queuing = ()=>{
            if(queue.length === 0){
                return;
            }
            let currNode = queue.shift();
            values.push(cb(currNode));

            if(currNode.left != null){
                queue.push(currNode.left);
            }
            if(currNode.right != null){
                queue.push(currNode.right);
            }
            queuing();
        }
        queuing();
        return values;
    }
    preOrder(cb = (node)=>{return node.data}){
        let values = [];
        const pTraverse = (tmp = this.root)=>{
            //root , left, right
            if(tmp === null){
                return;
            }
            values.push(cb(tmp));
            pTraverse(tmp.left)
            pTraverse(tmp.right);
        }
        pTraverse();
        return values;
    }
    inOrder(cb = (node)=>{return node.data}){
        let values = [];
        const inTraverse = (tmp = this.root)=>{
            //left, root, right
            if(tmp === null){
                return
            }
            inTraverse(tmp.left);
            values.push(cb(tmp));
            inTraverse(tmp.right);
        }
        inTraverse();
        return values;
    }
    postOrder(cb = (node)=>{return node.data}){
        let values = [];
        const postTraverse = (tmp = this.root)=>{
            //left, right, root
            if(tmp === null){
                return
            }
            postTraverse(tmp.left);
            postTraverse(tmp.right);
            values.push(cb(tmp));
        }
        postTraverse();
        return values;
    }
}