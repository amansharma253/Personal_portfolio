// Dark Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleButton.textContent = body.classList.contains('dark-mode')
        ? 'Toggle Light Mode'
        : 'Toggle Dark Mode';
});

// Smooth Scroll for Navigation
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const sectionId = this.getAttribute('href');
        document.querySelector(sectionId).scrollIntoView({ behavior: 'smooth' });
    });
});

// Project Filter
const filterInput = document.getElementById('project-filter');
const projects = document.querySelectorAll('.project');

filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    projects.forEach(project => {
        const category = project.getAttribute('data-category').toLowerCase();
        const title = project.querySelector('h3').textContent.toLowerCase();
        const description = project.querySelector('p').textContent.toLowerCase();
        if (category.includes(filterValue) || title.includes(filterValue) || description.includes(filterValue)) {
            project.style.display = 'block';
        } else {
            project.style.display = 'none';
        }
    });
});