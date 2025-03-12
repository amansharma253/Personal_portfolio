// GSAP and ScrollTrigger Setup
gsap.registerPlugin(ScrollTrigger);

// Dark Mode Toggle
const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    toggleButton.innerHTML = body.classList.contains('dark-mode') ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
});

// Smooth Scroll
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({ behavior: 'smooth' });
    });
});

// Project Filter
const filterInput = document.getElementById('project-filter');
const projects = document.querySelectorAll('.project-card');

filterInput.addEventListener('input', () => {
    const filterValue = filterInput.value.toLowerCase();
    projects.forEach(project => {
        const category = project.getAttribute('data-category').toLowerCase();
        const title = project.querySelector('h3').textContent.toLowerCase();
        const desc = project.querySelector('p').textContent.toLowerCase();
        project.style.display = (category.includes(filterValue) || title.includes(filterValue) || desc.includes(filterValue)) ? 'block' : 'none';
    });
});

// Skills Progress Animation
document.querySelectorAll('.progress').forEach(bar => {
    const progress = bar.getAttribute('data-progress');
    gsap.to(bar, {
        '--progress': `${progress}%`,
        duration: 1.5,
        ease: 'power2.out',
        scrollTrigger: { trigger: bar, start: 'top 80%' }
    });
});

// EmailJS
emailjs.init("YOUR_PUBLIC_KEY_HERE");

document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    emailjs.send("YOUR_SERVICE_ID_HERE", "YOUR_TEMPLATE_ID_HERE", {
        from_name: name,
        from_email: email,
        message: message
    })
    .then(() => {
        document.getElementById('form-response').textContent = "Message Sent Successfully!";
        document.getElementById('form-response').style.color = "#00b4d8";
        gsap.fromTo('#form-response', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
        this.reset();
    })
    .catch(() => {
        document.getElementById('form-response').textContent = "Error! Please Try Again.";
        document.getElementById('form-response').style.color = "#ff2e63";
    });
});

// Back to Top
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    backToTop.style.display = window.scrollY > 300 ? 'block' : 'none';
});
backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// 3D Hero Tilt Effect
const hero3D = document.getElementById('hero-3d');
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
let renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
hero3D.appendChild(renderer.domElement);

let geometry = new THREE.PlaneGeometry(5, 3, 32);
let material = new THREE.MeshBasicMaterial({ color: 0x00b4d8, wireframe: true, transparent: true, opacity: 0.2 });
let plane = new THREE.Mesh(geometry, material);
scene.add(plane);

camera.position.z = 5;

function animate3D() {
    requestAnimationFrame(animate3D);
    renderer.render(scene, camera);
}
animate3D();

hero3D.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 0.5;
    const y = (e.clientY / window.innerHeight - 0.5) * 0.5;
    plane.rotation.x = y;
    plane.rotation.y = x;
});

// GitHub Static Stats
document.getElementById('github-stats').innerHTML = `
    <p>Public Repos: 10 (as of March 2025)</p>
    <p>Explore my work: <a href="https://github.com/amansharma253" target="_blank">github.com/amansharma253</a></p>
`;

// GSAP Animations
gsap.from('.hero-content', { opacity: 0, y: 50, duration: 1.5, ease: 'power3.out' });
gsap.utils.toArray('.animate').forEach(section => {
    gsap.from(section, {
        opacity: 0,
        y: 100,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 80%', toggleActions: 'play none none reverse' }
    });
});

gsap.from('.project-card', {
    opacity: 0,
    scale: 0.9,
    stagger: 0.2,
    duration: 1,
    ease: 'back.out(1.7)',
    scrollTrigger: { trigger: '#projects', start: 'top 80%' }
});

gsap.from('.skill-bar', {
    opacity: 0,
    x: -50,
    stagger: 0.1,
    duration: 0.8,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#skills', start: 'top 80%' }
});

gsap.from('.timeline-item', {
    opacity: 0,
    x: -100,
    stagger: 0.3,
    duration: 1,
    ease: 'power2.out',
    scrollTrigger: { trigger: '#timeline', start: 'top 80%' }
});

// Particles.js
particlesJS('particles-js', {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        color: { value: '#00b4d8' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#ff2e63', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
        modes: { repulse: { distance: 100 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Window Resize Handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});