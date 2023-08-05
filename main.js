const displayCountries = document.querySelector('.display-countries');
const loaderDiv = document.querySelector('.loader-div');
const userInput = document.querySelector('.country-field');
const errorDiv = document.querySelector('.error');
const regions = document.querySelectorAll('.item');
const displayedRegion = document.querySelector('.region-name');
const screeMode = document.querySelector('.mode');
const body = document.querySelector('body');
const nav = document.querySelector('nav');
const countryField = document.querySelector('.country-field');
const filterSelect = document.querySelector('.filter-select');
const filterItems = document.querySelector('.filter-items');
const card = document.querySelector('.card');
const regionName = document.querySelector('.region-name');
const searchIcon = document.querySelector('.fa-magnifying-glass');
let currentString ='';

async function showCountries(){
    loaderDiv.style.display="flex";
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
            let indexOfCountry = result.findIndex(x=> x.name == country.name);
            let iconDiv = screeMode.firstElementChild; // target the element with mode icon  
            let italicIcon = iconDiv.firstElementChild;
            let modeIcon = italicIcon.getAttribute('class'); // get icon element class name to know the mode of the page
            let iconName = modeIcon.split(' ');
            let pageMode = '';
            if(iconName[1] == "fa-sun"){
                pageMode = 'dark-element'; // change the card backgroud color depending on page mode
            }

            card +=`
                <div class="card ${pageMode}"> 
                    <a href="country.html?id=${indexOfCountry}"> 
                    <div class="flag">
                    <img src="${country.flags.png}" alt="${country.name}" />
                    </div>
                    </a>
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

        displayCountries.innerHTML = card;
        displayCountries.style.display = "flex";
        loaderDiv.style.display="none";
        
    } catch (error) {
       
        console.log(error)
    }
}
showCountries();

async function searchCountry(e){
    let currentKey = '';
    
    if(e.keyCode == 8){ // if backspace key is pressed
        let extractLastElement = currentString.slice(0, currentString.length - 1); // remove the last element
        
        currentString = extractLastElement; //update the current string to a new substring
        
    }else{
        currentKey = e.key;
    }
    currentString += currentKey; //combine all the characters to form a string as a user is typing

    loaderDiv.style.display="flex";
    displayCountries.style.display = "none";
    displayedRegion.style.display = "none";
    const url = `data.json`;
    const options = {
        mode: 'cors'
    };
    
    try {
        let card = '';
        const response = await fetch(url, options);
        const result = await response.json();
        let searchInputKey = new Promise((resolve, reject)=>{
            let filterCountry = result.filter(x => { // search as user is typing 
                let countryName = x.name.toLowerCase();
                const string = `^${currentString}`; // compare the current string to all the countries' starting characters 
                const regexp = new RegExp(string); 
                if(regexp.test(countryName)){
                    return true;  //keep the matching ones
                }
            });
            
            if(filterCountry.length > 0){
                resolve(filterCountry);
            }else{
                reject('Country not Found');
            }
    
        });
        
        searchInputKey.then((countries)=>{
            countries.forEach(country => {
           
                let populationVal = country.population;
                let listPopulationDigits = populationVal.toString().split("");
                let reversePopulationDigits = [];
                
                for(i in listPopulationDigits){
                    reversePopulationDigits.unshift(listPopulationDigits[i]);
                }
                let reversePopulationDigitsWithComma =  [...reversePopulationDigits];
                for(let j=0; j < reversePopulationDigits.length; j++){
                    if((j+1)%3 == 0 && (j+1) != reversePopulationDigits.length){
                        
                        const numberOfComma = reversePopulationDigitsWithComma
                                        .filter(element=>element == ',')
                                        .reduce((tot, commas)=>{
                                            return tot+1;
                                        },0); 
                    
                        let commaStartingPosition = j+numberOfComma+1;
                
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
                let indexOfCountry = result.findIndex(x=> x.name == country.name);
                let iconDiv = screeMode.firstElementChild; // target the element with mode icon  
                let italicIcon = iconDiv.firstElementChild;
                let modeIcon = italicIcon.getAttribute('class'); // get icon element class name to know the mode of the page
                let iconName = modeIcon.split(' ');
                let pageMode = '';
                if(iconName[1] == "fa-sun"){
                    pageMode = 'dark-element'; // change the card backgroud color depending on page mode
                }
    
                card +=`
                    <div class="card ${pageMode}">
                        <a href="country.html?id=${indexOfCountry}">
                        <div class="flag">
                        <img src="${country.flags.png}" alt="${country.name}" />
                        </div>
                        </a>
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
            
            displayCountries.innerHTML = card;
            displayCountries.style.display = "flex";
            loaderDiv.style.display="none";
            errorDiv.style.display="none";
 
        }).catch((err)=>{
            displayCountries.style.display = "none";
            displayedRegion.style.display = "none";
            errorDiv.style.display="block";
            errorDiv.textContent = err;
            loaderDiv.style.display="none";
        
        })
       
        
        
    } catch (error) {
        displayCountries.style.display = "none";
        displayedRegion.style.display = "none";
        errorDiv.style.display="block";
        errorDiv.textContent = "Unable to fetch Data";
        loaderDiv.style.display="none";
    }
}
userInput.addEventListener('keydown', searchCountry);

async function searchCountryByRegion(continent){
    
    let continentName = continent.target.getAttribute('id');

    loaderDiv.style.display="flex";
    displayCountries.style.display = "none";
    displayedRegion.style.display = "none";
   
    const url = `data.json`;
    const options = {
        mode: 'cors'
    };
    
    try {
        let card = '';
        const response = await fetch(url, options);
        const result = await response.json();
      
        let filterCountry = result.filter(x => x.region == continentName);
        
        filterCountry.forEach(country => {
            let populationVal = country.population;
            let listPopulationDigits = populationVal.toString().split("");
            let reversePopulationDigits = [];
            
            for(i in listPopulationDigits){
                reversePopulationDigits.unshift(listPopulationDigits[i]);
            }
            let reversePopulationDigitsWithComma =  [...reversePopulationDigits];
            for(let j=0; j < reversePopulationDigits.length; j++){
                if((j+1)%3 == 0 && (j+1) != reversePopulationDigits.length){
                    
                    const numberOfComma = reversePopulationDigitsWithComma
                                    .filter(element=>element == ',')
                                    .reduce((tot, commas)=>{
                                        return tot+1;
                                    },0); 
                
                    let commaStartingPosition = j+numberOfComma+1;
            
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
            let indexOfCountry = result.findIndex(x=> x.name == country.name);
            let iconDiv = screeMode.firstElementChild; // target the element with mode icon  
            let italicIcon = iconDiv.firstElementChild;
            let modeIcon = italicIcon.getAttribute('class'); // get icon element class name to know the mode of the page
            let iconName = modeIcon.split(' ');
            let pageMode = '';
            if(iconName[1] == "fa-sun"){
                pageMode = 'dark-element'; // change the card backgroud color depending on page mode
            }

            card +=`
                <div class="card ${pageMode}">
                    <a href="country.html?id=${indexOfCountry}">
                    <div class="flag">
                    <img src="${country.flags.png}" alt="${country.name}" />
                    </div>
                    </a>
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
    
    displayCountries.innerHTML = card;
    displayedRegion.textContent = continentName;
    displayedRegion.style.display = "block";
    displayCountries.style.display = "flex";
    loaderDiv.style.display="none";
    errorDiv.style.display="none";
   
    } catch (error) {
        displayCountries.style.display = "none";
        displayedRegion.style.display = "none";
        errorDiv.style.display="block";
        errorDiv.textContent = "Unable to fetch Data";
        loaderDiv.style.display="none";
    }
}

regions.forEach((region)=>{
    region.addEventListener('click', searchCountryByRegion);
});

screeMode.addEventListener('click', (e)=>{
   let iconDiv = screeMode.firstElementChild;
   let italicIcon = iconDiv.firstElementChild;
   let modeIcon = italicIcon.getAttribute('class'); // get icon element class name to know the mode of the page
   let iconName = modeIcon.split(' ');
   if(iconName[1] == "fa-moon"){
      italicIcon.setAttribute('class', 'fa-regular fa-sun')
      e.target.textContent = "Light Mode";
      searchIcon.style.color = "white";
   }else{
      italicIcon.setAttribute('class', 'fa-regular fa-moon')
      e.target.textContent = "Dark Mode";
      searchIcon.style.color = "grey";
   }
    body.classList.toggle('dark');
    nav.classList.toggle('dark-element');
    countryField.classList.toggle('dark-element');
    filterSelect.classList.toggle('dark-element');
    filterItems.classList.toggle('dark-element');
    card.classList.toggle('dark-element');
    regionName.classList.toggle('dark-element');
    showCountries();
    
})

