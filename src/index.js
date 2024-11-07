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
  constructor(array = []) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    array = this.sort(array);
    array = this.deleteDuplicates(array);
    console.log(array);
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
}

let tree = new Tree([1, 2, 4, 2, 8, 7, 5, 8, 3, 2]);
