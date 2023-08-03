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
        let listPopulationDigits = populationValue.textContent.split("");
        let reversePopulationDigits = [];
        
        for(i in listPopulationDigits){
            reversePopulationDigits.unshift(listPopulationDigits[i]); //reverse string so to start putting commas starting from right
        }
        let reversePopulationDigitsWithComma =  [...reversePopulationDigits];
        for(let j=0; j < reversePopulationDigits.length; j++){
            if((j+1)%3 == 0 && (j+1) != reversePopulationDigits.length){ // target every the 3rd digits and exclude the last 3rd one
                console.log(reversePopulationDigits[j]);
                const numberOfComma = reversePopulationDigitsWithComma
                                .filter(element=>element == ',')
                                .reduce((tot, commas)=>{
                                    return tot+1;
                                },0); 
               
                let commaStartingPosition = j+numberOfComma+1; // find the position to put the comma, by taking consideration of new incoming element (commas) as it updates the string length
        
                reversePopulationDigitsWithComma.splice(commaStartingPosition,0, ',');
            } 
        }
        let listPopulationDigitsWithComma = [];
        for(i in reversePopulationDigitsWithComma){
            listPopulationDigitsWithComma.unshift(reversePopulationDigitsWithComma[i]);
        }
        const populationDigitsWithComma = listPopulationDigitsWithComma.reduce((text,element)=>{
            return text+element;
        },'')

        
        console.log(result[6]);
        populationValue.textContent = populationDigitsWithComma;
        displayCountries.style.display = "flex";
        laoderDiv.style.display="none";
        
    } catch (error) {
       
        console.log(error)
    }
}
showCountries();
