let key = window.location.search;
let urlParam = new URLSearchParams(key);
let keyValue = urlParam.get('id'); //get the country index number from url
const loaderDiv = document.querySelector('.loader-div');
const displayCountryDiv = document.querySelector('.country-card');

async function displayCountry(){
    loaderDiv.style.display="flex";
    const url = `data.json`;
    const options = {
        mode: 'cors'
    };
    try {
        let card = '';
        const response = await fetch(url, options);
        const result = await response.json();
        const country= result[keyValue];
        let borderDiv ='';
        const borderCountryCode = country.borders;
        const borderCountryInfo = result.filter(x =>{  
            for(let i in borderCountryCode){
                if(x.alpha3Code == borderCountryCode[i]){
                    return true; //keep the matching border code
                }
            }
        });
        if(borderCountryInfo.length > 0){
            borderDiv = borderCountryInfo.reduce((all, item) => { //retrieve countries with the matched border code
                let indexOfCountry = result.findIndex(x=> x.name == item.name); // get index for url 
                return all+`<a href="country.html?id=${indexOfCountry}" class="country-border">${item.name}</a>`;
            },'');
        }
        else{
            borderDiv = '<a href="index.html" class="country-border">No Border, Go to Home Page? </a>';
        }
        

            let populationVal = country.population;
            let listPopulationDigits = populationVal.toString().split("");
            let reversePopulationDigits = [];
            
            for(i in listPopulationDigits){
                reversePopulationDigits.unshift(listPopulationDigits[i]); //reverse string so to start putting commas starting from right
            }
            let reversePopulationDigitsWithComma =  [...reversePopulationDigits];
            for(let j=0; j < reversePopulationDigits.length; j++){
                if((j+1)%3 == 0 && (j+1) != reversePopulationDigits.length){ // target every the 3rd digits and exclude the last 3rd one
                    
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
            let topLevelDomain = country.topLevelDomain.reduce((all, item) => {
                return all+' '+item+',';
            },'');
            topLevelDomain = topLevelDomain.slice(0, topLevelDomain.length - 1); // remove the last comma

            let languages = country.languages.reduce((all, item) => {
                return all+' '+item.name+',';
            },'');
            languages = languages.slice(0, languages.length - 1); // remove the last comma

            let currencies = country.currencies.reduce((all, item) => {
                return all+' '+item.name+',';
            },'');
            currencies = currencies.slice(0, currencies.length - 1); // remove the last comma
            
            card +=`

            <div class="flag">
            <img src="${country.flags.svg}" alt="${country.name}" />
            </div>
            <div class="contents">
                <div class="top-detail">${country.name}</div>
                <div class="middle-details">
                    <div class="left-details">
                        <div class="native-name">
                            <div class="key">Native Name:</div>
                            <div class="value">${country.nativeName}</div>
                        </div>
                        <div class="detail-item">
                            <div class="key">Population:</div>
                            <div class="value">${populationVal}</div>
                        </div>
                        <div class="detail-item">
                            <div class="key">Region:</div>
                            <div class="value">${country.region}</div>
                        </div>
                        <div class="detail-item">
                            <div class="key">Sub Region:</div>
                            <div class="value">${country.subregion}</div>
                        </div>
                        <div class="detail-item">
                            <div class="key">Capital:</div>
                            <div class="value">${country.capital}</div>
                        </div>
                    </div>
                    <div class="right-details">
                        <div class="detail-item">
                            <div class="key">Top Level Domain:</div>
                            <div class="value">${topLevelDomain}</div>
                        </div>
                        <div class="detail-item">
                            <div class="key">Currencies:</div>
                            <div class="value">${currencies}</div>
                        </div>
                        <div class="detail-item">
                            <div class="key">Languages:</div>
                            <div class="value">${languages}</div>
                        </div>
                    </div>
                </div>
                <div class="bottom-details">
                    <div class="border">
                        <div class="key">Border Countries:</div>
                        <div class="border-countries">${borderDiv}</div>
                    </div>
                </div>
            </div>`;
        
        displayCountryDiv.innerHTML = card;
        displayCountryDiv.style.display = "flex";
        loaderDiv.style.display="none";
        
            
    } catch (error) {
       
        console.log(error)
    }
}
displayCountry();
