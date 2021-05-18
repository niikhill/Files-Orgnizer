function helperFn() {
  console.log(`List of available commands 
        1. node mycli.js view <dirname> tree
        2. node mycli.js view <dirname> flat
        3. node mycli.js organize <dirname> tree`);
}

module.exports = {
  helperFn: helperFn,
};
