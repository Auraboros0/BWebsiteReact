const API = import.meta.env.VITE_API_URL;
const uploadVideo = async (file: File, user: string, pass: string) => {
    const formData = new FormData();
    formData.append("video", file);
    formData.append("user", user);
    formData.append("pass", pass);

    const response = await fetch(`${API}/upload`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    console.log(data);
};

function MediaUploadForm() {
    return (
        <input
            type="file"
            accept="video/*"
            onChange={(e) => {
                const file = e.target.files?.[0];

                if (file) {
                    uploadVideo(file);
                }
            }}
        />
    )
}

export default MediaUploadForm;