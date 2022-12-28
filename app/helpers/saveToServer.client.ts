export default async (file: File) => {
    const body = new FormData();
    body.append("file", file);
    await fetch("/api/save_file", {
        method: "POST",
        body: body,
    })
        .then((res) => {
            if (!res.ok) throw new Error("Network reponse was not ok.");
        })
        .catch((err) => console.log(err));
};

