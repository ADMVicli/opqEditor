const imageInput = document.getElementById('imageInput');
const opacitySlider = document.getElementById('opacitySlider');
const downloadButton = document.getElementById('downloadButton');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let uploadedImage;
let opacity = 1;

imageInput.addEventListener('change', handleImageUpload);
opacitySlider.addEventListener('input', handleOpacityChange);
downloadButton.addEventListener('click', downloadImage);

function handleImageUpload(event) {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = function () {
        const img = new Image();
        img.src = reader.result;

        img.onload = function () {
            uploadedImage = img;
            drawCanvas();
        };
    };

    reader.readAsDataURL(file);
}

function handleOpacityChange(event) {
    opacity = parseFloat(event.target.value);
    drawCanvas();
}

function drawCanvas() {
    canvas.width = uploadedImage.width;
    canvas.height = uploadedImage.height;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.globalAlpha = 1;
    ctx.drawImage(uploadedImage, 0, 0);

    ctx.globalAlpha = opacity;
    const background = new Image();
    background.src = 'fundo.png';
    background.onload = function () {
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
    };
}

function downloadImage() {
    const imageToDownload = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageToDownload;
    link.download = 'icon-OPQ.png';
    link.click();
}
