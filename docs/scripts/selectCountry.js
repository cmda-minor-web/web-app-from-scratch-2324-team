/**
 * @Author:             Jop Molenaar
 * @Date created:       10-02-2024
 * @Date updated:       10-02-2024
 * @Description:        Get the datasets of the paths to know which country you are clicking,
 *                      get the data of that country, and open the side menu with all the data inside.
 */

const svgCountries = document.querySelectorAll("main svg path"); // All the countries in the worldmap
const popup = document.querySelector(".popup"); // The popup
//const closePopupButton = document.querySelector(".close-popup"); // The close button inside the popup

/**
 * For every path there is in the svg, it adds an addEventListener to it. 
 * Once a path is clicked, it gets the dataset from the path that says which country it is.
 * After that it is given to the openSideMenuWithData() function that waits for the returned data of the 
 * getCountryData() function.
 */
svgCountries.forEach((country) => {
    country.addEventListener("click", async () => {
        if (country.dataset.country) { // If the dataset exists
            openSideMenuWithData(await getCountryData(`${country.dataset.country}`));
        }
    });
});

// Function to make a div with stars from the rating
const ratingToStars = (rating) => {
    const element = document.createElement("div");
    element.classList.add("rating");
    element.setAttribute('aria-label', `${rating} stars`);

    for (let i = 0; i < 5; i++) {
        if (i < rating) { //add as many filled stars as the rating
        	const img = document.createElement("img");
            img.src = './images/star-solid.svg';
            img.alt = '';
            element.appendChild(img);
        } else { //complement with empty stars until there are five
        	const img = document.createElement("img");
            img.src = './images/star-regular.svg';
            img.alt = '';
            element.appendChild(img);
        }
    }

    return element;
};

// function to make an html list from an array
const recommendationsToList = (array) => {
	const element = document.createElement("ul");
	array.forEach(item => {
		const li = document.createElement("li");
		li.textContent = item;
		element.appendChild(li);
	});
	return element;
}

/**
 * This function fires when there is data loaded from the api. 
 * It opens the popup and places the data inside the elements
 * @param {Object} data - The data from the api
 */

//make closebutton available outside the open function
let closePopupButton;

const openSideMenuWithData = (data) => {
    popup.classList.add("open-popup"); // Open the popup

    // empty the popup
    popup.textContent = '';

 	// Add close button to popup
 	closePopupButton = document.createElement("button");
 	closePopupButton.classList.add("close-popup");
 	const closeImage = document.createElement("img");
 	closeImage.src = "./images/close.svg";
 	closeImage.alt = "close";
 	closePopupButton.appendChild(closeImage);
 	popup.appendChild(closePopupButton);

 	// Add click event to close button

    // Add the content of the api to the elements in the popup
    const title = document.createElement("h2");
    title.textContent = data.country;
    popup.appendChild(title);

    const flag = document.createElement("img");
    flag.classList.add("flag");
    flag.src = data.flagImageUrl;
    flag.alt = data.flagImageAlt;
    popup.appendChild(flag);

    const description = document.createElement("p");
    description.innerHTML = data.description;
    popup.appendChild(description);

    // Add our experience or reason to the popup
    allData.forEach((person) => {
    	// if person visited add data from visitedCountries
        if(person.visitedCountries.find(country => country.country == data.country)) {
        	// find the country in visitedCountries
            visitedCountry = person.visitedCountries.find(country => country.country == data.country);

            // Make a section
            section = document.createElement("section");

            // Add title to section with name and label visited
            const h3 = document.createElement('h3');
            const label = document.createElement('span');
            h3.textContent = person.firstName;
            label.textContent = 'visited';
            h3.appendChild(label);
            section.appendChild(h3);

            // Add rating stars to section
            section.appendChild(ratingToStars(visitedCountry.rating));

            // Add experience to section
            const experience = document.createElement('p');
            experience.textContent = visitedCountry.experience;
            section.appendChild(experience);

            // Make list of recommendations and add to section
            section.appendChild(recommendationsToList(visitedCountry.recommendations));

            // Add section to popup
            popup.appendChild(section);
    	} 
    	// if person has country on bucketlist add data from bucketList
    	else if(person.bucketList.find(country => country.country == data.country)) {

    		// find the country in bucketList
            bucketlistCountry = person.bucketList.find(country => country.country == data.country);

            // Make a section
            section = document.createElement("section");

            // Add title to section with name and label bucketlist
            const h3 = document.createElement('h3');
            const label = document.createElement('span');
            h3.textContent = person.firstName;
            label.textContent = 'Bucketlist';
            h3.appendChild(label);
            section.appendChild(h3);

            // Add reason to section
            const reason = document.createElement('p');
            reason.textContent = bucketlistCountry.reason;
            section.appendChild(reason);

            // Add section to popup
            popup.appendChild(section);
    	} 
	})
};

/**
 * This function listens for a click on an element and looks if the element is the one we are looking for.
 * After that it should close the popup when there is clicked outside of the popup or on the close button.
 * @param {Element} event - An element that got clicked
 */
document.body.addEventListener("click", (event) => {
    const parent = event.target.parentElement; // Get the parent of the element that is clicked
    const secondParent = parent.parentElement; // Get the parent of the parent of the element that is clicked
    if (event.target != popup && parent != popup && secondParent != popup || event.target === closePopupButton || parent === closePopupButton) {
        popup.classList.remove("open-popup");
    }
});
