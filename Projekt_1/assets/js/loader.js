window.addEventListener('load', function() {
    document.body.classList.remove('loading');
    document.getElementById('loading-placeholder').style.display = 'none';
    document.querySelector('header').classList.remove('hidden');
    document.querySelector('main').classList.remove('hidden');
    document.querySelector('footer').classList.remove('hidden');
});