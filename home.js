// home.ts
// Function to set up navigation behavior
function setupNavLinks(navLinks) {
    var navElement = document.querySelector('.nav-links ul');
    if (navElement) {
        navLinks.forEach(function (link) {
            var listItem = document.createElement('li');
            var anchor = document.createElement('a');
            anchor.href = link.href;
            anchor.textContent = link.label;
            anchor.addEventListener('click', function () {
                navigateToSection(link.id);
            });
            listItem.appendChild(anchor);
            navElement.appendChild(listItem);
        });
    }
}
// Function to navigate to specific sections of the homepage
function navigateToSection(sectionId) {
    var section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
    else {
        console.error("Section with id ".concat(sectionId, " not found"));
    }
}
// Function to show notifications (this is just a placeholder)
function showNotifications() {
    alert('No new notifications');
}
// Function to initialize the home page behavior
function init() {
    // Set up navigation links
    var navLinks = [
        { id: 'home', label: 'Home', href: '#home' },
        { id: 'job-postings', label: 'Job Postings', href: '#job-postings' },
        { id: 'events', label: 'Events', href: '#events' },
        { id: 'messages', label: 'Messages', href: '#messages' }
    ];
    setupNavLinks(navLinks);
    // Set up notifications click handler
    var notificationsIcon = document.querySelector('.notifications-icon');
    if (notificationsIcon) {
        notificationsIcon.addEventListener('click', showNotifications);
    }
}
// Ensure the script runs after the DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);
