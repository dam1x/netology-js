const clients = [{
    name: 'Филип Фрай',
    email: 'fray@mail.un',
    isSubscribed: false,
    orders: [11700, 1980, 450, 5500]
}, {
    name: 'Бендер Сгибатель Родригес',
    email: 'bender.rodriges@rambler.un',
    isSubscribed: true,
    orders: [440, 226, 7650, 2990, 70]
}, {
    name: 'Доктор Джон Зоидберг',
    email: 'zoidberg-md@list.un',
    isSubscribed: true,
    orders: [720]
}];

clients.findByName = function (name) {
    foundName = clients.find((client) => {
        if (name === client.name) {
            return client;
        }
    });
    return foundName;
}


const clientOne = clients.findByName('Доктор Джон Зоидберг');
console.log(clientOne.email); // zoidberg-md@list.un

const clientTwo = clients.findByName('Люрр');
console.log(typeof clientTwo); // undefined

console.log(`---------------------`);

function compareByTotalSumm(left, right) {
    let sumLeft = left['orders'].reduce((memo, el) => {
        return memo + el;
    }, 0);
    let rightLeft = right['orders'].reduce((memo, el) => {
        return memo + el;
    }, 0);
    if (sumLeft < rightLeft) {
        return 1;
    } else if (sumLeft === rightLeft) {
        return 0;
    } else {
        return -1;
    }
}

clients
    .sort(compareByTotalSumm)
    .forEach(client => console.log(client.name));
console.log(`---------------------`);


function getSubscribedEmails(list) {
    let arr = list.filter(el => el.isSubscribed).map((el)=>{
        if(el.isSubscribed){
            return el.email;
        }
        return false;
    });
    return arr;
}

function sendMail(email) {
    console.log(`Письмо отправлено на адрес ${email}`);
}

getSubscribedEmails(clients).forEach(sendMail);