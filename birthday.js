const scenes = [...document.querySelectorAll('.scene')];
const progressBar = document.querySelector('.progress-bar');
const stepCount = document.querySelector('.step-count');
let currentScene = 0;

// Change this one value to personalize the secret date.
const secretPassword = '0';

const welcomeGate = document.querySelector('#welcome-gate');
const surpriseContent = document.querySelector('#surprise-content');
const welcomePassword = document.querySelector('#welcome-password');
const welcomeError = document.querySelector('#welcome-error');

document.querySelector('#welcome-form').addEventListener('submit', event => {
	event.preventDefault();
	if (welcomePassword.value.trim().toLowerCase() === secretPassword.toLowerCase()) {
		welcomeGate.classList.add('is-unlocking');
		window.setTimeout(() => {
			welcomeGate.hidden = true;
			surpriseContent.hidden = false;
			welcomeGate.classList.remove('is-unlocking');
			document.querySelector('#open-gift').focus();
		}, 450);
	} else {
		welcomeError.textContent = 'That is not it yet... try our special date ♥';
		welcomePassword.value = '';
		welcomePassword.focus();
	}
});

function showScene(nextScene) {
	scenes[currentScene].classList.remove('is-active');
	scenes[currentScene].hidden = true;
	currentScene = nextScene;
	scenes[currentScene].hidden = false;
	scenes[currentScene].classList.add('is-active');
	progressBar.style.width = `${((currentScene + 1) / scenes.length) * 100}%`;
	stepCount.textContent = `0${currentScene + 1} / 05`;
	window.scrollTo({ top: 0, behavior: 'smooth' });
}

document.querySelector('#open-gift').addEventListener('click', () => showScene(1));
document.querySelectorAll('.next-button').forEach(button => {
	button.addEventListener('click', () => showScene(currentScene + 1));
});

document.addEventListener('keydown', event => {
	if (event.key !== 'Enter' || event.defaultPrevented || event.target.closest('input, textarea, select, button, a, form')) return;
	if (!photoLightbox.hidden) return;
	const activeScene = scenes[currentScene];
	const sceneAction = activeScene.querySelector('#open-gift, .next-button, #last-thing');
	if (sceneAction) sceneAction.click();
});

document.querySelectorAll('.appreciation-card').forEach(card => {
	card.addEventListener('click', () => {
		card.classList.toggle('revealed');
		card.setAttribute('aria-expanded', card.classList.contains('revealed'));
	});
});

document.querySelectorAll('.album-item video').forEach(video => {
	video.addEventListener('play', () => {
		document.querySelectorAll('.album-item video').forEach(otherVideo => {
			if (otherVideo !== video) otherVideo.pause();
		});
	});
});

const photoLightbox = document.querySelector('#photo-lightbox');
const lightboxMedia = document.querySelector('#lightbox-media');
const lightboxClose = document.querySelector('#lightbox-close');
const lightboxPrevious = document.querySelector('#lightbox-prev');
const lightboxNext = document.querySelector('#lightbox-next');
let albumMedia = [];
let currentMediaIndex = 0;

const momentAlbumFiles = [
	'-6154685550057689087_119.jpg', '5_6055562463229779622.mp4', '5_6136292927678195019.mp4',
	'IMG_20260828_125417_629.jpg', 'IMG_20260828_125417_703.jpg', 'IMG_20260828_125417_735.jpg', 'IMG_20260828_125427_417.jpg', 'IMG_20260828_125434_321.jpg', 'IMG_20260828_125446_089.jpg', 'IMG_20260828_125446_868.jpg', 'IMG_20260828_125448_197.jpg', 'IMG_20260828_125451_551.jpg', 'IMG_20260828_125452_996.jpg', 'IMG_20260828_125455_460.jpg', 'IMG_20260828_125456_744.jpg', 'IMG_20260828_125500_364.jpg', 'IMG_20260828_125504_969.jpg', 'IMG_20260828_125506_546.jpg', 'IMG_20260828_125508_500.jpg', 'IMG_20260828_125523_680.jpg', 'IMG_20260828_125523_993.jpg', 'IMG_20260828_125524_002.jpg',
	'IMG_20260828_133950_563.jpg', 'IMG_20260828_133950_636.jpg', 'IMG_20260828_133950_935.jpg', 'IMG_20260828_133951_104.jpg', 'IMG_20260828_133951_154.jpg', 'IMG_20260828_133951_207.jpg', 'IMG_20260828_133955_469.jpg', 'IMG_20260828_134853_703.jpg', 'IMG_20260828_134854_168.jpg', 'IMG_20260828_134857_212.jpg', 'IMG_20260828_134858_100.jpg', 'IMG_20260828_134901_232.jpg', 'IMG_20260828_134905_343.jpg', 'IMG_20260828_134909_289.jpg', 'IMG_20260828_134910_852.jpg', 'IMG_20260828_134913_453.jpg', 'IMG_20260828_134915_902.jpg', 'IMG_20260828_134916_471.jpg', 'IMG_20260828_134936_592.jpg', 'IMG_20260828_134937_347.jpg', 'IMG_20260828_134938_759.jpg', 'IMG_20260828_134940_181.jpg', 'IMG_20260828_134943_959.jpg', 'IMG_20260828_134948_665.jpg', 'IMG_20260828_134948_812.jpg', 'IMG_20260828_135004_407.jpg',
	'VID_20260828_125515_333.mp4', 'VID_20260828_134551_401.mp4', 'VID_20260828_134556_083.mp4', 'VID_20260828_134606_903.mp4', 'VID_20260828_134614_552.mp4', 'VID_20260828_134619_909.mp4', 'VID_20260828_134641_397.mp4', 'VID_20260828_134903_659.mp4', 'VID_20260828_134912_209.mp4', 'VID_20260828_134918_670.mp4', 'VID_20260828_134919_811.mp4', 'VID_20260828_134923_679.mp4', 'VID_20260828_134923_846.mp4', 'VID_20260828_134942_008.mp4'
];

const momentAlbumGrid = document.querySelector('#moment-album-grid');
const momentAlbumCount = document.querySelector('#moment-album-count');
momentAlbumFiles.forEach((file, index) => {
	const item = document.createElement('figure');
	item.className = `album-item${index === 0 ? ' album-item-large' : ''}${file.endsWith('.mp4') ? ' album-video' : ''}`;
	const media = document.createElement(file.endsWith('.mp4') ? 'video' : 'img');
	media.src = `A moment I'll always remember/${file}`;
	media.alt = 'A moment I will always remember';
	media.loading = 'lazy';
	if (media.tagName === 'VIDEO') {
		media.controls = true;
		media.preload = 'metadata';
	}
	item.append(media);
	momentAlbumGrid.append(item);
});
momentAlbumCount.textContent = `${momentAlbumFiles.length} memories`;
albumMedia = [...document.querySelectorAll('.album-item img, .album-item video')];
albumMedia.forEach((media, index) => {
	if (media.tagName !== 'VIDEO') return;
	const viewButton = document.createElement('button');
	viewButton.className = 'video-view-button';
	viewButton.type = 'button';
	viewButton.setAttribute('aria-label', 'View video larger');
	viewButton.textContent = 'View';
	viewButton.addEventListener('click', event => {
		event.stopPropagation();
		showMedia(index);
	});
	media.parentElement.append(viewButton);
});
albumMedia.filter(media => media.tagName === 'VIDEO').forEach(video => {
	video.addEventListener('play', () => {
		albumMedia.filter(otherVideo => otherVideo !== video).forEach(otherVideo => otherVideo.pause());
	});
});

document.addEventListener('keydown', event => {
	if (event.key !== ' ' && event.key.toLowerCase() !== 'k') return;
	if (event.target.closest('input, textarea, select, button, a')) return;
	const focusedVideo = event.target.closest('video');
	const lightboxVideo = photoLightbox.hidden ? null : lightboxMedia.querySelector('video');
	const video = focusedVideo || lightboxVideo;
	if (!video) return;
	event.preventDefault();
	if (video.paused) video.play();
	else video.pause();
});

function closePhotoLightbox() {
	photoLightbox.hidden = true;
	lightboxMedia.replaceChildren();
}

function showMedia(index) {
	currentMediaIndex = (index + albumMedia.length) % albumMedia.length;
	const media = albumMedia[currentMediaIndex];
	const viewerMedia = media.cloneNode(false);
	viewerMedia.removeAttribute('loading');
	viewerMedia.controls = true;
	viewerMedia.setAttribute('aria-label', media.alt || 'Video memory');
	lightboxMedia.replaceChildren(viewerMedia);
	lightboxPrevious.disabled = currentMediaIndex === 0;
	lightboxNext.disabled = currentMediaIndex === albumMedia.length - 1;
	photoLightbox.hidden = false;
	lightboxClose.focus();
}

albumMedia.forEach((media, index) => media.addEventListener('click', () => showMedia(index)));
lightboxPrevious.addEventListener('click', () => showMedia(currentMediaIndex - 1));
lightboxNext.addEventListener('click', () => showMedia(currentMediaIndex + 1));

lightboxClose.addEventListener('click', closePhotoLightbox);
photoLightbox.addEventListener('click', event => {
	if (event.target === photoLightbox) closePhotoLightbox();
});
document.addEventListener('keydown', event => {
	if (photoLightbox.hidden) return;
	if (event.key === 'Escape') closePhotoLightbox();
	if (event.key === 'ArrowLeft' && currentMediaIndex > 0) showMedia(currentMediaIndex - 1);
	if (event.key === 'ArrowRight' && currentMediaIndex < albumMedia.length - 1) showMedia(currentMediaIndex + 1);
});

document.querySelector('#last-thing').addEventListener('click', () => {
	document.querySelector('#celebration').hidden = false;
});
