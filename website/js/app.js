const generate = document.getElementById('generate');
const feelings = document.getElementById('feelings');
const zip = document.getElementById('zip');
const key = '&appid=83b1cdcf777f1bd6794c3d73000ca100&units=imperial'; //api key with unit conversion
let link; // a variable to store link of api
var data = {}; //empty array to give to post request as a argument
var allData = {}; // array to store data recieved from get request
let d = new Date();
let newDate = d.getDate()+'.'+ (d.getMonth()+1)+'.'+ d.getFullYear();
generate.addEventListener('click',async ()=>{
    let feeling = feelings.value; //extracting the value given by the user
    let zip_data = zip.value;
    link = `http://api.openweathermap.org/data/2.5/weather?zip=${zip_data}${key}`;
    const resp = await fetch(link);
    const json = await resp.json(); //extracting data from the api
    feelings.value = "";
    zip.value = "";
    const temp = json.main.temp;
    postGet(temp, feeling); //calling the postGet function to  setup post and get requests
    document.querySelector(".holder_entry").style.display = "inline";
})
const postData = (data) => { //post request
  const response = fetch('/weather', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
  },
  credentials: 'same-origin', 
  body: JSON.stringify(data),   
  }).then((response)=>{
    console.log(response.json);
    return response.json();
  }).catch((err)=>console.log(err));
};
const retrieveData = async () =>{  //get request
    const request = await fetch('/all');
    try {
    // Transform into JSON
    allData = await request.json();
    const recent_temp = allData.temp;
    const recent_date = allData.date;
    const recent_content = allData.feeling;
    setRecent(recent_temp, recent_date, recent_content); //function to set html elements equal to the data recieved
    }
    catch(error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };
async function postGet(temp, feeling){ 
    await postData({newDate, temp,feeling})
    retrieveData();
}
function setRecent(recent_temp, recent_date, recent_content) {
  document.getElementById('date').innerHTML = `Date : ${recent_date}`;
  document.getElementById('content').innerHTML = `Content : ${recent_content}`;
  document.getElementById('temp').innerHTML = `Temperature : ${recent_temp} ° Fahrenheit`;
}
