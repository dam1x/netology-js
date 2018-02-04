'use strict';

const positions = [
    {
        title: 'Телепорт бытовой VZHIH-101',
        available: 7,
        holded: 0
    },
    {
        title: 'Ховерборд Mattel 2016',
        available: 4,
        holded: 5
    },
    {
        title: 'Меч световой FORCE (синий луч)',
        available: 1,
        holded: 1
    }
];



const itemPrototype = {
    sell(field, amount = 1) {
        if (this[field] < amount) {
            throw `Недостаточно товара для продажи (${this[field]} из ${amount})`
        }
        this[field] -= amount;
        return true;
    },
    sellHolded(amount = 1) {
        return itemPrototype.sell.call(this, 'holded', amount);
    },
    sellAvailable(amount = 1) {
        return itemPrototype.sell.call(this, 'available', amount);
    }
};

function sellPosition(item, amount, isHolded = false) {
    if(isHolded){
        itemPrototype.sellHolded.call(item, amount);
    } else{
        itemPrototype.sellAvailable.call(item, amount);
    }
}


sellPosition(positions[2], 1);
console.log(positions[2].available); // 0
console.log(positions[2].holded); // 1

sellPosition(positions[1], 4, true);
console.log(positions[1].available); // 4
console.log(positions[1].holded); // 1

const item = { available: 0, holded: 1 };
sellPosition(item, 1, true);
console.log(item.available); // 0
console.log(item.holded); // 0
// 2 part
console.log('2 part ---');
function showPositions(list, formatter){
    list.forEach( (item)=>{
        let formatterBind = formatter.bind(item);
        show(formatterBind);
    });
}

function formatFull() {
    return `${this.title}:\n\tдоступно ${this.available} шт.\n\tв резерве ${this.holded} шт.`;
}

function formatLite() {
    return `${this.title} (${this.available} + ${this.holded})`;
}

function show(format) {
    console.log(format());
}

showPositions(positions, formatFull);
console.log('---');
showPositions(positions, formatLite);

console.log(`part 3 ----------`);

function createButton(title, onclick) {
    return {
        title,
        onclick,
        click() {
            this.onclick.call(this);
        }
    };
}

function createBuyButtons(items){
    let buttonsArr = [];
    items.forEach((item)=>{
        let onclick = ()=> console.log(`${item.title} добавлен в корзину`);
        buttonsArr.push(createButton.call(item, `купить`, onclick));
    });
    return buttonsArr;
}

const buttons = createBuyButtons(positions);
buttons[0].click();
buttons[2].click();
buttons[1].click();
