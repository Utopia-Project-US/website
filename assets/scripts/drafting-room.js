(function () {
  var menuButton = document.getElementById('menu-toggle');
  var menu = document.getElementById('mobile-menu');
  if (menuButton && menu) {
    menuButton.addEventListener('click', function () {
      var isOpen = menu.classList.toggle('open');
      menuButton.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
  }

  var audio = document.getElementById('bg-audio');
  var musicButton = document.getElementById('music-toggle');
  if (audio && musicButton) {
    var trackKey = 'utopia-bg-track';
    var playingKey = 'utopia-bg-playing';
    var audioRoot = document.body.getAttribute('data-audio-root') || 'assets/audio/';
    var tracks = ['abracadabra.mp3', 'vote.mp3'];
    var storedTrack = sessionStorage.getItem(trackKey);
    var chosen = storedTrack ? storedTrack.split('/').pop() : '';
    if (!chosen) {
      chosen = tracks[Math.floor(Math.random() * tracks.length)];
      sessionStorage.setItem(trackKey, 'assets/audio/' + chosen);
    }
    audio.src = audioRoot + chosen;
    audio.loop = true;
    audio.volume = 0.35;

    function setPlayingUI(isPlaying) {
      musicButton.classList.toggle('playing', isPlaying);
      musicButton.setAttribute('aria-pressed', isPlaying ? 'true' : 'false');
      musicButton.setAttribute('aria-label', isPlaying ? 'Pause background music' : 'Play background music');
    }

    function tryPlay() {
      var playPromise = audio.play();
      if (playPromise && playPromise.then) {
        playPromise.then(function () {
          setPlayingUI(true);
          sessionStorage.setItem(playingKey, '1');
        }).catch(function () {
          setPlayingUI(false);
        });
      }
    }

    if (sessionStorage.getItem(playingKey) === '1') tryPlay();
    musicButton.addEventListener('click', function () {
      if (audio.paused) {
        tryPlay();
      } else {
        audio.pause();
        setPlayingUI(false);
        sessionStorage.setItem(playingKey, '0');
      }
    });
  }

  var updated = document.getElementById('last-updated');
  if (updated) {
    var modified = new Date(document.lastModified);
    updated.textContent = 'Last updated: ' + modified.toLocaleString('en-US', {
      timeZone: 'UTC', year: 'numeric', month: 'long', day: 'numeric',
      hour: 'numeric', minute: '2-digit', hour12: true
    }) + ' UTC';
  }
})();
