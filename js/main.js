document.addEventListener('DOMContentLoaded', function() {
    // Load all section content when the page loads
    loadSectionContent('about');
    loadSectionContent('birthplace');
    loadSectionContent('education');
    loadSectionContent('skills');
    loadSectionContent('cv');
    
    // Add click event listeners to navigation links
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get the section id from the href attribute
            const sectionId = this.getAttribute('href').substring(1);
            
            // Hide all sections
            const sections = document.querySelectorAll('.section');
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show the selected section
            document.getElementById(sectionId).classList.add('active');
        });
    });
});

// Function to load content from separate HTML files
function loadSectionContent(sectionId) {
    const section = document.getElementById(sectionId);
    const xhr = new XMLHttpRequest();
    
    xhr.onreadystatechange = function() {
        if (this.readyState === 4) {
            if (this.status === 200) {
                section.innerHTML = this.responseText;
            } else if (this.status === 404) {
                section.innerHTML = '<p>Content not found.</p>';
            }
        }
    };
    
    xhr.open('GET', `sections/${sectionId}.html`, true);
    xhr.send();
}
