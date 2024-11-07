// Function overloads
export function processInput(type: "skills", input: string): string[];
export function processInput(
	type: "phone",
	input: string,
	contryCode: string
): string;
// Implementation
export function processInput(
	type: "skills" | "phone",
	input: string,
	contryCode?: string
): string[] | string {
	if (type === "skills") {
		// Process skills input
		const cleanedStr = input.replace(/[,;]+/g, ",");
		const skills = cleanedStr
			.split(",")
			.map((skill) => skill.trim())
			.filter((skill) => skill.length > 0);

		return skills;
	} else {
		// Process phone input
		const cleanedStr = contryCode + input.replace(/\D+/g, "0");

		return cleanedStr;
	}
}
