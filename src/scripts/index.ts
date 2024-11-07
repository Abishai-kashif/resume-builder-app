import { User } from "../types/index";
import "./resume";
import "../utils/inputUtils";
import "../utils/shareUtils";
import "./build-resume";
import getBase64 from "../utils/encodePicture";
import uploadImage from "../utils/formUtils";

document.addEventListener("DOMContentLoaded", () => {
	const anchors = document.querySelectorAll(".addTextArea");

	anchors.forEach((a) => {
		a.addEventListener("click", (event) => {
			event.preventDefault();

			const container = a.parentElement as HTMLElement;

			const area = document.createElement(
				"textarea"
			) as HTMLTextAreaElement;

			area.name = (
				container.querySelector("textarea") as HTMLTextAreaElement
			).name;
			area.setAttribute("contenteditable", "true");

			container.appendChild(area);
		});
	});
});

document
	.getElementById("resume-form")
	?.addEventListener("submit", async (event) => {
		event.preventDefault();

		const formData = new FormData(event.target as HTMLFormElement);

		// image logic chunk starts here!

		const profilePictureFile = formData.get("profile-picture") as File;

		const profilePictureBase64 =
			profilePictureFile.size > 0
				? (await getBase64(profilePictureFile)).split(",")[1]
				: null;

		const imageUrl =
			(profilePictureBase64 &&
				(await uploadImage(profilePictureBase64))) ??
			"";

		// image logic chunk ends here!

		const data = {
			name: formData.get("name"),
			email: formData.get("email"),
			countryCode: formData.get("country-code"),
			phone: formData.get("phone"),
			github: formData.get("github"),
			linkedin: formData.get("linkedin"),
			skills: formData.get("skills"),
			educations: formData.getAll("education"),
			workExperiences: formData.getAll("work-experience"),
			profilePicture: imageUrl,
		} as User;

		const searchParams = new URLSearchParams();

		for (const [key, value] of Object.entries(data)) {
			if (value !== null && value !== undefined) {
				searchParams.set(key, value.toString());
			}
		}

		const resumeLink = `${
			window.location.origin
		}/src/pages/resume.html?${searchParams.toString()}`;

		window.location.href = resumeLink;
	});
