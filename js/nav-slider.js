document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav'),
        navList = nav.querySelectorAll('li'),
        allSection = document.querySelectorAll('.section'),
        aside = document.querySelector('.aside'),
        navTogglerBtn = document.querySelector('.nav-toggler');
    let sectionHistory = [];

    function init() {
        let currentHash = location.hash ? location.hash.split('#')[1] : 'home';
        activateSection(currentHash);
    }

    function manageBackSection() {
        allSection.forEach(section => section.classList.remove('back-section'));
        if (sectionHistory.length > 1) {
            const lastSectionId = sectionHistory[sectionHistory.length - 2];
            document.getElementById(lastSectionId).classList.add('back-section');
        }
    }

    function showSection(targetId) {
        allSection.forEach(section => section.classList.remove('active'));
        const targetSection = document.getElementById(targetId);
        targetSection.classList.add('active');
        updateHistory(targetId);
        aside.classList.remove('open');
        navTogglerBtn.classList.remove('open');
    }

    function updateHistory(targetId) {
        if (sectionHistory[sectionHistory.length - 1] !== targetId) {
            sectionHistory.push(targetId);
        }
        manageBackSection();
    }

    function updateNav(targetId) {
        navList.forEach(item => {
            const a = item.querySelector('a');
            a.classList.remove('active');
            if (a.getAttribute('href').includes(targetId)) {
                a.classList.add('active');
            }
        });
    }

    function activateSection(targetId) {
        updateNav(targetId);
        showSection(targetId);
    }

    navList.forEach(item => {
        item.querySelector('a').addEventListener('click', function () {
            const targetId = this.getAttribute('href').split('#')[1];
            activateSection(targetId);
        });
    });

    navTogglerBtn.addEventListener('click', () => {
        aside.classList.toggle('open');
        navTogglerBtn.classList.toggle('open');
    });

    window.addEventListener('hashchange', function() {
        let currentHash = location.hash ? location.hash.split('#')[1] : 'home';
        activateSection(currentHash);
    });

    init();
});
