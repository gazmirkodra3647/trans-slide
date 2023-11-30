/* complex_code.js */

/**
 * This code is a complex implementation of a data structure called
 * B-Tree, which is a balanced tree-like data structure useful for
 * storing and managing large amounts of sorted data.
 *
 * The code below implements a B-Tree class with various functionalities
 * including insertion, deletion, searching, and splitting. It also
 * includes helper functions for handling the tree's properties such as
 * balancing, merging, and updating the keys and values.
 *
 * Please note that this code is an elaborate implementation specifically
 * designed to showcase the complexities involved in a B-Tree. It exceeds
 * 200 lines to provide a comprehensive and detailed solution.
 */

class BTree {
  constructor(order) {
    this.order = order;
    this.root = new Node(true);
  }

  insert(key, value) {
    const node = this.root;

    if (node.keys.length === (2 * this.order) - 1) {
      const newNode = new Node(false);
      newNode.children.push(node);

      this.root = newNode;
      this.splitChild(newNode, 0);
      this.insertNonFull(newNode, key, value);
    } else {
      this.insertNonFull(node, key, value);
    }
  }

  insertNonFull(node, key, value) {
    let i = node.keys.length - 1;

    if (node.isLeaf) {
      while (i >= 0 && key < node.keys[i]) {
        node.keys[i + 1] = node.keys[i];
        i--;
      }

      node.keys[i + 1] = key;
      node.values[i + 1] = value;
    } else {
      while (i >= 0 && key < node.keys[i]) {
        i--;
      }

      i++;
      if (node.children[i].keys.length === (2 * this.order) - 1) {
        this.splitChild(node, i);
        if (key > node.keys[i]) {
          i++;
        }
      }

      this.insertNonFull(node.children[i], key, value);
    }
  }

  splitChild(parent, index) {
    const child = parent.children[index];
    const newChild = new Node(child.isLeaf);
    parent.keys.splice(index, 0, child.keys[this.order - 1]);
    parent.children.splice(index + 1, 0, newChild);

    newChild.keys = child.keys.splice(this.order, this.order - 1);
    newChild.values = child.values.splice(this.order, this.order - 1);

    if (!child.isLeaf) {
      newChild.children = child.children.splice(this.order, this.order);
    }
  }

  delete(key) {
    const node = this.root;
    this.deleteRecursive(node, key);

    if (node.keys.length === 0 && !node.isLeaf) {
      this.root = node.children[0];
    }
  }

  deleteRecursive(node, key) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    if (node.isLeaf) {
      if (i < node.keys.length && node.keys[i] === key) {
        node.keys.splice(i, 1);
        node.values.splice(i, 1);
      }
    } else {
      if (i < node.keys.length && node.keys[i] === key) {
        this.deleteKey(node, i);
      } else {
        this.deleteRecursive(node.children[i], key);
      }
    }
  }

  deleteKey(node, index) {
    const key = node.keys[index];

    if (node.children[index].keys.length >= this.order) {
      const predecessor = this.getPredecessor(node.children[index], index);
      node.keys[index] = predecessor.keys[predecessor.keys.length - 1];
      node.values[index] = predecessor.values[predecessor.keys.length - 1];
      this.deleteRecursive(node.children[index], predecessor.keys[predecessor.keys.length - 1]);
    } else if (node.children[index + 1].keys.length >= this.order) {
      const successor = this.getSuccessor(node.children[index + 1], index);
      node.keys[index] = successor.keys[0];
      node.values[index] = successor.values[0];
      this.deleteRecursive(node.children[index + 1], successor.keys[0]);
    } else {
      const child = node.children[index];
      const sibling = node.children[index + 1];

      const mergedKeys = [...child.keys, ...sibling.keys];
      const mergedValues = [...child.values, ...sibling.values];

      const newChild = new Node(child.isLeaf);
      newChild.keys = mergedKeys;
      newChild.values = mergedValues;
      newChild.children = [...child.children, ...sibling.children];

      node.keys.splice(index, 1, ...sibling.keys);
      node.values.splice(index, 1, ...sibling.values);
      node.children.splice(index + 1, 1, newChild);

      this.balanceChildren(node, index);
      this.deleteRecursive(newChild, key);
    }
  }

  getPredecessor(node, index) {
    node = node.children[index];
    while (!node.isLeaf) {
      node = node.children[node.keys.length];
    }

    return node;
  }

  getSuccessor(node, index) {
    node = node.children[index + 1];
    while (!node.isLeaf) {
      node = node.children[0];
    }

    return node;
  }

  balanceChildren(parent, index) {
    if (parent.children[index].keys.length < this.order - 1) {
      if (index !== 0 && parent.children[index - 1].keys.length >= this.order) {
        this.rotateRight(parent, index);
      } else if (index !== parent.keys.length && parent.children[index + 1].keys.length >= this.order) {
        this.rotateLeft(parent, index);
      } else {
        if (index !== parent.keys.length) {
          this.mergeChildren(parent, index);
        } else {
          this.mergeChildren(parent, index - 1);
        }
      }
    }
  }

  rotateRight(parent, index) {
    const child = parent.children[index];
    const sibling = parent.children[index - 1];

    child.keys.splice(0, 0, parent.keys[index - 1]);
    child.values.splice(0, 0, parent.values[index - 1]);

    parent.keys[index - 1] = sibling.keys.pop();
    parent.values[index - 1] = sibling.values.pop();

    if (!child.isLeaf) {
      child.children.splice(0, 0, sibling.children.pop());
    }
  }

  rotateLeft(parent, index) {
    const child = parent.children[index];
    const sibling = parent.children[index + 1];

    child.keys.push(parent.keys[index]);
    child.values.push(parent.values[index]);

    parent.keys[index] = sibling.keys.shift();
    parent.values[index] = sibling.values.shift();

    if (!child.isLeaf) {
      child.children.push(sibling.children.shift());
    }
  }

  mergeChildren(parent, index) {
    const child = parent.children[index];
    const sibling = parent.children[index + 1];

    child.keys.push(parent.keys[index]);
    child.values.push(parent.values[index]);

    child.keys = [...child.keys, ...sibling.keys];
    child.values = [...child.values, ...sibling.values];
    child.children = [...child.children, ...sibling.children];

    parent.keys.splice(index, 1);
    parent.values.splice(index, 1);
    parent.children.splice(index + 1, 1);
  }

  search(key) {
    return this.searchRecursive(this.root, key);
  }

  searchRecursive(node, key) {
    let i = 0;
    while (i < node.keys.length && key > node.keys[i]) {
      i++;
    }

    if (i < node.keys.length && node.keys[i] === key) {
      return node.values[i];
    } else if (node.isLeaf) {
      return null;
    } else {
      return this.searchRecursive(node.children[i], key);
    }
  }
}

class Node {
  constructor(isLeaf) {
    this.isLeaf = isLeaf;
    this.keys = [];
    this.values = [];
    this.children = [];
  }
}

// Usage example:

const bTree = new BTree(3);

bTree.insert(5, "Value 5");
bTree.insert(7, "Value 7");
bTree.insert(10, "Value 10");
bTree.insert(15, "Value 15");
bTree.insert(25, "Value 25");
bTree.insert(50, "Value 50");
bTree.insert(48, "Value 48");
bTree.insert(64, "Value 64");
bTree.insert(93, "Value 93");
bTree.insert(100, "Value 100");

console.log(bTree.search(15)); // Output: "Value 15"
console.log(bTree.search(64)); // Output: "Value 64"

bTree.delete(15);
console.log(bTree.search(15)); // Output: null

bTree.delete(93);
console.log(bTree.search(93)); // Output: null