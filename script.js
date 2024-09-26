// Wait for the DOM to fully load
document.addEventListener("DOMContentLoaded", function () {
    // Select all service categories and the controls
    const serviceCategories = document.querySelectorAll(".service-category");
    const prevButton = document.getElementById("prevPage");
    const nextButton = document.getElementById("nextPage");

    // Variables to track the current visible page
    let currentPage = 0;

    // Function to show a particular page
    function showPage(pageIndex) {
        // Hide all service categories first
        serviceCategories.forEach((category, index) => {
            if (index === pageIndex) {
                category.style.display = "block"; // Show current category
                category.style.opacity = "1"; // Fully visible
                category.style.transform = "translateX(0)"; // Centered
            } else {
                category.style.display = "none"; // Hide other categories
                category.style.opacity = "0"; // Fully transparent
                category.style.transform = "translateX(100%)"; // Move off-screen
            }
        });

        // Update the state of the navigation buttons
        prevButton.disabled = pageIndex === 0;
        nextButton.disabled = pageIndex === serviceCategories.length - 1;
    }

    // Function to smoothly flip to the next page
    function nextPage() {
        if (currentPage < serviceCategories.length - 1) {
            serviceCategories[currentPage].style.transform = "translateX(-100%)"; // Slide out to the left
            currentPage++;
            serviceCategories[currentPage].style.transform = "translateX(0)"; // Slide in from the right
            showPage(currentPage);
        }
    }

    // Function to smoothly flip to the previous page
    function prevPage() {
        if (currentPage > 0) {
            serviceCategories[currentPage].style.transform = "translateX(100%)"; // Slide out to the right
            currentPage--;
            serviceCategories[currentPage].style.transform = "translateX(0)"; // Slide in from the left
            showPage(currentPage);
        }
    }

    // Add event listeners to the buttons
    prevButton.addEventListener("click", prevPage);
    nextButton.addEventListener("click", nextPage);

    // Initialize the first page view
    showPage(currentPage);

    // Card movement functionality
    const stack = document.querySelector(".stack");
    const cards = Array.from(stack.children)
        .reverse()
        .filter((child) => child.classList.contains("card"));

    cards.forEach((card) => stack.appendChild(card));

    function moveCard() {
        const lastCard = stack.lastElementChild;
        if (lastCard.classList.contains("card")) {
            lastCard.classList.add("swap");

            setTimeout(() => {
                lastCard.classList.remove("swap");
                stack.insertBefore(lastCard, stack.firstElementChild);
            }, 1200);
        }
    }

    let autoplayInterval = setInterval(moveCard, 4000);

    stack.addEventListener("click", function (e) {
        const card = e.target.closest(".card");
        if (card && card === stack.lastElementChild) {
            card.classList.add("swap");

            setTimeout(() => {
                card.classList.remove("swap");
                stack.insertBefore(card, stack.firstElementChild);
            }, 1200);
        }
    });

    // Navigation toggle functionality for the header section
    var navLinks = document.querySelector('.nav-links');
    var menuIcon = document.querySelector('.menu-icon');

    // Toggle menu function
    function toggleMenu() {
        navLinks.classList.toggle('show');
    }

    // Add event listener to menu icon
    if (menuIcon) {
        menuIcon.addEventListener('click', toggleMenu);
    }
});