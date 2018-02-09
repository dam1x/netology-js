//fetch короткий метод promise
fetch('data.json')
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));