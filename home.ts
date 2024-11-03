// home.ts

// Function to show notifications
function showNotification(message: string) {
    const notificationElement = document.createElement('div');
    notificationElement.textContent = message;
    notificationElement.className = 'notification';
    document.body.appendChild(notificationElement);

    // Remove notification after 3 seconds
    setTimeout(() => {
        document.body.removeChild(notificationElement);
    }, 3000);
}

// Event listener for navigation links
const navLinks = document.querySelectorAll('.nav-links a');
navLinks.forEach(link => {
    link.addEventListener('click', (event) => {
        event.preventDefault();
        const section = link.getAttribute('href')?.substring(1); // Get the section name from href
        showNotification(`Navigating to ${section}`);
        console.log(`Navigating to section: ${section}`);

        // Optional: Scroll smoothly to the section (if it exists)
        const targetSection = document.getElementById(section!);
        if (targetSection) {
            targetSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Show a welcome notification on page load
window.addEventListener('load', () => {
    showNotification('Welcome to UTA Job Connect!');
});
