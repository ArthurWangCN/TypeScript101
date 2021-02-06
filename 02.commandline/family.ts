#!/usr/bin/env ts-node
/**
 * 打印家族族谱
 */
function createTab(n: number) {
    return '----'.repeat(n);
}

class Person {
    public children: Person[] = [];
    constructor(public name: string) { }

    addChild(c: Person) {
        this.children.push(c);
    }
    introduceFamily(n?: number) {
        n = n || 0;
        console.log(createTab(n) + this.name);
        this.children.forEach(p => {
            p.introduceFamily(n + 1);
        })
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