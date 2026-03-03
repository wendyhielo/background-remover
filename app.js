const imageInput = document.getElementById('imageInput');
const removeBtn = document.getElementById('removeBtn');
const resultImage = document.getElementById('resultImage');
const downloadLink = document.getElementById('downloadLink');

removeBtn.addEventListener("click", async () => {
    const file = imageInput.files[0];

    if (!file){
        return;
    }

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch("https://background-remover-git-339846348292.us-west4.run.app/remove-bg", {
        method: "POST",
        body: formData
    });

    if (!response.ok) {
        const text = await response.text();
        console.error("API error:", response.status, text);
        alert(`API error ${response.status}: ${text}`);
        return;
      }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);

    resultImage.src = imageUrl;
    downloadLink.href = imageUrl;
    downloadLink.style.display = "inline";
});