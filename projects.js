const projects = [
  // Exemple de projet

  {
    image: 'assets/player.jpg',
    title: 'Player Detection using AI',
    description: "Example of football player detection in a video using AI. - Made with YOLOv11 ML model",
    link: '',
    modalType: 'video',
    modalSrc: 'assets/player detection with ai.mp4'
  },
  {
    image: 'assets/dashboardvelib1.png',
    title: 'Dataviz Velib Paris',
    description: "A dataviz of the Velib (Paris's bike sharing system) usage in 2023 - Made with Tableau.",
    link: '',
    modalType: 'slideshow',
    modalSrc: [
      'assets/dashboardvelib1.png',
      'assets/dashboardvelib2.png',
    ]
  },

    {
    image: 'assets/JOdashboard1.png',
    title: 'Africa Participation in the Olympics',
    description: "A dashboard to visualize the participation of African countries in the Olympics, my first dashboard - Made with Tableau.",
    link: '',
    modalType: 'slideshow',
    modalSrc: [
      'assets/JOdashboard1.png',
      'assets/JOdashboard2.png',
      'assets/JOdashboard3.png',
    ]
  },
    
  // Ajoute d'autres projets ici
];

const projectsList = document.getElementById('projects-list');
if (projectsList) {
  projects.forEach((project, idx) => {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.innerHTML = `
      <img src="${project.image}" alt="${project.title}">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      ${!project.modalType && project.link ? `<a href="${project.link}" target="_blank">Voir le projet</a>` : ''}
    `;
    card.style.cursor = project.modalType ? 'pointer' : 'default';
    card.addEventListener('click', (e) => {
      // Si la modale existe, on l'ouvre sur tout clic (même sur le lien)
      if (project.modalType) {
        e.preventDefault();
        openModal(project);
      }
    });
    projectsList.appendChild(card);
  });
}

// Modal logic
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');
let slideshowIndex = 0;

function openModal(project) {
  if (!modal || !modalBody) return;
  modal.classList.add('open');
  if (project.modalType === 'iframe') {
    modalBody.innerHTML = `<iframe src="${project.modalSrc}" frameborder="0" allowfullscreen style="width:80vw;height:60vh;"></iframe>`;
  } else if (project.modalType === 'video') {
    modalBody.innerHTML = `<video src="${project.modalSrc}" controls style="max-width:80vw;max-height:70vh;border-radius:8px;background:#f5f5f5;"></video>`;
  } else if (project.modalType === 'slideshow' && Array.isArray(project.modalSrc)) {
    slideshowIndex = 0;
    renderSlideshow(project);
  } else {
    modalBody.innerHTML = `<img src="${project.modalSrc}" alt="${project.title}">`;
  }
}

function renderSlideshow(project) {
  if (!project.modalSrc || !Array.isArray(project.modalSrc)) return;
  const total = project.modalSrc.length;
  const imgSrc = project.modalSrc[slideshowIndex];
  modalBody.innerHTML = `
    <button id="slideshow-prev" style="font-size:2rem;margin-right:1rem;background:none;border:none;cursor:pointer;">&#8592;</button>
    <img src="${imgSrc}" alt="Slideshow image" style="max-width:70vw;max-height:60vh;border-radius:8px;background:#f5f5f5;">
    <button id="slideshow-next" style="font-size:2rem;margin-left:1rem;background:none;border:none;cursor:pointer;">&#8594;</button>
  `;
  document.getElementById('slideshow-prev').onclick = function(e) {
    e.stopPropagation();
    slideshowIndex = (slideshowIndex - 1 + total) % total;
    renderSlideshow(project);
  };
  document.getElementById('slideshow-next').onclick = function(e) {
    e.stopPropagation();
    slideshowIndex = (slideshowIndex + 1) % total;
    renderSlideshow(project);
  };
}

function closeModal() {
  if (!modal) return;
  modal.classList.remove('open');
  modalBody.innerHTML = '';
}

if (modalClose) {
  modalClose.onclick = closeModal;
}
if (modal) {
  modal.onclick = function(e) {
    if (e.target === modal) closeModal();
  };
}

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') closeModal();

}); 

