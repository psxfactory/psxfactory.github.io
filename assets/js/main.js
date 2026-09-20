const toggleBtn = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const savedTheme = localStorage.getItem('theme');
if (savedTheme) { htmlElement.setAttribute('data-theme', savedTheme); updateButtonText(savedTheme); }
toggleBtn.addEventListener('click', () => {
    const newTheme = htmlElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme); updateButtonText(newTheme);
});
function updateButtonText(theme) { toggleBtn.textContent = theme === 'dark' ? 'THEME // LIGHT' : 'THEME // DARK'; }

const retroContactForm = document.getElementById('retroContactForm');
const successState = document.getElementById('successState');
if(retroContactForm) {
    const submitBtn = retroContactForm.querySelector('.btn-submit');
    retroContactForm.addEventListener('submit', (e) => {
        e.preventDefault(); submitBtn.textContent = 'TRANSMITTING...'; submitBtn.disabled = true;
        setTimeout(() => { retroContactForm.classList.add('hidden'); successState.classList.add('active'); }, 800); 
    });
}

const lazySections = document.querySelectorAll('.lazy-section');
const observerOptions = { rootMargin: '0px 0px -50px 0px', threshold: 0.1 };
const sectionObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
}, observerOptions);
lazySections.forEach(section => sectionObserver.observe(section));

const modal = document.getElementById('productModal');
const closeBtn = document.getElementById('closeModalBtn');
const productCards = document.querySelectorAll('.grid-container .card');
const curModal = "$";

productCards.forEach(card => {
    card.addEventListener('click', () => {
        const title = card.querySelector('.card-title') ? card.querySelector('.card-title').innerText : '';
        const desc = card.querySelector('.card-desc') ? card.querySelector('.card-desc').innerText : '';
        const tagsHtml = card.querySelector('.category-tags') ? card.querySelector('.category-tags').innerHTML : '';
        const formatsHtml = card.querySelector('.formats') ? card.querySelector('.formats').innerHTML : '';
        
        const rawPrice = card.getAttribute('data-price');
        const rawOldPrice = card.getAttribute('data-old-price');
        
        let mPriceHtml = '<div class="price-tag">' + (curModal ? curModal : '') + rawPrice + '</div>';
        if(rawOldPrice) {
            mPriceHtml = '<div class="price-tag"><span class="old-price">' + (curModal ? curModal : '') + rawOldPrice + '</span><span class="sale">' + (curModal ? curModal : '') + rawPrice + '</span></div>';
        }

        const imgElement = card.querySelector('.card-img-wrapper img');
        const cardThumbSrc = imgElement.src;
        const modalImgSrc = imgElement.getAttribute('data-modal-img') || imgElement.src;

        let badgesHtml = '';
        card.querySelectorAll('.status-badge, .type-badge').forEach(b => {
            const clone = b.cloneNode(true);
            clone.style.cssText = 'position:relative; top:auto; right:auto; left:auto; transform:none; box-shadow:none; border:none; display:inline-flex; align-items:center; justify-content:flex-start;';
            badgesHtml += clone.outerHTML;
        });

        const metaHiddenData = card.querySelector('.modal-meta-data');

        document.getElementById('modalHeaderTitle').innerText = title;
        document.getElementById('modalImg').src = modalImgSrc; 

        document.getElementById('modalTitle').innerText = title; 
        document.getElementById('modalPrice').innerHTML = mPriceHtml; 
        document.getElementById('modalBadges').innerHTML = badgesHtml;
        document.getElementById('modalTags').innerHTML = tagsHtml;
        document.getElementById('modalFormats').innerHTML = formatsHtml;
        document.getElementById('modalMeta').innerHTML = metaHiddenData ? metaHiddenData.innerHTML : '';

        document.getElementById('modalMarkdown').innerHTML = `
            <img src="${cardThumbSrc}" class="modal-left-thumb" alt="${title}">
            <h2>Overview</h2>
            <blockquote>${desc}</blockquote>
            <h2>Description</h2>
            <p>This authentic 32-bit asset has been meticulously crafted to ensure era-accurate topology and texture filtering. Perfect for indie developers looking to recreate the golden era of 90s 3D gaming.</p>
            <p>Whether you are building a survival horror game, a retro racer, or a nostalgic platformer, these models will snap right into your grid. <strong>No PBR, no high-poly meshes, just pure polygonal soul.</strong></p>
            <h3>Technical Details</h3><ul><li>Optimized for low draw calls and retro rendering pipelines.</li><li>Textures mapped using authentic affine mapping techniques where applicable.</li><li>Ready for modern engines (Unity, Unreal Engine, Godot) with custom retro shaders.</li></ul>
            <p><em>File structure is neat, organized, and includes all raw source files for easy modification in your preferred 3D software.</em></p>
        `;
        modal.classList.add('active');
    });
});

if(closeBtn) closeBtn.addEventListener('click', () => modal.classList.remove('active'));
if(modal) modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal && modal.classList.contains('active')) modal.classList.remove('active'); });

function setupDragToScroll(elementId) {
    const slider = document.getElementById(elementId);
    if(!slider) return;
    let isDown = false, startX, scrollLeft;
    slider.addEventListener('mousedown', (e) => { isDown = true; slider.style.scrollSnapType = 'none'; startX = e.pageX - slider.offsetLeft; scrollLeft = slider.scrollLeft; });
    slider.addEventListener('mouseleave', () => { isDown = false; slider.style.scrollSnapType = 'x mandatory'; });
    slider.addEventListener('mouseup', () => { isDown = false; slider.style.scrollSnapType = 'x mandatory'; });
    slider.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const walk = (e.pageX - slider.offsetLeft - startX) * 2; slider.scrollLeft = scrollLeft - walk; });
}
setupDragToScroll('heroTrack');
setupDragToScroll('gamesTrack');