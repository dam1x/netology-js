'use strict';

var positions = [
    {
        title: 'Телепорт бытовой VZHIH-101',
        price: 10000,
        discount: 7,
        available: 3
    },
    {
        title: 'Ховерборд Mattel 2016',
        price: 9200,
        discount: 4,
        available: 14
    },
    {
        title: 'Меч световой FORCE (синий луч)',
        price: 57000,
        discount: 0,
        available: 1
    }
];
const itemPrototype = {
    hold(amount = 1) {
        if (this.available < amount) {
            return false;
        }
        this.available -= amount;
        this.holded += amount;
        return true;
    },
    toString() {
        return `${this.title} (остаток ${this.available}, в резерве ${this.holded})`;
    },
    unhold(amount = this.holded){
        if(this.holded > 0 && amount <= this.holded){
            this.holded -= amount;
            this.available += amount;
        } else{
            return false;
        }
    }
};

function createItem(title, amount) {
    const item = Object.create(itemPrototype);
    item.title = title;
    item.available = amount;
    item.holded = 0;
    return item;
}

const items = [];
for (let item of positions) {
    items.push(createItem(item.title, item.available));
}

items[0].hold(2);
items[1].hold(8);
items[1].hold(12);
items[2].hold(1);
items[0].unhold(1);
items[1].unhold();
for (let item of items) {
    console.log(`Товар ${item}`);
}

for (let item of positions) {

    let config = {
        configurable: true,
        get() {
            return Math.round((this.price - (this.price * (this.discount * 0.01))) * 100) / 100;
        }
    };

    Object.defineProperty(item, 'finalPrice', config);

    config = {
        set(finalPrice) {
            try {
                if (finalPrice > item.price) {
                    throw 'Цена со скидкой больше базовой цены.';
                }
                item.discount = Math.round((this.price - finalPrice) / (this.price * 0.01) * 100) / 100;
            } catch(err) {
                console.log(`Ошибка при расчете скидки: ${err}`);
            }
        }
    };

    Object.defineProperty(item, 'finalPrice', config);
}


console.log(positions[0].finalPrice); // 9300
positions[2].finalPrice = 28500;
console.log(positions[2].discount); // 50

function isValidPosition(obj, arr) {
    for(let item of arr){
        if(!(item in obj)){
            return false;
        }
    }
    return true;
}

const requiredFields = [ 'title', 'price', 'discount' ];
let form1 = {
    title: 'Товар Телепорт бытовой VZHIH-101',
    price: 7800,
    discount: 0
};
let form2 = {
    title: 'Товар Телепорт бытовой VZHIH-101',
    discount: 10
}


if ( isValidPosition(form1, requiredFields) ) {
    console.log('Форма №1 заполнена верно');
} else {
    console.log('В форме №1 не заполнены необходимые поля');
}

if ( isValidPosition(form2, requiredFields) ) {
    console.log('Форма №2 заполнена верно');
} else {
    console.log('В форме №2 не заполнены необходимые поля');
}

//