// Because of webpack, CSS rules need to be imported here and not in the .html file
// import './styles.css';

// Just to have a template for the file importing
// import { greeting } from './greeting.js';
// console.log(greeting);

import { mergeSort } from './mergesort.js';
import { merge } from './mergesort.js';

// Another webpack check
if (process.env.NODE_ENV !== 'production') {
  console.log('Looks like we are in development mode!');
}

// ---------------------- START YOUR CODE BELOW HERE

class Node {
  constructor(data = null) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    array = this.sort(array);
    array = this.deleteDuplicates(array);
    console.log(array);
    let treeRoot = this.buildTreeRec(array, 0, array.length - 1);
    return treeRoot;
  }
  sort(array) {
    return mergeSort(array);
  }
  deleteDuplicates(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      if (i === 0) {
        result.push(array[i]);
      } else {
        if (!(array[i] === array[i - 1])) {
          result.push(array[i]);
        }
      }
    }
    return result;
  }
  buildTreeRec(array, start, end) {
    if (start > end) return null;

    let indexMid = start + Math.floor((end - start) / 2);

    let root = new Node(array[indexMid]);
    root.left = this.buildTreeRec(array, start, indexMid - 1);
    root.right = this.buildTreeRec(array, indexMid + 1, end);

    return root;
  }
  insert(value) {
    let currentNode = this.root;
    let stop = false;
    while (!stop) {
      if (value === currentNode.data) {
        return;
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          currentNode.left = new Node(value);
          return;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          currentNode.right = new Node(value);
          return;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }
  deleteItem(value) {
    let currentNode = this.root;
    let parentNode = null;
    let previousDirection = null;
    let stop = false;
    let foundItem = false;
    while (!stop) {
      if (value === currentNode.data) {
        foundItem = true;
        break;
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          return;
        } else {
          parentNode = currentNode;
          previousDirection = 'left';
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          return;
        } else {
          parentNode = currentNode;
          previousDirection = 'right';
          currentNode = currentNode.right;
        }
      }
    }
    if (foundItem === true) {
      // if node has no children
      if (currentNode.left === null && currentNode.right === null) {
        parentNode[previousDirection] = null;
        // if node has children
      } else {
        // if node has only a left child
        if (currentNode.left != null && currentNode.right === null) {
          parentNode[previousDirection] = currentNode.left;
          // if node has only a right child
        } else if (currentNode.left === null && currentNode.right != null) {
          parentNode[previousDirection] = currentNode.right;
          // if node has both left and right child
        } else if (currentNode.left != null && currentNode.right != null) {
          let startNode = currentNode;
          startNode = startNode.right;
          while (1) {
            if (startNode.left != null) startNode = startNode.left;
            else break;
          }
          let newData = startNode.data;
          this.deleteItem(startNode.data);
          currentNode.data = newData;
        }
      }
    }
  }
}

const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
};

let tree = new Tree([1, 2, 4, 2, 8, 7, 5, 8, 3, 2]);
tree.insert(10);
tree.insert(1);
tree.insert(6);

tree.deleteItem(4);

prettyPrint(tree.root);
