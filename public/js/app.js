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
const currentLocationButton = document.querySelector('#current-location');

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    const address = searchField.value;
    // fetch weather
    fetch('/weather?address='+address).then((response)=>{
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

currentLocationButton.addEventListener('click', ()=>{
    msg1.textContent = 'Loading...';
    msg2.textContent = '';
    searchField.value = '';
    if(!navigator.geolocation){
        return msg1.innerHTML = '<b>Error: </b>Geolocation is not supported by your browser.';
    }
    navigator.geolocation.getCurrentPosition((position)=>{
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        fetch('/weatherbycoords?latitude='+latitude+'&longitude='+longitude).then((response)=>{
            response.json().then((data)=>{
                if(data.error){
                    msg1.innerHTML = '<b>Error: </b>'+data.error;
                }else{
                    msg1.innerHTML = '<b>Location: </b>'+data.location;
                    msg2.innerHTML = '<b>Forecast: </b>'+data.forecast;
                }
            })
        })
    })
})