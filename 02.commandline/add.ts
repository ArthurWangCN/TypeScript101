#!/usr/bin/env ts-node
/**
 * 获取命令行参数并相加
 */
const a:number = parseInt(process.argv[2]);
const b:number = parseInt(process.argv[3]);

if (Number.isNaN(a) || Number.isNaN(b)) {
    console.log('参数有问题');
    process.exit(1);
}
console.log(a + b);
process.exit(0);
