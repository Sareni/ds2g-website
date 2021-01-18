
const bcrypt = require('bcrypt');
const pw = bcrypt.hashSync(process.argv[2], 10)
console.log(pw);

console.log()

