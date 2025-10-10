const imgs = document.querySelectorAll('.gallery img, .mini-gallery img');
const videos = document.querySelectorAll('.video-gallery video');
const lightbox = document.getElementById('lightbox');
const lightImg = document.createElement('img');


imgs.forEach(img=>{
    img.addEventListener('click',()=>{
        const playingVid = lightbox.querySelector('video');
        if (playingVid) playingVid.pause();
        lightbox.innerHTML='';
        lightImg.src = img.src;
        lightImg.style.maxWidth='90%';
        lightImg.style.maxHeight='90%';
        lightImg.style.borderRadius='12px';
        lightbox.appendChild(lightImg);
        lightbox.style.display='flex';
    });
});


videos.forEach(vid => {
    vid.addEventListener('click', () => {
        lightbox.innerHTML = ''; // clear old content

        const newVid = document.createElement('video');
        newVid.src = vid.currentSrc || vid.src; // ✅ ensure correct video path
        newVid.controls = true;
        newVid.muted = false; // you can keep it true if you prefer muted
        newVid.autoplay = true;
        newVid.style.maxWidth = '90%';
        newVid.style.maxHeight = '90%';
        newVid.style.borderRadius = '12px';

        lightbox.appendChild(newVid);
        lightbox.style.display = 'flex';
    });
});



lightbox.addEventListener('click',()=>{
    lightbox.style.display='none';
    lightbox.innerHTML='<video src="" controls muted></video>';
});
