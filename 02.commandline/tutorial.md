# 用TS开发命令行程序
## 最简单的命令行程序
1.ts

```typescript
#!/usr/bin/env ts-node
console.log('hello world')
```

然后给该文件添加执行权限：`chmod +x ./1.ts` （Windows 用户不需要做这个，直接在 Git Bash 输入 `./1.ts` 即可运行）

执行 `./1.ts`

就会看到 `hello world`。



## 接受命令行参数

2.ts

```typescript
#!/usr/bin/env ts-node
console.log(process.argv)
```

如果没有配置好 TS，那么运行 `./2.ts` 上面代码会出现如下报错：

```bash
TSError: ⨯ Unable to compile TypeScript:
2.ts(2,13): error TS2304: Cannot find name 'process'.
```

报错说得很清楚，`2.ts(2,13): error TS2304: Cannot find name 'process'.` 找不到 process。

实际上这是 Node.js 的全局变量，不可能找不到。

这就是 TS 的厉害之处：如果你不告诉我 process 是什么，我就不允许你用 process。

那么如何告诉 TS process 是什么呢？

方法如下：

```bash
# 初始化项目的 package.json
> npm init -y
# 安装 node 相关的类型定义
> npm install @types/node
# 再次运行 ./2.ts
> ./2.ts
[ 'node', '/Users/frank/TypeScript/tsdemo/2.ts' ]
```

就可以了。



## 四则运算

加法 add.ts（记得添加可执行权限，Windows 用户不需要加）

```typescript
#!/usr/bin/env ts-node
const a = process.argv[2];
const b = process.argv[3];

console.log(a + b);
# ./add.ts 1 2
12
```

1 + 2 居然等于 12，这计算器想个傻子一样。

这是因为目前 a b 的类型是 Any，然后参数 1 2 其实是字符串，所以 a b 也是字符串 1 2 。

为了将 a b 变成数字，我们需要改代码：

```typescript
#!/usr/bin/env ts-node
const a: number = parseInt(process.argv[2]);
const b: number = parseInt(process.argv[3]);

console.log(a + b);
# ./add.ts 1 2
3
```

1 + 2 = 3 成功！

但是

```bash
# ./add.ts 1 s
NaN
```

改代码：

```typescript
#!/usr/bin/env ts-node
const a: number = parseInt(process.argv[2]);
const b: number = parseInt(process.argv[3]);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.log('输入不合法');
  return; // 有问题
}

console.log(a + b);
```

return 这句话有问题，因为不能在顶级作用域运行 return，如果我们需要退出程序，只能使用 `process.exit(N)`，其中的 N 是返回值。

成功则返回 0， 失败则返回非 0。

```typescript
#!/usr/bin/env ts-node
const a: number = parseInt(process.argv[2]);
const b: number = parseInt(process.argv[3]);

if (Number.isNaN(a) || Number.isNaN(b)) {
  console.log('输入不合法');
  process.exit(2);
}

console.log(a + b);
process.exit(0);
# ./add.ts 1 s
输入不合法
```

接下来创建 minus.ts、multiply.ts 和 devide.ts，分别对应减法、乘法和除法。



## 族谱

```typescript
#!/usr/bin/env ts-node
function createTabs(n: number): string {
  return '----'.repeat(n);
}
class Person {
  public children: Person[] = [];
  constructor(public name) {}
  addChild(child: Person): void {
    this.children.push(child);
  }
  introduceFamily(n?: number): void {
    n = n || 0;
    console.log(`${createTabs(n)}${this.name}`);
    this.children.forEach(person => {
      person(n + 1);
    });
  }
}

const grandpa = new Person('爷爷');
const dad1 = new Person('大伯');
const dad2 = new Person('爸爸');
const child11 = new Person('堂兄');
const child12 = new Person('堂弟');
const child21 = new Person('哥哥');
const child22 = new Person('自己');

grandpa.addChild(dad1);
grandpa.addChild(dad2);

dad1.addChild(child11);
dad1.addChild(child12);
dad2.addChild(child21);
dad2.addChild(child22);

grandpa.introduceFamily();
```

结果：

```bash
爷爷
----大伯
--------堂兄
--------堂弟
----爸爸
--------哥哥
--------自己
```



**考察知识点：**

1. `n?:number` 参数n可有可无
2. class
3. Repeat