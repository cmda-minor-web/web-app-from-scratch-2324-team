const selectPerson = document.querySelectorAll(".select-person");
let legendPerson = document.querySelectorAll(".legend-person");

let activePersons = []

function animateSelectPerson() {
    selectPerson.forEach((item, index) => {
        item.addEventListener("click", () => {
            item.classList.toggle("toggle-select-person");
            legendPerson[index].classList.toggle("toggle-legend-person");
            if(legendPerson[index].classList.contains("toggle-legend-person")){
                activePersons.unshift(legendPerson[index].id)
            } else {
                const personIndex = activePersons.indexOf(legendPerson[index].id);
                activePersons.splice(personIndex, 1);
            }
            addColorToCountries(activePersons);
        });
    });
}

animateSelectPerson();


