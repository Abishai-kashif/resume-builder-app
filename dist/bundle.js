/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/scripts/build-resume.ts":
/*!*************************************!*\
  !*** ./src/scripts/build-resume.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "buildResume": () => (/* binding */ buildResume)
/* harmony export */ });
/* harmony import */ var _utils_shareUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/shareUtils */ "./src/utils/shareUtils.ts");
/* harmony import */ var _resume__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./resume */ "./src/scripts/resume.ts");


function buildResume(user) {
    const resumeDiv = document.querySelector(".generated-resume");
    if (resumeDiv) {
        const { name, email, countryCode, phone, educations, skills, workExperiences, profilePicture, github, linkedin, } = user;
        resumeDiv.innerHTML = (0,_resume__WEBPACK_IMPORTED_MODULE_1__.Resume)(name, email, countryCode, phone, educations, skills, workExperiences, github, linkedin, profilePicture ? profilePicture : null);
    }
    // Adding a click event listener to the toggle button
    const toggleButton = document.getElementById("toggle-skills");
    const skillsSection = document.querySelector(".skills");
    const workExperienceSection = document.querySelector(".work-experience");
    toggleButton?.addEventListener("click", () => {
        const isHidden = skillsSection?.style.display === "none";
        if (skillsSection && workExperienceSection) {
            skillsSection.style.display = isHidden ? "block" : "none";
            workExperienceSection.style.display = isHidden ? "block" : "none";
            toggleButton.innerText = isHidden ? "Show Less" : "Show More";
        }
    });
}
const shareBtn = document.querySelector("#shearable-link");
const downloadBtn = document.querySelector("#generate-pdf");
if (shareBtn) {
    shareBtn.addEventListener("click", () => {
        (0,_utils_shareUtils__WEBPACK_IMPORTED_MODULE_0__.shareLink)().then(() => {
            shareBtn.innerText = "Link Copied";
            shareBtn.disabled = true;
        });
    });
}
if (downloadBtn) {
    downloadBtn.addEventListener("click", () => (0,_utils_shareUtils__WEBPACK_IMPORTED_MODULE_0__.downloadPDF)());
}
const params = new URLSearchParams(window.location.search);
let user = {};
params.forEach((value, key) => {
    user[key] =
        key === "workExperiences" || key === "educations"
            ? value.split(",") // converting the educations & workexperiences from string into array
            : value;
});
buildResume(user); // providing the information to build resume


/***/ }),

/***/ "./src/scripts/resume.ts":
/*!*******************************!*\
  !*** ./src/scripts/resume.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Resume": () => (/* binding */ Resume)
/* harmony export */ });
/* harmony import */ var _utils_inputUtils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/inputUtils */ "./src/utils/inputUtils.ts");

function Resume(name, email, countryCode, phone, educations, skills, workExperiences, github, linkedin, profilePicture) {
    return `
    <section class="personal-info">
        <figure>
            <img
                referrerpolicy="noreferrer"
                src=${profilePicture
        ? profilePicture
        : "../../public/assets/images/default-picture.jpg"}
                alt="Profile Picture"
                width="140"
                height="170"
                crossorigin="anonymous"
            />
            <figcaption><h1 data-editable="name" contenteditable="true">${name}</h1></figcaption>
        </figure>

        <div id="contact-details">
            <p id="email">
                <a href="mailto:${email}" target="_blank" rel="noopener noreferrer"><i class="bx bxs-envelope"></i> email</a>
            </p>

            <p id="github">
                <a href="${github}" target="_blank" rel="noopener noreferrer"><i class="bx bxl-github"></i> github</a>
            </p>

            <p id="linkedin">
                <a href="${linkedin}" target="_blank" rel="noopener noreferrer"><i class="bx bxl-linkedin-square"></i> linkedin</a>
            </p>

            <p id="number" target="_blank" rel="noopener noreferrer">
                <a href="tel:${(0,_utils_inputUtils__WEBPACK_IMPORTED_MODULE_0__.processInput)("phone", phone, countryCode)}">${(0,_utils_inputUtils__WEBPACK_IMPORTED_MODULE_0__.processInput)("phone", phone, countryCode)} <i class="bx bxs-phone"></i></a>
            </p>

        </div>

    </section>

    <section class="education">
        <h2>Education</h2>
        <ul>
            ${educations
        .filter((education) => education !== "")
        .map((education) => `<li data-editable="education" contenteditable="true">${education}</li>`)
        .join("")}
        </ul>
    </section>

    <section class="skills" style="display: none">
        <h2>Skills</h2>
        <ul>
            ${(0,_utils_inputUtils__WEBPACK_IMPORTED_MODULE_0__.processInput)("skills", skills)
        .map((skill) => `<li data-editable="skills" contenteditable="true">${skill}</li>`)
        .join("")}
        </ul>
    </section>

    <section class="work-experience" style="display: none">
        <h2>Work Experience</h2>
        <ul>
            ${workExperiences
        .filter((workExperience) => workExperience !== "")
        .map((workExperience) => `<li data-editable="work-experience" contenteditable="true">${workExperience}</li>`)
        .join("")}
        </ul>
    </section>

    <button id="toggle-skills">Show More</button>
    `;
}


/***/ }),

/***/ "./src/utils/encodePicture.ts":
/*!************************************!*\
  !*** ./src/utils/encodePicture.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBase64)
/* harmony export */ });
function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
}


/***/ }),

/***/ "./src/utils/formUtils.ts":
/*!********************************!*\
  !*** ./src/utils/formUtils.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uploadImage)
/* harmony export */ });
// type ReturnType<T> = T extends "all" ? string[] : string;
// export function getAndDelProp<
// 	F extends FormData,
// 	P extends string,
// 	M extends "all" | "single"
// >(formData: F, propName: P, getMethod: M): ReturnType<M> {
// 	let value =
// 		getMethod === "all"
// 			? formData.getAll(propName)
// 			: formData.get(propName);
// 	formData.delete(propName);
// 	return value as any;
// }
// export default async function uploadImage(
// 	imageBase64: string
// ): Promise<string | undefined> {
// 	const response = await fetch("https://api.imgur.com/3/image", {
// 		method: "post",
// 		headers: {
// 			Authorization: "Client-ID 864280fbd715cf5",
// 		},
// 		body: JSON.stringify({ image: imageBase64, type: "base64" }),
// 	});
// 	const data = await response.json();
// 	const link = data.data.link; // The URL of the uploaded image
// 	console.log(link);
// 	return link;
// }
async function uploadImage(imageBase64) {
    const formData = new FormData();
    formData.append("image", imageBase64); // Use 'image' as the key
    const response = await fetch("https://api.imgur.com/3/image", {
        method: "post",
        headers: {
            Authorization: "Client-ID 864280fbd715cf5",
        },
        body: formData,
    });
    if (!response.ok) {
        console.error("Image upload failed:", response.statusText);
        return undefined;
    }
    const data = await response.json();
    const link = data.data.link; // The URL of the uploaded image
    console.log(link);
    return link;
}


/***/ }),

/***/ "./src/utils/inputUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/inputUtils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "processInput": () => (/* binding */ processInput)
/* harmony export */ });
// Implementation
function processInput(type, input, contryCode) {
    if (type === "skills") {
        // Process skills input
        const cleanedStr = input.replace(/[,;]+/g, ",");
        const skills = cleanedStr
            .split(",")
            .map((skill) => skill.trim())
            .filter((skill) => skill.length > 0);
        return skills;
    }
    else {
        // Process phone input
        const cleanedStr = contryCode + input.replace(/\D+/g, "0");
        return cleanedStr;
    }
}


/***/ }),

/***/ "./src/utils/shareUtils.ts":
/*!*********************************!*\
  !*** ./src/utils/shareUtils.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "downloadPDF": () => (/* binding */ downloadPDF),
/* harmony export */   "shareLink": () => (/* binding */ shareLink)
/* harmony export */ });
async function shareLink() {
    const link = window.location.href;
    return await navigator.clipboard.writeText(link);
}
async function downloadPDF() {
    window.print();
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/scripts/index.ts ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _resume__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./resume */ "./src/scripts/resume.ts");
/* harmony import */ var _utils_inputUtils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/inputUtils */ "./src/utils/inputUtils.ts");
/* harmony import */ var _utils_shareUtils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/shareUtils */ "./src/utils/shareUtils.ts");
/* harmony import */ var _build_resume__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./build-resume */ "./src/scripts/build-resume.ts");
/* harmony import */ var _utils_encodePicture__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/encodePicture */ "./src/utils/encodePicture.ts");
/* harmony import */ var _utils_formUtils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/formUtils */ "./src/utils/formUtils.ts");






document.addEventListener("DOMContentLoaded", () => {
    const anchors = document.querySelectorAll(".addTextArea");
    anchors.forEach((a) => {
        a.addEventListener("click", (event) => {
            event.preventDefault();
            const container = a.parentElement;
            const area = document.createElement("textarea");
            area.name = container.querySelector("textarea").name;
            area.setAttribute("contenteditable", "true");
            container.appendChild(area);
        });
    });
});
document
    .getElementById("resume-form")
    ?.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    // image logic chunk starts here!
    const profilePictureFile = formData.get("profile-picture");
    const profilePictureBase64 = profilePictureFile.size > 0
        ? (await (0,_utils_encodePicture__WEBPACK_IMPORTED_MODULE_4__["default"])(profilePictureFile)).split(",")[1]
        : null;
    const imageUrl = (profilePictureBase64 &&
        (await (0,_utils_formUtils__WEBPACK_IMPORTED_MODULE_5__["default"])(profilePictureBase64))) ??
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
    };
    const searchParams = new URLSearchParams();
    for (const [key, value] of Object.entries(data)) {
        if (value !== null && value !== undefined) {
            searchParams.set(key, value.toString());
        }
    }
    const resumeLink = `${window.location.origin}/src/pages/resume.html?${searchParams.toString()}`;
    window.location.href = resumeLink;
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdFQUFTO0FBQzFCO0FBQ0E7QUFDQSxlQUFlLDREQUFXO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQkFBMEIsdUJBQXVCLHlCQUF5Qix3QkFBd0I7QUFDbEc7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vbWlsZXN0b25lLTUvLi9zcmMvc2NyaXB0cy9idWlsZC1yZXN1bWUudHMiLCJ3ZWJwYWNrOi8vbWlsZXN0b25lLTUvLi9zcmMvc2NyaXB0cy9yZXN1bWUudHMiLCJ3ZWJwYWNrOi8vbWlsZXN0b25lLTUvLi9zcmMvdXRpbHMvZW5jb2RlUGljdHVyZS50cyIsIndlYnBhY2s6Ly9taWxlc3RvbmUtNS8uL3NyYy91dGlscy9mb3JtVXRpbHMudHMiLCJ3ZWJwYWNrOi8vbWlsZXN0b25lLTUvLi9zcmMvdXRpbHMvaW5wdXRVdGlscy50cyIsIndlYnBhY2s6Ly9taWxlc3RvbmUtNS8uL3NyYy91dGlscy9zaGFyZVV0aWxzLnRzIiwid2VicGFjazovL21pbGVzdG9uZS01L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL21pbGVzdG9uZS01L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9taWxlc3RvbmUtNS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL21pbGVzdG9uZS01L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vbWlsZXN0b25lLTUvLi9zcmMvc2NyaXB0cy9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBkb3dubG9hZFBERiwgc2hhcmVMaW5rIH0gZnJvbSBcIi4uL3V0aWxzL3NoYXJlVXRpbHNcIjtcbmltcG9ydCB7IFJlc3VtZSB9IGZyb20gXCIuL3Jlc3VtZVwiO1xuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUmVzdW1lKHVzZXIpIHtcbiAgICBjb25zdCByZXN1bWVEaXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdlbmVyYXRlZC1yZXN1bWVcIik7XG4gICAgaWYgKHJlc3VtZURpdikge1xuICAgICAgICBjb25zdCB7IG5hbWUsIGVtYWlsLCBjb3VudHJ5Q29kZSwgcGhvbmUsIGVkdWNhdGlvbnMsIHNraWxscywgd29ya0V4cGVyaWVuY2VzLCBwcm9maWxlUGljdHVyZSwgZ2l0aHViLCBsaW5rZWRpbiwgfSA9IHVzZXI7XG4gICAgICAgIHJlc3VtZURpdi5pbm5lckhUTUwgPSBSZXN1bWUobmFtZSwgZW1haWwsIGNvdW50cnlDb2RlLCBwaG9uZSwgZWR1Y2F0aW9ucywgc2tpbGxzLCB3b3JrRXhwZXJpZW5jZXMsIGdpdGh1YiwgbGlua2VkaW4sIHByb2ZpbGVQaWN0dXJlID8gcHJvZmlsZVBpY3R1cmUgOiBudWxsKTtcbiAgICB9XG4gICAgLy8gQWRkaW5nIGEgY2xpY2sgZXZlbnQgbGlzdGVuZXIgdG8gdGhlIHRvZ2dsZSBidXR0b25cbiAgICBjb25zdCB0b2dnbGVCdXR0b24gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInRvZ2dsZS1za2lsbHNcIik7XG4gICAgY29uc3Qgc2tpbGxzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2tpbGxzXCIpO1xuICAgIGNvbnN0IHdvcmtFeHBlcmllbmNlU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud29yay1leHBlcmllbmNlXCIpO1xuICAgIHRvZ2dsZUJ1dHRvbj8uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgaXNIaWRkZW4gPSBza2lsbHNTZWN0aW9uPy5zdHlsZS5kaXNwbGF5ID09PSBcIm5vbmVcIjtcbiAgICAgICAgaWYgKHNraWxsc1NlY3Rpb24gJiYgd29ya0V4cGVyaWVuY2VTZWN0aW9uKSB7XG4gICAgICAgICAgICBza2lsbHNTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBpc0hpZGRlbiA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xuICAgICAgICAgICAgd29ya0V4cGVyaWVuY2VTZWN0aW9uLnN0eWxlLmRpc3BsYXkgPSBpc0hpZGRlbiA/IFwiYmxvY2tcIiA6IFwibm9uZVwiO1xuICAgICAgICAgICAgdG9nZ2xlQnV0dG9uLmlubmVyVGV4dCA9IGlzSGlkZGVuID8gXCJTaG93IExlc3NcIiA6IFwiU2hvdyBNb3JlXCI7XG4gICAgICAgIH1cbiAgICB9KTtcbn1cbmNvbnN0IHNoYXJlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzaGVhcmFibGUtbGlua1wiKTtcbmNvbnN0IGRvd25sb2FkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNnZW5lcmF0ZS1wZGZcIik7XG5pZiAoc2hhcmVCdG4pIHtcbiAgICBzaGFyZUJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBzaGFyZUxpbmsoKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIHNoYXJlQnRuLmlubmVyVGV4dCA9IFwiTGluayBDb3BpZWRcIjtcbiAgICAgICAgICAgIHNoYXJlQnRuLmRpc2FibGVkID0gdHJ1ZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59XG5pZiAoZG93bmxvYWRCdG4pIHtcbiAgICBkb3dubG9hZEJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4gZG93bmxvYWRQREYoKSk7XG59XG5jb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xubGV0IHVzZXIgPSB7fTtcbnBhcmFtcy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgdXNlcltrZXldID1cbiAgICAgICAga2V5ID09PSBcIndvcmtFeHBlcmllbmNlc1wiIHx8IGtleSA9PT0gXCJlZHVjYXRpb25zXCJcbiAgICAgICAgICAgID8gdmFsdWUuc3BsaXQoXCIsXCIpIC8vIGNvbnZlcnRpbmcgdGhlIGVkdWNhdGlvbnMgJiB3b3JrZXhwZXJpZW5jZXMgZnJvbSBzdHJpbmcgaW50byBhcnJheVxuICAgICAgICAgICAgOiB2YWx1ZTtcbn0pO1xuYnVpbGRSZXN1bWUodXNlcik7IC8vIHByb3ZpZGluZyB0aGUgaW5mb3JtYXRpb24gdG8gYnVpbGQgcmVzdW1lXG4iLCJpbXBvcnQgeyBwcm9jZXNzSW5wdXQgfSBmcm9tIFwiLi4vdXRpbHMvaW5wdXRVdGlsc1wiO1xuZXhwb3J0IGZ1bmN0aW9uIFJlc3VtZShuYW1lLCBlbWFpbCwgY291bnRyeUNvZGUsIHBob25lLCBlZHVjYXRpb25zLCBza2lsbHMsIHdvcmtFeHBlcmllbmNlcywgZ2l0aHViLCBsaW5rZWRpbiwgcHJvZmlsZVBpY3R1cmUpIHtcbiAgICByZXR1cm4gYFxyXG4gICAgPHNlY3Rpb24gY2xhc3M9XCJwZXJzb25hbC1pbmZvXCI+XHJcbiAgICAgICAgPGZpZ3VyZT5cclxuICAgICAgICAgICAgPGltZ1xyXG4gICAgICAgICAgICAgICAgcmVmZXJyZXJwb2xpY3k9XCJub3JlZmVycmVyXCJcclxuICAgICAgICAgICAgICAgIHNyYz0ke3Byb2ZpbGVQaWN0dXJlXG4gICAgICAgID8gcHJvZmlsZVBpY3R1cmVcbiAgICAgICAgOiBcIi4uLy4uL3B1YmxpYy9hc3NldHMvaW1hZ2VzL2RlZmF1bHQtcGljdHVyZS5qcGdcIn1cclxuICAgICAgICAgICAgICAgIGFsdD1cIlByb2ZpbGUgUGljdHVyZVwiXHJcbiAgICAgICAgICAgICAgICB3aWR0aD1cIjE0MFwiXHJcbiAgICAgICAgICAgICAgICBoZWlnaHQ9XCIxNzBcIlxyXG4gICAgICAgICAgICAgICAgY3Jvc3NvcmlnaW49XCJhbm9ueW1vdXNcIlxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgICA8ZmlnY2FwdGlvbj48aDEgZGF0YS1lZGl0YWJsZT1cIm5hbWVcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+JHtuYW1lfTwvaDE+PC9maWdjYXB0aW9uPlxyXG4gICAgICAgIDwvZmlndXJlPlxyXG5cclxuICAgICAgICA8ZGl2IGlkPVwiY29udGFjdC1kZXRhaWxzXCI+XHJcbiAgICAgICAgICAgIDxwIGlkPVwiZW1haWxcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCJtYWlsdG86JHtlbWFpbH1cIiB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCI+PGkgY2xhc3M9XCJieCBieHMtZW52ZWxvcGVcIj48L2k+IGVtYWlsPC9hPlxyXG4gICAgICAgICAgICA8L3A+XHJcblxyXG4gICAgICAgICAgICA8cCBpZD1cImdpdGh1YlwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7Z2l0aHVifVwiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIj48aSBjbGFzcz1cImJ4IGJ4bC1naXRodWJcIj48L2k+IGdpdGh1YjwvYT5cclxuICAgICAgICAgICAgPC9wPlxyXG5cclxuICAgICAgICAgICAgPHAgaWQ9XCJsaW5rZWRpblwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIiR7bGlua2VkaW59XCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPjxpIGNsYXNzPVwiYnggYnhsLWxpbmtlZGluLXNxdWFyZVwiPjwvaT4gbGlua2VkaW48L2E+XHJcbiAgICAgICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgICAgIDxwIGlkPVwibnVtYmVyXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXIgbm9yZWZlcnJlclwiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cInRlbDoke3Byb2Nlc3NJbnB1dChcInBob25lXCIsIHBob25lLCBjb3VudHJ5Q29kZSl9XCI+JHtwcm9jZXNzSW5wdXQoXCJwaG9uZVwiLCBwaG9uZSwgY291bnRyeUNvZGUpfSA8aSBjbGFzcz1cImJ4IGJ4cy1waG9uZVwiPjwvaT48L2E+XHJcbiAgICAgICAgICAgIDwvcD5cclxuXHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwiZWR1Y2F0aW9uXCI+XHJcbiAgICAgICAgPGgyPkVkdWNhdGlvbjwvaDI+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAke2VkdWNhdGlvbnNcbiAgICAgICAgLmZpbHRlcigoZWR1Y2F0aW9uKSA9PiBlZHVjYXRpb24gIT09IFwiXCIpXG4gICAgICAgIC5tYXAoKGVkdWNhdGlvbikgPT4gYDxsaSBkYXRhLWVkaXRhYmxlPVwiZWR1Y2F0aW9uXCIgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiPiR7ZWR1Y2F0aW9ufTwvbGk+YClcbiAgICAgICAgLmpvaW4oXCJcIil9XHJcbiAgICAgICAgPC91bD5cclxuICAgIDwvc2VjdGlvbj5cclxuXHJcbiAgICA8c2VjdGlvbiBjbGFzcz1cInNraWxsc1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZVwiPlxyXG4gICAgICAgIDxoMj5Ta2lsbHM8L2gyPlxyXG4gICAgICAgIDx1bD5cclxuICAgICAgICAgICAgJHtwcm9jZXNzSW5wdXQoXCJza2lsbHNcIiwgc2tpbGxzKVxuICAgICAgICAubWFwKChza2lsbCkgPT4gYDxsaSBkYXRhLWVkaXRhYmxlPVwic2tpbGxzXCIgY29udGVudGVkaXRhYmxlPVwidHJ1ZVwiPiR7c2tpbGx9PC9saT5gKVxuICAgICAgICAuam9pbihcIlwiKX1cclxuICAgICAgICA8L3VsPlxyXG4gICAgPC9zZWN0aW9uPlxyXG5cclxuICAgIDxzZWN0aW9uIGNsYXNzPVwid29yay1leHBlcmllbmNlXCIgc3R5bGU9XCJkaXNwbGF5OiBub25lXCI+XHJcbiAgICAgICAgPGgyPldvcmsgRXhwZXJpZW5jZTwvaDI+XHJcbiAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICAke3dvcmtFeHBlcmllbmNlc1xuICAgICAgICAuZmlsdGVyKCh3b3JrRXhwZXJpZW5jZSkgPT4gd29ya0V4cGVyaWVuY2UgIT09IFwiXCIpXG4gICAgICAgIC5tYXAoKHdvcmtFeHBlcmllbmNlKSA9PiBgPGxpIGRhdGEtZWRpdGFibGU9XCJ3b3JrLWV4cGVyaWVuY2VcIiBjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCI+JHt3b3JrRXhwZXJpZW5jZX08L2xpPmApXG4gICAgICAgIC5qb2luKFwiXCIpfVxyXG4gICAgICAgIDwvdWw+XHJcbiAgICA8L3NlY3Rpb24+XHJcblxyXG4gICAgPGJ1dHRvbiBpZD1cInRvZ2dsZS1za2lsbHNcIj5TaG93IE1vcmU8L2J1dHRvbj5cclxuICAgIGA7XG59XG4iLCJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBnZXRCYXNlNjQoZmlsZSkge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICAgICAgICByZWFkZXIub25sb2FkID0gKCkgPT4gcmVzb2x2ZShyZWFkZXIucmVzdWx0KTtcbiAgICAgICAgcmVhZGVyLm9uZXJyb3IgPSAoZXJyb3IpID0+IHJlamVjdChlcnJvcik7XG4gICAgfSk7XG59XG4iLCIvLyB0eXBlIFJldHVyblR5cGU8VD4gPSBUIGV4dGVuZHMgXCJhbGxcIiA/IHN0cmluZ1tdIDogc3RyaW5nO1xuLy8gZXhwb3J0IGZ1bmN0aW9uIGdldEFuZERlbFByb3A8XG4vLyBcdEYgZXh0ZW5kcyBGb3JtRGF0YSxcbi8vIFx0UCBleHRlbmRzIHN0cmluZyxcbi8vIFx0TSBleHRlbmRzIFwiYWxsXCIgfCBcInNpbmdsZVwiXG4vLyA+KGZvcm1EYXRhOiBGLCBwcm9wTmFtZTogUCwgZ2V0TWV0aG9kOiBNKTogUmV0dXJuVHlwZTxNPiB7XG4vLyBcdGxldCB2YWx1ZSA9XG4vLyBcdFx0Z2V0TWV0aG9kID09PSBcImFsbFwiXG4vLyBcdFx0XHQ/IGZvcm1EYXRhLmdldEFsbChwcm9wTmFtZSlcbi8vIFx0XHRcdDogZm9ybURhdGEuZ2V0KHByb3BOYW1lKTtcbi8vIFx0Zm9ybURhdGEuZGVsZXRlKHByb3BOYW1lKTtcbi8vIFx0cmV0dXJuIHZhbHVlIGFzIGFueTtcbi8vIH1cbi8vIGV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIHVwbG9hZEltYWdlKFxuLy8gXHRpbWFnZUJhc2U2NDogc3RyaW5nXG4vLyApOiBQcm9taXNlPHN0cmluZyB8IHVuZGVmaW5lZD4ge1xuLy8gXHRjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFwiaHR0cHM6Ly9hcGkuaW1ndXIuY29tLzMvaW1hZ2VcIiwge1xuLy8gXHRcdG1ldGhvZDogXCJwb3N0XCIsXG4vLyBcdFx0aGVhZGVyczoge1xuLy8gXHRcdFx0QXV0aG9yaXphdGlvbjogXCJDbGllbnQtSUQgODY0MjgwZmJkNzE1Y2Y1XCIsXG4vLyBcdFx0fSxcbi8vIFx0XHRib2R5OiBKU09OLnN0cmluZ2lmeSh7IGltYWdlOiBpbWFnZUJhc2U2NCwgdHlwZTogXCJiYXNlNjRcIiB9KSxcbi8vIFx0fSk7XG4vLyBcdGNvbnN0IGRhdGEgPSBhd2FpdCByZXNwb25zZS5qc29uKCk7XG4vLyBcdGNvbnN0IGxpbmsgPSBkYXRhLmRhdGEubGluazsgLy8gVGhlIFVSTCBvZiB0aGUgdXBsb2FkZWQgaW1hZ2Vcbi8vIFx0Y29uc29sZS5sb2cobGluayk7XG4vLyBcdHJldHVybiBsaW5rO1xuLy8gfVxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkSW1hZ2UoaW1hZ2VCYXNlNjQpIHtcbiAgICBjb25zdCBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICAgIGZvcm1EYXRhLmFwcGVuZChcImltYWdlXCIsIGltYWdlQmFzZTY0KTsgLy8gVXNlICdpbWFnZScgYXMgdGhlIGtleVxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXCJodHRwczovL2FwaS5pbWd1ci5jb20vMy9pbWFnZVwiLCB7XG4gICAgICAgIG1ldGhvZDogXCJwb3N0XCIsXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAgIEF1dGhvcml6YXRpb246IFwiQ2xpZW50LUlEIDg2NDI4MGZiZDcxNWNmNVwiLFxuICAgICAgICB9LFxuICAgICAgICBib2R5OiBmb3JtRGF0YSxcbiAgICB9KTtcbiAgICBpZiAoIXJlc3BvbnNlLm9rKSB7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IoXCJJbWFnZSB1cGxvYWQgZmFpbGVkOlwiLCByZXNwb25zZS5zdGF0dXNUZXh0KTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICBjb25zdCBsaW5rID0gZGF0YS5kYXRhLmxpbms7IC8vIFRoZSBVUkwgb2YgdGhlIHVwbG9hZGVkIGltYWdlXG4gICAgY29uc29sZS5sb2cobGluayk7XG4gICAgcmV0dXJuIGxpbms7XG59XG4iLCIvLyBJbXBsZW1lbnRhdGlvblxuZXhwb3J0IGZ1bmN0aW9uIHByb2Nlc3NJbnB1dCh0eXBlLCBpbnB1dCwgY29udHJ5Q29kZSkge1xuICAgIGlmICh0eXBlID09PSBcInNraWxsc1wiKSB7XG4gICAgICAgIC8vIFByb2Nlc3Mgc2tpbGxzIGlucHV0XG4gICAgICAgIGNvbnN0IGNsZWFuZWRTdHIgPSBpbnB1dC5yZXBsYWNlKC9bLDtdKy9nLCBcIixcIik7XG4gICAgICAgIGNvbnN0IHNraWxscyA9IGNsZWFuZWRTdHJcbiAgICAgICAgICAgIC5zcGxpdChcIixcIilcbiAgICAgICAgICAgIC5tYXAoKHNraWxsKSA9PiBza2lsbC50cmltKCkpXG4gICAgICAgICAgICAuZmlsdGVyKChza2lsbCkgPT4gc2tpbGwubGVuZ3RoID4gMCk7XG4gICAgICAgIHJldHVybiBza2lsbHM7XG4gICAgfVxuICAgIGVsc2Uge1xuICAgICAgICAvLyBQcm9jZXNzIHBob25lIGlucHV0XG4gICAgICAgIGNvbnN0IGNsZWFuZWRTdHIgPSBjb250cnlDb2RlICsgaW5wdXQucmVwbGFjZSgvXFxEKy9nLCBcIjBcIik7XG4gICAgICAgIHJldHVybiBjbGVhbmVkU3RyO1xuICAgIH1cbn1cbiIsImV4cG9ydCBhc3luYyBmdW5jdGlvbiBzaGFyZUxpbmsoKSB7XG4gICAgY29uc3QgbGluayA9IHdpbmRvdy5sb2NhdGlvbi5ocmVmO1xuICAgIHJldHVybiBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChsaW5rKTtcbn1cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkb3dubG9hZFBERigpIHtcbiAgICB3aW5kb3cucHJpbnQoKTtcbn1cbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IFwiLi9yZXN1bWVcIjtcbmltcG9ydCBcIi4uL3V0aWxzL2lucHV0VXRpbHNcIjtcbmltcG9ydCBcIi4uL3V0aWxzL3NoYXJlVXRpbHNcIjtcbmltcG9ydCBcIi4vYnVpbGQtcmVzdW1lXCI7XG5pbXBvcnQgZ2V0QmFzZTY0IGZyb20gXCIuLi91dGlscy9lbmNvZGVQaWN0dXJlXCI7XG5pbXBvcnQgdXBsb2FkSW1hZ2UgZnJvbSBcIi4uL3V0aWxzL2Zvcm1VdGlsc1wiO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xuICAgIGNvbnN0IGFuY2hvcnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmFkZFRleHRBcmVhXCIpO1xuICAgIGFuY2hvcnMuZm9yRWFjaCgoYSkgPT4ge1xuICAgICAgICBhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZXZlbnQpID0+IHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXIgPSBhLnBhcmVudEVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zdCBhcmVhID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInRleHRhcmVhXCIpO1xuICAgICAgICAgICAgYXJlYS5uYW1lID0gY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoXCJ0ZXh0YXJlYVwiKS5uYW1lO1xuICAgICAgICAgICAgYXJlYS5zZXRBdHRyaWJ1dGUoXCJjb250ZW50ZWRpdGFibGVcIiwgXCJ0cnVlXCIpO1xuICAgICAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFyZWEpO1xuICAgICAgICB9KTtcbiAgICB9KTtcbn0pO1xuZG9jdW1lbnRcbiAgICAuZ2V0RWxlbWVudEJ5SWQoXCJyZXN1bWUtZm9ybVwiKVxuICAgID8uYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBhc3luYyAoZXZlbnQpID0+IHtcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKGV2ZW50LnRhcmdldCk7XG4gICAgLy8gaW1hZ2UgbG9naWMgY2h1bmsgc3RhcnRzIGhlcmUhXG4gICAgY29uc3QgcHJvZmlsZVBpY3R1cmVGaWxlID0gZm9ybURhdGEuZ2V0KFwicHJvZmlsZS1waWN0dXJlXCIpO1xuICAgIGNvbnN0IHByb2ZpbGVQaWN0dXJlQmFzZTY0ID0gcHJvZmlsZVBpY3R1cmVGaWxlLnNpemUgPiAwXG4gICAgICAgID8gKGF3YWl0IGdldEJhc2U2NChwcm9maWxlUGljdHVyZUZpbGUpKS5zcGxpdChcIixcIilbMV1cbiAgICAgICAgOiBudWxsO1xuICAgIGNvbnN0IGltYWdlVXJsID0gKHByb2ZpbGVQaWN0dXJlQmFzZTY0ICYmXG4gICAgICAgIChhd2FpdCB1cGxvYWRJbWFnZShwcm9maWxlUGljdHVyZUJhc2U2NCkpKSA/P1xuICAgICAgICBcIlwiO1xuICAgIC8vIGltYWdlIGxvZ2ljIGNodW5rIGVuZHMgaGVyZSFcbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgICBuYW1lOiBmb3JtRGF0YS5nZXQoXCJuYW1lXCIpLFxuICAgICAgICBlbWFpbDogZm9ybURhdGEuZ2V0KFwiZW1haWxcIiksXG4gICAgICAgIGNvdW50cnlDb2RlOiBmb3JtRGF0YS5nZXQoXCJjb3VudHJ5LWNvZGVcIiksXG4gICAgICAgIHBob25lOiBmb3JtRGF0YS5nZXQoXCJwaG9uZVwiKSxcbiAgICAgICAgZ2l0aHViOiBmb3JtRGF0YS5nZXQoXCJnaXRodWJcIiksXG4gICAgICAgIGxpbmtlZGluOiBmb3JtRGF0YS5nZXQoXCJsaW5rZWRpblwiKSxcbiAgICAgICAgc2tpbGxzOiBmb3JtRGF0YS5nZXQoXCJza2lsbHNcIiksXG4gICAgICAgIGVkdWNhdGlvbnM6IGZvcm1EYXRhLmdldEFsbChcImVkdWNhdGlvblwiKSxcbiAgICAgICAgd29ya0V4cGVyaWVuY2VzOiBmb3JtRGF0YS5nZXRBbGwoXCJ3b3JrLWV4cGVyaWVuY2VcIiksXG4gICAgICAgIHByb2ZpbGVQaWN0dXJlOiBpbWFnZVVybCxcbiAgICB9O1xuICAgIGNvbnN0IHNlYXJjaFBhcmFtcyA9IG5ldyBVUkxTZWFyY2hQYXJhbXMoKTtcbiAgICBmb3IgKGNvbnN0IFtrZXksIHZhbHVlXSBvZiBPYmplY3QuZW50cmllcyhkYXRhKSkge1xuICAgICAgICBpZiAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgc2VhcmNoUGFyYW1zLnNldChrZXksIHZhbHVlLnRvU3RyaW5nKCkpO1xuICAgICAgICB9XG4gICAgfVxuICAgIGNvbnN0IHJlc3VtZUxpbmsgPSBgJHt3aW5kb3cubG9jYXRpb24ub3JpZ2lufS9zcmMvcGFnZXMvcmVzdW1lLmh0bWw/JHtzZWFyY2hQYXJhbXMudG9TdHJpbmcoKX1gO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzdW1lTGluaztcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9