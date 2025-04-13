document.getElementById('fileUpload').addEventListener('change', function(event) {
    const files = event.target.files;
    const videoFeed = document.getElementById('videoFeed');
    const emptyMessage = document.querySelector('.empty-message');
  
    if (files.length > 0) {
      emptyMessage.style.display = 'none';
  
      Array.from(files).forEach(file => {
        const card = document.createElement('div');
        card.classList.add('video-card');
  
        if (file.type.startsWith('image/')) {
          const img = document.createElement('img');
          img.src = URL.createObjectURL(file);
          card.appendChild(img);
        } else if (file.type.startsWith('video/')) {
          const video = document.createElement('video');
          video.src = URL.createObjectURL(file);
          video.controls = true;
          card.appendChild(video);
        }
  
        // Ajout du clic pour afficher les détails
        card.addEventListener('click', () => {
          window.location.href = "video.html"; // On ira sur une page dédiée plus tard
        });
  
        videoFeed.appendChild(card);
      });
    }
  });
  