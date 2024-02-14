document.addEventListener("DOMContentLoaded", function() {
    // Fetch the JSON data using fetch API
    fetch('https://jurienwaijenberg.github.io/web-app-from-scratch-2324/info.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        // Once the data is successfully fetched, display it on the page
        displayData(data);
    })
    .catch(error => {
        // If there's an error fetching the data, log the error
        console.error('Error fetching JSON data:', error);
    });
});

function displayData(data) {
    // Assuming the JSON structure is an array of objects, you can iterate over it
    data.forEach(function(item) {

        // Create an HTML element to display each item
        var listItem = document.createElement('section');
        listItem.classList.add('motor');
        listItem.setAttribute('id', item.id);

            // Assuming the JSON structure has 'name' and 'age' properties
            var lastnameParagraph = document.createElement('h3');
            lastnameParagraph.textContent = item.lastName;
            listItem.appendChild(lastnameParagraph);
            lastnameParagraph.classList.add('background-text');

            var profile = document.createElement('section');
            profile.classList.add('max-width');
            profile.classList.add('row');
            listItem.appendChild(profile);

                var profileInfo = document.createElement('section');
                profileInfo.classList.add('profile-info');
                profile.appendChild(profileInfo);

                    var nameParagraph = document.createElement('h2');
                    nameParagraph.textContent = item.firstName;
                    profileInfo.appendChild(nameParagraph);

                    var ul = document.createElement('ul');
                    profileInfo.appendChild(ul);

                        var ageParagraph = document.createElement('li');
                        ageParagraph.textContent = item.age;
                        ul.appendChild(ageParagraph);

                        var city = document.createElement('li');
                        city.textContent = item.city;
                        ul.appendChild(city);

                var profileAvatar = document.createElement('section');
                profileAvatar.classList.add('profile-picture');
                profile.appendChild(profileAvatar);    

                    var avatar = document.createElement('img');
                    avatar.src = item.avatar_url;
                    profileAvatar.appendChild(avatar);

        // Append the created element to the data-container element
        document.getElementById('repeater').appendChild(listItem);
    });