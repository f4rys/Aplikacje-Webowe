document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item img');
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('zoomed');
            overlay.style.display = item.classList.contains('zoomed') ? 'block' : 'none';
        });
    });

    overlay.addEventListener('click', () => {
        const zoomedImage = document.querySelector('.gallery-item img.zoomed');
        if (zoomedImage) {
            zoomedImage.classList.remove('zoomed');
            overlay.style.display = 'none';
        }
    });
});