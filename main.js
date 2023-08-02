const displayCountries = document.querySelector('.display-countries');
const card = document.querySelector('.display-countries .card');
const countryFlag = document.querySelector('.card img');
const populationValue = document.querySelector('.population .value');
const regionValue = document.querySelector('.region .value');
const capitalValue = document.querySelector('.capital .value');
const countryName = document.querySelector('.content .header');
const laoderDiv = document.querySelector('.loader-div');

async function showCountries(){
    laoderDiv.style.display="flex";
    const url = `data.json`;
    const options = {
        mode: 'cors'
    };
    try {
    
        const response = await fetch(url, options);
        const result = await response.json();
        countryFlag.src = result[6].flag; 
        countryName.textContent = result[6].name; 
        populationValue.textContent = result[6].population;
        regionValue.textContent = result[6].region;
        capitalValue.textContent = result[6].capital;

        console.log(result[6]);
        displayCountries.style.display = "flex";
        laoderDiv.style.display="none";
        
    } catch (error) {
       
        console.log(error)
    }
}
showCountries();
