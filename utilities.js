

function clickOMatic() {
    alert('Hello');
}

const click = document.getElementById('click');
click.addEventListener('click', clickOMatic);

const themeToggle = document.getElementById('theme-toggle');
const themes = {
    dark: {
        background: '#050505',
        text: '#FFD60A',
        secondaryBackground: '#464646',
        accentShadow: 'rgba(255, 214, 10, .65)',
        colorScheme: 'dark'
    },
    light: {
        background: '#F8F9FA',
        text: '#004B23',
        secondaryBackground: '#CED4DA',
        accentShadow: 'rgba(0, 75, 35, .65)',
        colorScheme: 'light'
    }
};

function applyTheme(theme) {
    const palette = themes[theme];
    const root = document.documentElement;
    root.style.setProperty('--primary-bg', palette.background);
    root.style.setProperty('--primary-text', palette.text);
    root.style.setProperty('--secondary-text', palette.text);
    root.style.setProperty('--highlight', palette.background);
    root.style.setProperty('--secondary-bg', palette.secondaryBackground);
    root.style.setProperty('--accent-shadow', palette.accentShadow);
    root.style.setProperty('color-scheme', palette.colorScheme);
    document.body.dataset.theme = theme;
    document.querySelectorAll('nav, #projects article').forEach((element) => {
        element.style.boxShadow = theme === 'light'
            ? '0 5px 12px 3px rgba(0, 75, 35, .65)'
            : '';
    });
    themeToggle.textContent = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    themeToggle.setAttribute('aria-pressed', String(theme === 'light'));
}

themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
});

function initializeScrollReveal() {
    if (typeof window.ScrollReveal !== 'function') {
        console.warn('ScrollReveal did not load; reveal animations are disabled.');
        return;
    }

    window.ScrollReveal().reveal('#logo, #portfolio h1, #about, #projects article, #contact', {
        delay: 150,
        distance: '18px',
        duration: 650,
        interval: 100,
        origin: 'bottom'
    });
}

const scrollRevealScript = document.getElementById('scroll-reveal');
if (typeof window.ScrollReveal === 'function') {
    initializeScrollReveal();
} else if (scrollRevealScript) {
    scrollRevealScript.addEventListener('load', initializeScrollReveal, { once: true });
    scrollRevealScript.addEventListener('error', () => {
        console.warn('ScrollReveal failed to load; reveal animations are disabled.');
    }, { once: true });
} else {
    console.warn('ScrollReveal script is missing; reveal animations are disabled.');
}
