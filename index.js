import { Tree } from "./tree.js";

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

function createBst(size){
  let dataArray = [];
  for(let i=0; i<size; i++){
    dataArray.push(Math.floor(Math.random() * 50));
  }
  return new Tree(dataArray);
}

const script = (()=>{

  const numberOfValues = prompt("Enter number of values for the Binary Tree:");
  const size = parseInt(numberOfValues);
  let treeList = null;
  
  if(isNaN(size)){
    throw new Error("Please enter appropriate number");
  }else{
    treeList = createBst(size);
  }

  if(treeList.isBalanced()){
    console.log("The tree is Balanced")
    prettyPrint(treeList.root);
    console.log("Level Order: " + `${treeList.levelOrder()}`);
    console.log("Pre Order: " + `${treeList.preOrder()}`);
    console.log("In Order: " + `${treeList.inOrder()}`);
    console.log("Post Order: " + `${treeList.postOrder()}`);
  }

  //Unbalancing the tree
  const numberOfNewValues = prompt("Enter number of values to Unbalance the tree: ");
  const unBalanceSize = parseInt(numberOfNewValues);
  for(let i=0; i<unBalanceSize; i++){
    treeList.insert(Math.floor(Math.random() * 1000));
  }
  if(treeList.isBalanced()){
    console.log("The tree is still balanced");
  }else{
    console.log("Rebalancing the tree");
    treeList.reBalance();
    console.log(treeList.isBalanced() ? "The tree is now Balanced" : "The tree is still Unbalanced");
    prettyPrint(treeList.root);
    console.log("Level Order: " + `${treeList.levelOrder()}`);
    console.log("Pre Order: " + `${treeList.preOrder()}`);
    console.log("In Order: " + `${treeList.inOrder()}`);
    console.log("Post Order: " + `${treeList.postOrder()}`);
  }
})();
