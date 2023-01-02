async function uploadFile(file: File, filename?: string) {
    const body = new FormData();
    body.append("file", file);
    if (filename) body.append('filename', filename)
    try {
        const result = await fetch("/api/save_file", {
            method: "POST",
            body: body,
        });
        const { uploadedUrl } = await result.json();
        return uploadedUrl;
    } catch (error) {
        if (typeof error === "string") console.error("Error:", error);
    }
}

// pdf, word, ppt, img, video
export default uploadFile;