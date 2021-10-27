const arr = [1, 2, 3, 4, 5];
const obj = {
    name: "laowang",
    pass: 123
}

console.log(...arr); // 1 2 3 4 5
// console.log(...obj);
console.log(...Object.entries(obj));
console.log(...Object.keys(obj));
console.log(...Object.values(obj));

console.log({
    ...obj
});