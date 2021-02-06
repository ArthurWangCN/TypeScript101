// 重载
function add(a:number, b:number):number;
function add(a:string, b:string):string;
function add(a:any, b:any):any {
    return a+b;
}

console.log(add(1, 2)); // 3
console.log(add('wang', '77')); // wang77
