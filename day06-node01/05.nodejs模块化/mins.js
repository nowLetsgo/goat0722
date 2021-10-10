function mins(a, b) {
    return a - b;
}

function say(con) {
    console.log("hello" + con);
}

//暴露多个内容1
/* module.exports.mins = mins;
module.exports.say = say; */

//暴露多个内容2
module.exports = {
    mins,
    say
}