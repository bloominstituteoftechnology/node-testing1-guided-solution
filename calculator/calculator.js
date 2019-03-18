module.exports = {
  add,
};

// function add(a = 0, b = 0) {
//   return a + b;
// }

// function add(args) {
//   return Array.from(arguments).reduce((sum, value) => {
//     return sum + value;
//   }, 0);
// }

function add(args) {
  const values = Array.isArray(args) ? args : Array.from(arguments);

  return values.reduce((sum, value) => {
    return sum + value;
  }, 0);
}
