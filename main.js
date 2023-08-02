const displayCountries = document.querySelector('.display-countries');
const card = document.querySelector('.display-countries .card');
const countryFlag = document.querySelector('.card img');
const countryDetails = document.querySelector('.content ul');
const countryName = document.querySelector('.content h3');
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
        console.log(result[6]);
        displayCountries.style.display = "flex";
        laoderDiv.style.display="none";
        
    } catch (error) {
       
        console.log(error)
    }
}
showCountries();
