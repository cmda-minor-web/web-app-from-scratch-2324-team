/**
 * @Author:             Jop Molenaar
 * @Date created:       08-02-2024
 * @Date updated:       08-02-2024
 * @Description:        Fetch all the api's from our group members and place it in one variable
 */

let allData = [];

const requestJop = fetch(
    "https://jopmolenaar.github.io/web-app-from-scratch-2324/info.json"
).then((response) => response.json());
const requestJoppe = fetch(
    "https://wafs-dot-erudite-imprint-214919.ew.r.appspot.com/info.json"
).then((response) => response.json());
const requestEefje = fetch(
    "https://eefjesnel.github.io/web-app-from-scratch-eefje/list.json"
).then((response) => response.json());
const requestLynn = fetch(
    "https://lynnwolters.github.io/WAFS-individuele-website/info.json"
).then((response) => response.json());

Promise.all([requestJop, requestJoppe, requestEefje, requestLynn])
    .then(([data1, data2, data3, data4]) => {
        allData.push(data1, data2, data3, data4);
    })
    .catch((error) => {
        console.error(error);
    });

// https://rapidapi.com/guides/fetch-data-multiple-apis-with-fetch


//Fetch data from Wikipedia api & Rest countries API code by: Joppe Koops

// Replace spaces with _ for wiki titles
const spaceToUnderscore = (string) => string.replace(/\s+/g, '_');

// Get country description from Wikipedia

const getCountryWikiExtractHTML = async (country) => {

    // Search Wikipedia for the country name and get the title of the first article
    let wikiSearchResult = await fetch(`https://en.wikipedia.org/w/api.php?action=opensearch&origin=*&format=json&search=${country}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        });

    let wikiTitle = spaceToUnderscore(wikiSearchResult[1][0]);

    //Get the actual wiki extract
    let wikiDescrition = await fetch(`https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&exsentences=5&format=json&titles=${wikiTitle}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })
        .then((response) => {
            //The api is made to get multiple article, so eventhough we are only getting one we need to search for the id and get it out of an array.
            let pages = response.query.pages;
            pageId = Object.keys(pages)[0];
            return pages[pageId].extract;
        });

    return await wikiDescrition;
};

// https://www.youtube.com/watch?v=RPz75gcHj18
// https://www.mediawiki.org/w/api.php?action=help


// Get data about country from Rest Countries API: https://restcountries.com/
const fetchRestcountriesApi = async (country) => {
    let result = await fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            return response.json();
        })

    return await result;
}

// Combine the data from both external API's in one usable object
const getCountryData = async (country) => {
    // Promise.all executes both async functions at the same time
    let countryData = await Promise.all([getCountryWikiExtractHTML(country), fetchRestcountriesApi(country)])
        .then(([extractHTML, restcountriesData]) => {
            return {
                // Restructure the data to a usable object
                country: restcountriesData[0].name.common,
                description: extractHTML,
                flagImageUrl: restcountriesData[0].flags.svg,
                flagImageAlt: restcountriesData[0].flags.alt,
                capital: restcountriesData[0].capital[0],
                population: restcountriesData[0].population
            }
        })
        .catch((error) => {
            console.error(error);
        });
    return countryData;
};