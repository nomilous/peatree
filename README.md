`npm install ntree --save`

[![Build Status](https://travis-ci.org/nomilous/ntree.svg)](https://travis-ci.org/nomilous/ntree)

# ntree

A file system based "living tree" of functional data.

## ?

TODO: It assembles a `tree` of data from fragments recursed out of the `config.mount` directory.

TODO: Each fragment is a node/javascript file with data per whatever it `module.exports`.

TODO: It synchronizes changes: file system ---> `tree`

TODO: It synchronizes changes: file system <--- `tree`

TODO: It follows symlinks

TODO: It supports functions.

TODO: It emits change events.

## eg.

```javascript
var ntree = require('ntree');

ntree.create({mount: '/path/to/data/root'})

.then(function(tree) {
  
  // use the tree

})

.catch(function(e) {});

```

## use the tree

```javascript

// pending

tree.on('modified');

tree.on('unmodified');

```

## important

This is not a database.

Reads from updated data fragment (.js) files are synchronous (per `require('filename')`) and will therefore not scale beyond a moderate concurrency.

