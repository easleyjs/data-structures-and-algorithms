'use strict';

const LinkedList = require('./LinkedList');

class HashTable {
  constructor(size) {
    this.size = size;
    this.buckets = new Array(size);
  }

  hash(key) {
    let string = JSON.stringify(key);
    let sum = 0;
    for (let char of string) {
      sum += char.charCodeAt(0);
    }
    let largeNum = sum * 599;
    let hash = largeNum % this.size;
    return hash;
  }

  set(key, value) {
    let hash = this.hash(key);
    let payload = `${key}:${value}`;
    let values = this.buckets[hash];
    if (!values) {
      let list = new LinkedList();
      list.add(payload);
      this.buckets[hash] = list;
    } else {
      values.add(payload);
    }
  }

  get(key) { // given the size of the HashTable, how much of this code runs.
    let hash = this.hash(key); // 0(1)
    let list = this.buckets[hash]; // 0(1)
    if (!list) {
      //console.log('NO VALUES PRESENT FOR GIVEN KEY');
      return null;
    } else {
      return list.values(); // 0(m) runs as many times as there are values in the list.
    }
  }

  has(value) {
    for (let i=0; i < this.size; i++) {
      const list = this.buckets[i];
      if (list) {
        for (const payload of list.values()) {
          const [key, val] = payload.split(':');
          if (val === value) {
            return true;
          }
        }
      }
      return false;
    }
  }

  keys() {
    const keys = [];
    for (let i = 0; i < this.size; i++) {
      const list = this.buckets[i];
      if (list) {
        for (const payload of list.values()) {
          const [key] = payload.split(':');
          keys.push(key);
        }
      }
    }
    return keys;
  }

  getUniqueKeys() {
    const uniqueKeys = new Set();

    for (let i = 0; i < this.size; i++) {
      const list = this.buckets[i];
      if (list) {
        for (const payload of list.values()) {
          const [key] = payload.split(':');
          uniqueKeys.add(key);
        }
      }
    }

    return Array.from(uniqueKeys);
  }
}

function findRepeatedWords( input ) {
  const inputArr = input.split(' ');
  const myHashTable = new HashTable(inputArr.length);
  let duplicatedWord = null;
  let counter = 0;

  while ( duplicatedWord === null && counter < inputArr.length -1 ) {
    const word = inputArr[ counter ];
    const results = myHashTable.get( word );
    if ( results === null ) {
      myHashTable.set( word, 1);
    }
    if ( results && String(results).split(':')[0] === word ) {
      duplicatedWord = word;
    }
    counter++;
  }
  return duplicatedWord;
}

module.exports = { HashTable, findRepeatedWords };
