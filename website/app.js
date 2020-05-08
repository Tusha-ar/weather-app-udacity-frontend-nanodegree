
/* Global Variables */
const zip = document.getElementById('zip');
const feeling = document.getElementById('feelings');
const postURL = '/data';
const getURL = '/getData';
const apiKey = ',IN&appid=e2b5e0be399e5b4e108ec3ff9ee22dc1'
const url = "https://api.openweathermap.org/data/2.5/weather?zip="
const notFound = document.getElementById('not_found');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');


//gen url for api
const genUrl =(url, zip, apiKey) =>{
    const URL = url + zip + apiKey
    return URL
}
// Create a new date instance dynamically with JS
const getDate = ()=>{
    let d = new Date();
    const date = d.getMonth()+1 + '.' + d.getDate() + '.' + d.getFullYear()
    return date
}


//post function

const postdata = async(path, data) =>{
    try{
    await fetch(path,{
        method: 'POST', 
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
}
catch(err){
    console.log(err);
}
}


//get weather info from api
const getWeather = async(url)=>{

        const weather = await fetch(url);
        console.log(weather)
        const weatherInJSON = weather.json();
        if(weather.status === 404){
            return false
        }
        else
            return weatherInJSON

}
//for the click
const clicked = async ()=>{
    const URL = genUrl(url, zip.value, apiKey)
    const weatherData = await getWeather(URL);
    if(weatherData === false)
    {
        console.log("mvfkgmfvkgfmgkfmgvkm")
        notFound.innerHTML = 'Enter Valid Zip Code';
    }
    else{
        const temp = weatherData.main.temp;
        const date = await getDate();
        const data = {
            date : date,
            temp : temp,
            feelings : feeling.value
        }
        
        postdata(postURL, data)
        updateUI();
    }
}

//update UI
const updateUI = async () => {
    notFound.innerHTML = ''
    const request = await fetch('/getData');
    console.log(request);
    try{
        const allData = await request.json();
        date.innerHTML = 'Date : ' + allData.date;
        temp.innerHTML = 'Temp : ' + allData.temp;
        content.innerHTML = 'Feeling : ' + allData.feelings;
    }
    catch(err){
        console.log(err);
    }
};
document.getElementById('generate').addEventListener('click', clicked);

