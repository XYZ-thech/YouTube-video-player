document.addEventListener('DOMContentLoaded', function () {
    const urlInput = document.getElementById('youtube-url');
    const playButton = document.getElementById('play-button');
    const videoContainer = document.getElementById('video-container');

    playButton.addEventListener('click', function () {
        const youtubeUrl = urlInput.value;
        const videoId = getYoutubeVideoId(youtubeUrl);

        if (videoId) {
          const iframe = document.createElement('iframe');
          iframe.src = `https://www.youtube.com/embed/${videoId}`;
          iframe.allowFullscreen = true;
          videoContainer.innerHTML = '';
          videoContainer.appendChild(iframe);
        } else {
           videoContainer.innerHTML = "<p>Invalid YouTube URL</p>";
        }
    });

    function getYoutubeVideoId(url) {
        try {
            const urlObj = new URL(url);
            if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
                if (urlObj.hostname.includes('youtube.com')) {
                  const searchParams = new URLSearchParams(urlObj.search);
                  return searchParams.get('v');
                } else if (urlObj.hostname.includes('youtu.be')) {
                  return urlObj.pathname.substring(1); // Remove the leading "/"
                }
             }
            return null;
        } catch (e) {
             return null;
        }
    }
});