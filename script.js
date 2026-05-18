function resizeImage() {

    const fileInput = document.getElementById("upload");
    const width = parseInt(document.getElementById("width").value);
    const height = parseInt(document.getElementById("height").value);

    const file = fileInput.files[0];

    if(!file){
        alert("Upload an image first");
        return;
    }

    const reader = new FileReader();

    reader.onload = function(event){

        const img = new Image();

        img.onload = function(){

            const canvas = document.getElementById("canvas");
            const ctx = canvas.getContext("2d");

            canvas.width = width;
            canvas.height = height;

            ctx.drawImage(img, 0, 0, width, height);

            const downloadBtn = document.getElementById("downloadBtn");

            downloadBtn.href = canvas.toDataURL("image/png");
            downloadBtn.download = "resized-image.png";
            downloadBtn.innerText = "Download";
            downloadBtn.style.display = "inline";
        }

        img.src = event.target.result;
    }

    reader.readAsDataURL(file);
}
