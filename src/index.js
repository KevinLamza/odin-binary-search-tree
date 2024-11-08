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
    this.nodeBalances = true;
    this.nodes = [];
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
  find(value) {
    let currentNode = this.root;
    let stop = false;
    while (!stop) {
      if (value === currentNode.data) {
        return currentNode;
      } else if (value < currentNode.data) {
        if (currentNode.left === null) {
          return false;
        } else {
          currentNode = currentNode.left;
        }
      } else if (value > currentNode.data) {
        if (currentNode.right === null) {
          return false;
        } else {
          currentNode = currentNode.right;
        }
      }
    }
  }
  levelOrder(callback) {
    if (callback === undefined) {
      throw new Error('No callback function defined');
      return;
    }
    let queueIndex = 0;
    let queue = [this.root];

    while (queueIndex < queue.length) {
      if (queue[queueIndex].left) queue.push(queue[queueIndex].left);
      if (queue[queueIndex].right) queue.push(queue[queueIndex].right);
      callback(queue[queueIndex]);
      queueIndex = queueIndex + 1;
    }
  }
  // callback(node) {
  //   node.data = node.data * 2;
  //   return node;
  // }
  preOrder(callback, node = this.root) {
    if (callback === undefined) {
      throw new Error('No callback function defined');
      return;
    }
    if (node === null) return;
    callback(node);
    this.preOrder(callback, node.left);
    this.preOrder(callback, node.right);
  }
  inOrder(callback, node = this.root, result = []) {
    if (callback === undefined) {
      throw new Error('No callback function defined');
      return;
    }
    if (node === null) return;
    this.inOrder(callback, node.left);
    callback(node);
    this.inOrder(callback, node.right);
    return result;
  }
  postOrder(callback, node = this.root) {
    if (callback === undefined) {
      throw new Error('No callback function defined');
      return;
    }
    if (node === null) return;
    this.postOrder(callback, node.left);
    this.postOrder(callback, node.right);
    callback(node);
  }
  height(node) {
    let height = 1;

    if (node === null) return undefined;

    height = this.heightRec(node, height);
    return height;
  }
  heightRec(node, height) {
    if (node.left === null && node.right === null) {
      height = height - 1;
    } else {
      if (node.left != null) {
        height = height + 1;
        height = this.heightRec(node.left, height);
      }
      if (node.right != null) {
        height = height + 1;
        height = this.heightRec(node.right, height);
      }
    }
    return height;
  }
  depth(node) {
    let startNode = this.root;
    let stop = false;
    let depth = 0;
    while (!stop) {
      if (node.data === startNode.data) {
        return depth;
      } else if (node.data < startNode.data) {
        if (startNode.left === null) {
          return false;
        } else {
          startNode = startNode.left;
          depth = depth + 1;
        }
      } else if (node.data > startNode.data) {
        if (startNode.right === null) {
          return false;
        } else {
          startNode = startNode.right;
          depth = depth + 1;
        }
      }
    }
  }
  isBalanced() {
    this.inOrder(this.checkBalance.bind(tree));
    // console.log(this.nodeBalances);
    return this.nodeBalances;
  }
  checkBalance(node) {
    if (node.left === null && node.right === null) return;
    else if (node.left != null && node.right === null) return;
    else if (node.left === null && node.right != null) return;
    else {
      if (
        this.height(node.left) - this.height(node.right) === 0 ||
        this.height(node.left) - this.height(node.right) === -1 ||
        this.height(node.left) - this.height(node.right) === 1
      ) {
        return;
      } else {
        this.nodeBalances = false;
      }
    }
  }
  rebalance() {
    this.inOrder((x) => this.nodes.push(x.data));
    this.root = this.buildTree(this.nodes);
    this.nodes = [];
    this.nodeBalances = true;
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

// let tree = new Tree([1, 2, 4, 2, 8, 7, 5, 8, 3, 2]);

// tree.insert(10);
// // tree.insert(12);
// // tree.insert(15);
// tree.insert(1);
// // tree.insert(2);
// tree.insert(6);
// // tree.deleteItem(2);
// tree.deleteItem(4);

// tree.inOrder((x) => (x.data = 2 * x.data));

// tree.isBalanced();
// tree.rebalance();

// prettyPrint(tree.root);

let arr = [];
for (let i = 0, t = 100; i < 20; i++) {
  arr.push(Math.round(Math.random() * t));
}
console.log(arr);
let tree = new Tree(arr);
console.log('Tree created!');
prettyPrint(tree.root);
console.log('Tree is balanced? ' + tree.isBalanced());
console.log('levelOrder:');
tree.levelOrder((x) => console.log(x));
console.log('preOrder:');
tree.preOrder((x) => console.log(x));
console.log('inOrder:');
tree.inOrder((x) => console.log(x));
console.log('postOrder:');
tree.postOrder((x) => console.log(x));

for (let i = 0, t = 100; i < 20; i++) {
  tree.insert(Math.round(Math.random() * t));
}
prettyPrint(tree.root);
console.log('Tree is balanced? ' + tree.isBalanced());
tree.rebalance();
console.log('Tree is balanced? ' + tree.isBalanced());
prettyPrint(tree.root);
