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

export default async function uploadImage(
	imageBase64: string
): Promise<string | undefined> {
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
