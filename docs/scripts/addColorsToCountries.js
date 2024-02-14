/**
 * @Author:             Jop Molenaar
 * @Date created:       13-02-2024
 * @Date updated:       13-02-2024
 * @Description:        add colors to the countries based on the active names we get. 
 */

const defs = document.querySelector("main svg defs");
const paths = document.querySelectorAll(`path`);

/**
 * This function gets an array with all the active names and loops over it. After that it loops over the countries out of the allData variable and when the 
 * data matches with the name, it adds the country with that name to the countryWithNames array. 
 * When a country already exists in the countryWithNames array, it just adds that name to that country next to the other name. 
 * @param {Array} names - An array with all the active names
 */
const addColorToCountries = (names) => {
    let allCountries = []; // get all countries that are in the svg
    defs.innerHTML = ""; // remove all gradients
    paths.forEach((path) => {
        path.setAttribute("fill", `var(--standard-path-color)`);
        if (path.dataset.country) {
            allCountries.push(path.dataset.country);
        }
    });
    let countryWithNames = []; // this is the array with an object per country and the matching names.
    const processCountry = (countryType, data, prefix) => {
        data[countryType].forEach((country) => {
            const countryWithStripe = country.country.replace(' ', '-');
            if (allCountries.includes(countryWithStripe)) { // if the country exists in the allCountries
                const existingCountry = countryWithNames.find(item => item.country === countryWithStripe); // find the country in the countryWithNames
                if (existingCountry) { // if the country already exists in the countryWithNames
                    if (!existingCountry.persons.includes(`${data.firstName}${prefix}`)) { // if the name is not already in the matching persons array of that country.
                        existingCountry.persons.push(`${data.firstName}${prefix}`);
                    }
                } else { // if the country does not exists in the countryWithNames, push the name in the persons array
                    countryWithNames.push({ country: countryWithStripe, persons: [`${data.firstName}${prefix}`] });
                }
            } else {
                console.log("missing country:", countryWithStripe); // log the missing countries
            }
        });
    };

    if (names.length > 0) { // when the name array is filled with at least one name
        names.forEach((name) => {
            allData.forEach((data) => {
                const firstName = data.firstName.toLowerCase();
                if (name === firstName) {
                    processCountry('visitedCountries', data, 'visited');
                    processCountry('bucketList', data, 'bucketlist');
                }
            });
        });
        makeGradients(countryWithNames);
    }
};


/**
 * This function creates a lineargradient element for every country in the given object. And finds out which colors should be in the gradient. 
 * @param {Object} countryWithNames - Object with all the countries and the names that match with the countries 
 */
const makeGradients = (countryWithNames) => {
    countryWithNames.forEach((country)=>{
        const linearGradient = document.createElementNS("http://www.w3.org/2000/svg","linearGradient");
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg","stop");
        const stop2 = document.createElementNS("http://www.w3.org/2000/svg","stop");
        // Set attributes for the linear gradient
        linearGradient.setAttribute("id",`${country.country}`);
        linearGradient.setAttribute("x1", "0%");
        linearGradient.setAttribute("x2", "100%");
        linearGradient.setAttribute("y1", "0%");
        linearGradient.setAttribute("y2", "0%");
        const paths = document.querySelectorAll(`path[data-country="${country.country}"]`);
        paths.forEach((path)=>{
            path.setAttribute("fill", `url(#${country.country})`);
        })
        let stripeColors = [];
        country.persons.forEach((person)=>{
            let name;
            let kindOfColor;
            if(person.includes("bucketlist")){
                name = person.replace('bucketlist','').toLowerCase();
                kindOfColor = "bucketlist";
            } else {
                name = person.replace('visited','').toLowerCase();
                kindOfColor = "visited";
            }
            stripeColors.push(`var(--${name}-${kindOfColor}-color)`)
        })
        multipleColorGradients(linearGradient, stripeColors);
    })
}


/**
 * Adds the gradient to the linearGradient html element and appends it to the defs element
 * @param {Element} linearGradient - The linear gradient element
 * @param {Array} stripeColors - Array with all the colors that should be in the gradient
 */
const multipleColorGradients = (linearGradient, stripeColors) => {
    // Define stripe colors and offsets
    const stripeOffsets = [
        "0%",
        "20%",
        "20%",
        "40%",   
        "40%",      
        "60%",    
        "60%",   
        "80%",
        "80%",
        "100%",
    ];
    // Create and append stops for each stripe
    for (let i = 0; i < stripeOffsets.length; i += 2) {
        const stop1 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
        stop1.setAttribute("offset", stripeOffsets[i]);
        stop1.setAttribute("stop-color", stripeColors[(i / 2) % stripeColors.length]);
        linearGradient.append(stop1);
    
        if (i + 1 < stripeOffsets.length) {
            const stop2 = document.createElementNS("http://www.w3.org/2000/svg", "stop");
            stop2.setAttribute("offset", stripeOffsets[i + 1]);
            stop2.setAttribute("stop-color", stripeColors[(i / 2) % stripeColors.length]);
            linearGradient.append(stop2);
        }
    }
    defs.append(linearGradient);
}

// source chatGPT:
// prompt:
// try to have the same color out of the stripeColors to have the place 1 and 2, and a different color 3 and 4. And so on
// stripeOffsets.forEach((offset, index) => {
//     const stop = document.createElementNS("http://www.w3.org/2000/svg","stop");
//     stop.setAttribute("offset", offset);
//     stop.setAttribute("stop-color",stripeColors[index % stripeColors.length]); // Alternate colors
//     linearGradient.append(stop);
// });
// defs.append(linearGradient);