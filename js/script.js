// Code JavaScript pour gérer l'upload et afficher les posts après l'upload
document.getElementById('uploadForm').addEventListener('submit', function(event) {
    event.preventDefault();  // Empêche l'envoi du formulaire par défaut
  
    const formData = new FormData(this);  // Créer un objet FormData avec les données du formulaire
  
    fetch('php/upload.php', {
      method: 'POST',
      body: formData
    })
    .then(response => response.text())  // Recevoir la réponse du serveur
    .then(data => {
      console.log(data);  // Affiche le message du serveur
      loadPosts();  // Recharge les posts après l'upload
    })
    .catch(error => console.error('Erreur lors de l\'upload:', error));
  });
  
  // Fonction pour afficher les vidéos/photos depuis le serveur
  function loadPosts() {
    fetch('php/get_posts.php')
      .then(response => response.json())
      .then(posts => {
        const videoFeed = document.getElementById('videoFeed');
        videoFeed.innerHTML = '';  // Efface les posts précédents
  
        posts.forEach(post => {
          const card = document.createElement('div');
          card.classList.add('video-card');
  
          // Affichage des fichiers (images ou vidéos)
          if (post.type.startsWith('image')) {
            const img = document.createElement('img');
            img.src = post.path;
            card.appendChild(img);
          } else if (post.type.startsWith('video')) {
            const video = document.createElement('video');
            video.src = post.path;
            video.controls = true;
            card.appendChild(video);
          }
  
          // Ajouter l'événement click pour la page de détail
          card.addEventListener('click', () => {
            window.location.href = 'video.html?id=' + post.id;
          });
  
          videoFeed.appendChild(card);
        });
      });
  }
  