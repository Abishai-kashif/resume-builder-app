export async function shareLink() {
	const link = window.location.href;

	return await navigator.clipboard.writeText(link);
}

export async function downloadPDF() {
	window.print();
}
