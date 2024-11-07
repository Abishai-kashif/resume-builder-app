import { User } from "../types/index";
import { downloadPDF, shareLink } from "../utils/shareUtils";
import { Resume } from "./resume";

export function buildResume(user: User) {
	const resumeDiv = document.querySelector(
		".generated-resume"
	) as HTMLDivElement;

	if (resumeDiv) {
		const {
			name,
			email,
			countryCode,
			phone,
			educations,
			skills,
			workExperiences,
			profilePicture,
			github,
			linkedin,
		} = user;

		resumeDiv.innerHTML = Resume(
			name,
			email,
			countryCode,
			phone,
			educations,
			skills,
			workExperiences,
			github,
			linkedin,
			profilePicture ? profilePicture : null
		);
	}

	// Adding a click event listener to the toggle button
	const toggleButton = document.getElementById(
		"toggle-skills"
	) as HTMLButtonElement;

	const skillsSection: HTMLElement | null = document.querySelector(".skills");
	const workExperienceSection: HTMLElement | null =
		document.querySelector(".work-experience");

	toggleButton?.addEventListener("click", () => {
		const isHidden: boolean = skillsSection?.style.display === "none";
		if (skillsSection && workExperienceSection) {
			skillsSection.style.display = isHidden ? "block" : "none";
			workExperienceSection.style.display = isHidden ? "block" : "none";
			toggleButton.innerText = isHidden ? "Show Less" : "Show More";
		}
	});
}

const shareBtn = document.querySelector("#shearable-link") as HTMLButtonElement;
const downloadBtn = document.querySelector(
	"#generate-pdf"
) as HTMLButtonElement;

if (shareBtn) {
	shareBtn.addEventListener("click", () => {
		shareLink().then(() => {
			shareBtn.innerText = "Link Copied";
			shareBtn.disabled = true;
		});
	});
}

if (downloadBtn) {
	downloadBtn.addEventListener("click", () => downloadPDF());
}

const params = new URLSearchParams(window.location.search);

let user: {
	[x: string]: string | string[];
} = {};

params.forEach((value, key) => {
	user[key] =
		key === "workExperiences" || key === "educations"
			? value.split(",") // converting the educations & workexperiences from string into array
			: value;
});

buildResume(user as User); // providing the information to build resume
