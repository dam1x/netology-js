//getData.js
function httpGet(url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState !== 4) {
                return;
            }

            if (xhr.status !== 200) {
                throw new Error('Response error');
            }
            resolve(xhr.responseText);
        });
    });
}

//index.js  ...
httpGet('./data.json')
    .then((text) => console.log(text))
    .then((text) => 5)
    .then((prevText) => console.log(prevText)) //5
    .catch(() => console.log("BAD!!!"));

// httpGet('data-2.json')
//     .then((text) => console.log(text))
//     .catch(() => console.log("BAD!!!"));