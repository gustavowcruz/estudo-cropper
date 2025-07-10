
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
        reader.readAsDataURL(file);
    });

    // Quando clica no botão de cortar
    cropButton.addEventListener('click', function() {
        if (!cropper) {
            alert('Selecione uma imagem primeiro!');
            return;
        }

        // Obtém a imagem cortada como Blob
        cropper.getCroppedCanvas().toBlob(function(blob) {
            // Cria um FormData para enviar ao servidor
            const formData = new FormData();
            formData.append('cropped_image', blob, 'imagem_cortada.jpg');

            // Envia via Fetch API
            fetch('upload.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Imagem enviada com sucesso! URL: ' + data.url);
                } else {
                    alert('Erro: ' + data.error);
                }
            })
            .catch(error => {
                alert('Erro no upload: ' + error);
            });
        }, 'image/jpeg', 0.9); // Qualidade 90%
    });
});
