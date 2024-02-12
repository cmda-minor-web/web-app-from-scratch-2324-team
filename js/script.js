// Use to load in the right data (members[0].personalData etc.)
let members = [];

// Use to load in the data objects from Github
let brianne = {};
let elaine = {};
let rose = {};
let ruud = {};

// Fetching the members
fetch("./team.json")
	.then((response) => response.json())
	.then((teamdata) => {
		members = teamdata.members;
		loadMemberData(members);
		console.log("TEAM MEMBERS:", members);
	});

const memberData = {
	brianne: {},
	elaine: {},
	rose: {},
	ruud: {},
};

// Loading and logging the members
function loadMemberData(members) {
	members.forEach((member) => {
		const dataURL = `${member.personalData}`;

		fetch(dataURL)
			.then((response) => {
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				return response.json();
			})
			.then((data) => {
				// Directly assign the fetched data to the correct variable based on the member's name
				Object.assign(memberData[member.name], data);
				console.log(`${member.name}`, data); // Logs the data per member
				showMemberData(member);
			})
			.catch((error) => console.error("Error when loading the data:", error));
	});
}

function showMemberData(member) {
	console.log("Showing member data now!");
	const memberOne = document.querySelector("#member-one");
	const memberTwo = document.querySelector("#member-two");
	const memberThree = document.querySelector("#member-three");
	const memberFour = document.querySelector("#member-four");

	// Changing the html based on the data. ALWAYS USE memberData.yourname.thepropertyneeded
	memberOne.textContent = memberData.brianne.name;
	memberTwo.textContent = memberData.elaine.name;
	memberThree.textContent = memberData.rose.name;
	memberFour.textContent = memberData.ruud.name;
}
