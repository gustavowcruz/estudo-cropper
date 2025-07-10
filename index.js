
document.addEventListener('DOMContentLoaded', function() {
    const imageInput = document.getElementById('image-input');
    const imagePreview = document.getElementById('image-preview');
    const cropButton = document.getElementById('crop-button');
    let cropper;

    // Quando uma imagem é selecionada
    imageInput.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = function(event) {
            imagePreview.src = event.target.result;
            
            // Destrói o cropper anterior se existir
            if (cropper) {
                cropper.destroy();
            }
            
            // Inicializa o Cropper
            cropper = new Cropper(imagePreview, {
                aspectRatio: 1, // Proporção 1:1 (quadrado)
                viewMode: 1,    // Restringe o corte à área da imagem
            });
        };
        if(cropButton.style.display === 'none'){
            cropButton.style.display = 'inline-block';
        }
        reader.readAsDataURL(file);
    });

    // Quando clica no botão de cortar
    cropButton.addEventListener('click', function() {
        // Obtém a imagem cortada
        const croppedCanvas = cropper.getCroppedCanvas();
        const croppedImageUrl = croppedCanvas.toDataURL('image/jpeg');
        
        // Destrói o cropper atual
        cropper.destroy();
        cropper = null;
        
        // Atualiza a imagem com a versão cortada
        imagePreview.src = croppedImageUrl;

         // Esconde o botão de cortar após o corte
        cropButton.style.display = 'none';
    });
});
