/* =========================================
   AGROCHEMEX
   PRODUCTS PAGE JAVASCRIPT
========================================= */

"use strict";


/* =========================================
   DOM ELEMENTS
========================================= */

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

const productSearch = document.getElementById("productSearch");
const noResults = document.getElementById("noResults");

const viewProductButtons =
    document.querySelectorAll(".view-product");

const categoryButtons =
    document.querySelectorAll(".category-link");

const footerCategoryLinks =
    document.querySelectorAll("[data-footer-category]");

const productModal =
    document.getElementById("productModal");

const modalOverlay =
    document.getElementById("modalOverlay");

const modalClose =
    document.getElementById("modalClose");

const modalIcon =
    document.getElementById("modalIcon");

const modalCategory =
    document.getElementById("modalCategory");

const modalTitle =
    document.getElementById("modalTitle");

const modalDescription =
    document.getElementById("modalDescription");

const currentYear =
    document.getElementById("currentYear");


/* =========================================
   PRODUCT DATA
========================================= */

const productData = {

    "agro-food": {
        icon: "🌾",
        category: "AGRO-FOOD",
        title: "Agro-Food Solutions",
        description:
            "Agro-Food represents our product area focused on agriculture and food-related applications. Product information, specifications and individual solutions can be added here as the Agrochemex product portfolio grows."
    },

    "agro-chemical": {
        icon: "🌱",
        category: "AGRO-CHEMICAL",
        title: "Agro-Chemical",
        description:
            "Agro-Chemical covers agricultural chemical products and solutions intended for suitable professional applications. Detailed product specifications and technical information can be added to individual products."
    },

    "chemical": {
        icon: "⚗",
        category: "CHEMICAL",
        title: "Chemical Solutions",
        description:
            "Chemical covers products and materials intended for suitable industrial and commercial applications. Individual chemical products, specifications and applications can be added to the Agrochemex portfolio."
    }

};


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

function handleHeaderScroll() {

    if (!header) {
        return;
    }

    if (window.scrollY > 30) {

        header.classList.add("scrolled");

    } else {

        header.classList.remove("scrolled");

    }
}


window.addEventListener(
    "scroll",
    handleHeaderScroll
);


/* Run once when page loads */

handleHeaderScroll();


/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuButton && navbar) {

    menuButton.addEventListener(
        "click",
        function () {

            const isOpen =
                navbar.classList.toggle("open");

            menuButton.classList.toggle(
                "open",
                isOpen
            );

            menuButton.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        }
    );


    /* Close mobile menu when clicking a link */

    const navLinks =
        navbar.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                navbar.classList.remove("open");

                menuButton.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );

    });

}


/* =========================================
   FILTER STATE
========================================= */

let currentFilter = "all";


/* =========================================
   FILTER PRODUCTS
========================================= */

function filterProducts(category) {

    currentFilter = category;

    const searchTerm =
        productSearch
            ? productSearch.value
                .trim()
                .toLowerCase()
            : "";

    let visibleProducts = 0;


    productCards.forEach(function (card) {

        const cardCategory =
            card.dataset.category || "";

        const cardName =
            card.dataset.name || "";

        const cardText =
            card.textContent.toLowerCase();


        const categoryMatches =
            category === "all" ||
            cardCategory === category;


        const searchMatches =
            searchTerm === "" ||
            cardName.includes(searchTerm) ||
            cardText.includes(searchTerm);


        if (categoryMatches && searchMatches) {

            card.style.display = "";

            visibleProducts++;

            /* Small animation */

            card.animate(
                [
                    {
                        opacity: 0.4,
                        transform: "translateY(8px)"
                    },
                    {
                        opacity: 1,
                        transform: "translateY(0)"
                    }
                ],
                {
                    duration: 250,
                    easing: "ease-out"
                }
            );

        } else {

            card.style.display = "none";

        }

    });


    /* Show/hide no-results message */

    if (noResults) {

        if (visibleProducts === 0) {

            noResults.style.display = "block";

        } else {

            noResults.style.display = "none";

        }

    }

}


/* =========================================
   FILTER BUTTON EVENTS
========================================= */

filterButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const category =
                button.dataset.filter || "all";


            /* Remove active class */

            filterButtons.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            /* Add active class */

            button.classList.add("active");


            /* Filter */

            filterProducts(category);

        }
    );

});


/* =========================================
   SEARCH PRODUCTS
========================================= */

if (productSearch) {

    productSearch.addEventListener(
        "input",
        function () {

            filterProducts(currentFilter);

        }
    );

}


/* =========================================
   OPEN PRODUCT MODAL
========================================= */

function openProductModal(productId) {

    if (
        !productModal ||
        !productData[productId]
    ) {
        return;
    }


    const product =
        productData[productId];


    if (modalIcon) {

        modalIcon.textContent =
            product.icon;

    }


    if (modalCategory) {

        modalCategory.textContent =
            product.category;

    }


    if (modalTitle) {

        modalTitle.textContent =
            product.title;

    }


    if (modalDescription) {

        modalDescription.textContent =
            product.description;

    }


    productModal.classList.add("show");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );


    /* Prevent background scrolling */

    document.body.style.overflow = "hidden";

}


/* =========================================
   CLOSE PRODUCT MODAL
========================================= */

function closeProductModal() {

    if (!productModal) {
        return;
    }


    productModal.classList.remove("show");

    productModal.setAttribute(
        "aria-hidden",
        "true"
    );


    /* Restore scrolling */

    document.body.style.overflow = "";

}


/* =========================================
   VIEW PRODUCT BUTTONS
========================================= */

viewProductButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const productId =
                button.dataset.product;


            openProductModal(productId);

        }
    );

});


/* =========================================
   MODAL CLOSE BUTTON
========================================= */

if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProductModal
    );

}


/* =========================================
   MODAL OVERLAY CLOSE
========================================= */

if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProductModal
    );

}


/* =========================================
   ESCAPE KEY CLOSES MODAL
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            productModal &&
            productModal.classList.contains("show")
        ) {

            closeProductModal();

        }

    }
);


/* =========================================
   CATEGORY SECTION BUTTONS
========================================= */

categoryButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const category =
                button.dataset.category;


            if (!category) {
                return;
            }


            /* Find matching filter button */

            const matchingFilter =
                document.querySelector(
                    `.filter-btn[data-filter="${category}"]`
                );


            if (matchingFilter) {

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                matchingFilter.classList.add(
                    "active"
                );

            }


            /* Apply filter */

            filterProducts(category);


            /* Scroll to products */

            const productsSection =
                document.querySelector(
                    ".products-section"
                );


            if (productsSection) {

                productsSection.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "start"
                    }
                );

            }

        }
    );

});


/* =========================================
   FOOTER CATEGORY LINKS
========================================= */

footerCategoryLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            const category =
                link.dataset.footerCategory;


            if (!category) {
                return;
            }


            const matchingFilter =
                document.querySelector(
                    `.filter-btn[data-filter="${category}"]`
                );


            if (matchingFilter) {

                filterButtons.forEach(
                    function (item) {

                        item.classList.remove(
                            "active"
                        );

                    }
                );


                matchingFilter.classList.add(
                    "active"
                );

            }


            filterProducts(category);


            const productsSection =
                document.querySelector(
                    ".products-section"
                );


            if (productsSection) {

                productsSection.scrollIntoView(
                    {
                        behavior: "smooth",
                        block: "start"
                    }
                );

            }

        }
    );

});


/* =========================================
   FOOTER YEAR
========================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   SCROLL REVEAL
========================================= */

function addRevealClasses() {

    const revealElements =
        document.querySelectorAll(
            ".product-card, .category-card"
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

    });

}


function handleReveal() {

    const revealElements =
        document.querySelectorAll(
            ".reveal"
        );


    const windowHeight =
        window.innerHeight;


    revealElements.forEach(function (element) {

        const elementTop =
            element.getBoundingClientRect().top;


        if (
            elementTop <
            windowHeight - 60
        ) {

            element.classList.add(
                "visible"
            );

        }

    });

}


/* Initialize reveal */

addRevealClasses();

handleReveal();


window.addEventListener(
    "scroll",
    handleReveal
);


/* =========================================
   INITIAL PRODUCT FILTER
========================================= */

filterProducts("all");


/* =========================================
   CLOSE MENU WHEN CLICKING OUTSIDE
========================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !navbar ||
            !menuButton
        ) {
            return;
        }


        const clickedInsideMenu =
            navbar.contains(event.target);

        const clickedMenuButton =
            menuButton.contains(event.target);


        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navbar.classList.contains("open")
        ) {

            navbar.classList.remove(
                "open"
            );

            menuButton.classList.remove(
                "open"
            );

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================
   CONSOLE CHECK
========================================= */

console.log(
    "Agrochemex Products Page loaded successfully."
);

/* =========================================
   PRODUCT PAGE CONTACT FORM
========================================= */

const productContactForm =
    document.getElementById("productContactForm");


if (productContactForm) {

    productContactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "productName"
                ).value.trim();


            const email =
                document.getElementById(
                    "productEmail"
                ).value.trim();


            const phone =
                document.getElementById(
                    "productPhone"
                ).value.trim();


            const product =
                document.getElementById(
                    "productInterest"
                ).value;


            const message =
                document.getElementById(
                    "productMessage"
                ).value.trim();


            if (
                !name ||
                !email ||
                !phone ||
                !product ||
                !message
            ) {

                alert(
                    "Please fill in all required fields."
                );

                return;

            }


            alert(
                "Thank you for contacting Agrochemex!\n\n" +
                "We have received your enquiry and " +
                "will get back to you shortly."
            );


            productContactForm.reset();

        }
    );

}