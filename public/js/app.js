console.log('Client side js file is loaded!');

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data);
//     })
// })

const weatherForm = document.querySelector('form');
const searchField = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    const address = searchField.value;
    // fetch weather
    fetch('http://localhost:3000/weather?address='+address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                // msg1.textContent = data.error;
                msg1.innerHTML = '<b>Error: </b>'+data.error;
            }else{
                msg1.innerHTML = '<b>Location: </b>'+data.location;
                msg2.innerHTML = '<b>Forecast: </b>'+data.forecast;
            }
        })
    })
})