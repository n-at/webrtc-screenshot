(() => {

    document.getElementById('btn-shot').onclick = () => {
        takeScreenshot()
            .then(url => {
                window.openImageEditor(url);
            })
            .catch(error => {
                alert(error)
            });
    };

    function takeScreenshot() {
        return new Promise((resolve, error) => {
            navigator.mediaDevices.getDisplayMedia({video:true})
                .then(mediaStream => {
                    const canvas = document.createElement('canvas');
                    const video = document.createElement('video');
                    video.srcObject = mediaStream;
                    video.addEventListener('canplay', () => {
                        video.setAttribute('width', video.videoWidth);
                        video.setAttribute('height', video.videoHeight);
                        canvas.setAttribute('width', video.videoWidth);
                        canvas.setAttribute('height', video.videoHeight);

                        const context = canvas.getContext('2d');
                        context.drawImage(video, 0, 0, canvas.width, canvas.height);

                        resolve(canvas.toDataURL('image/png'));

                        for (let track of mediaStream.getTracks()) {
                            track.stop();
                        }
                        video.pause();
                        video.remove();
                        canvas.remove();
                    });
                    video.play();
                })
                .catch(error);
        });
    }

})();
