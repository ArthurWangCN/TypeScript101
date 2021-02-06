// 接口、枚举
enum Gender {
    Male,
    Female
}

interface Person {
    name: string,
    gender: Gender
}

function merry(a: Person, b: Person) {
    if (a.gender !== b.gender) {
        return a.name + ' married ' + b.name + '!';
    } else {
        throw new Error('目前性别相同不能结婚');
    }
}

const ted = {name: 'ted', gender: Gender.Male}
const tracy = {name: 'tracy', gender: Gender.Female}
const marshall = {name: 'ted', gender: Gender.Male}

console.log(merry(ted, tracy)); // ted married tracy!
console.log(merry(ted, marshall));  // Error: 目前性别相同不能结婚
