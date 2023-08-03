const displayCountries = document.querySelector('.display-countries');
const laoderDiv = document.querySelector('.loader-div');

async function showCountries(){
    laoderDiv.style.display="flex";
    const url = `data.json`;
    const options = {
        mode: 'cors'
    };
    try {
        let card = '';
        const response = await fetch(url, options);
        const result = await response.json();
        result.forEach(country => {
           
            let populationVal = country.population;
            let listPopulationDigits = populationVal.toString().split("");
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

            populationVal = populationDigitsWithComma;

            card +=`
                <div class="card">
                    <div class="flag">
                    <img src="${country.flags.png}" alt="${country.name}" />
                    </div>
                    <div class="content">
                    <div class="header">${country.name}</div>
                    <div class="details">
                        <div class="population">
                            <div class="key">Population:</div>
                            <div class="value">${populationVal}</div>
                        </div>
                        <div class="region">
                            <div class="key">Region:</div>
                            <div class="value">${country.region}</div>
                        </div>
                        <div class="capital">
                            <div class="key">Capital:</div>
                            <div class="value">${country.capital}</div>
                        </div>
                    </div>
                    </div>
                </div>`;
        });
        console.log(result[6]);
        displayCountries.innerHTML = card;
        displayCountries.style.display = "flex";
        laoderDiv.style.display="none";
        
    } catch (error) {
       
        console.log(error)
    }
}
showCountries();
