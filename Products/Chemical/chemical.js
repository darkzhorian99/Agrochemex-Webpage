/* =========================================
   AGROCHEMEX
   CHEMICAL PRODUCTS PAGE
   chemical.js
========================================= */

"use strict";


/* =========================================
   DOM ELEMENTS
========================================= */

const header = document.getElementById("header");
const navbar = document.getElementById("navbar");
const menuButton = document.getElementById("menuButton");

const industrialSearch =
    document.getElementById("industrialSearch");

const industrialGrid =
    document.getElementById("industrialGrid");

const industrialNoResults =
    document.getElementById("industrialNoResults");

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
   PRODUCT INFORMATION
========================================= */

const chemicalProducts = {

    solvents: {
        icon: "S",
        category: "INDUSTRIAL CHEMICAL",
        title: "Solvents",
        description:
            "Industrial solvent products intended for " +
            "suitable processing, cleaning and " +
            "manufacturing applications."
    },

    acids: {
        icon: "A",
        category: "INDUSTRIAL CHEMICAL",
        title: "Acids",
        description:
            "Industrial acid products intended for " +
            "appropriate manufacturing and processing " +
            "applications."
    },

    alkalis: {
        icon: "Al",
        category: "INDUSTRIAL CHEMICAL",
        title: "Alkalis",
        description:
            "Alkaline chemical products for suitable " +
            "industrial and processing applications."
    },

    salts: {
        icon: "Na",
        category: "INDUSTRIAL CHEMICAL",
        title: "Industrial Salts",
        description:
            "Industrial salt products for appropriate " +
            "processing and manufacturing requirements."
    }

};


/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuButton && navbar) {

    menuButton.addEventListener("click", function () {

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

    });

}


/* =========================================
   CLOSE MOBILE NAVIGATION
========================================= */

if (navbar) {

    const navLinks =
        navbar.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navbar.classList.remove("open");

            if (menuButton) {

                menuButton.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        });

    });

}


/* =========================================
   HEADER SCROLL EFFECT
========================================= */

function updateHeader() {

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
    updateHeader,
    { passive: true }
);

updateHeader();


/* =========================================
   SMOOTH SCROLLING
========================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

        const targetId =
            link.getAttribute("href");

        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }

        const target =
            document.querySelector(targetId);

        if (!target) {
            return;
        }

        event.preventDefault();

        const headerHeight =
            header
                ? header.offsetHeight
                : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            10;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* =========================================
   INDUSTRIAL CHEMICAL SEARCH
========================================= */

function filterIndustrialProducts() {

    if (
        !industrialSearch ||
        !industrialGrid
    ) {
        return;
    }

    const searchTerm =
        industrialSearch.value
            .trim()
            .toLowerCase();

    const cards =
        industrialGrid.querySelectorAll(
            ".product-card"
        );

    let visibleCount = 0;


    cards.forEach(function (card) {

        const name =
            card.dataset.name || "";

        const cardText =
            card.textContent || "";

        const searchableText =
            (
                name +
                " " +
                cardText
            ).toLowerCase();

        const matches =
            searchableText.includes(
                searchTerm
            );


        if (matches) {

            card.style.display = "";

            visibleCount++;

        } else {

            card.style.display = "none";

        }

    });


    if (industrialNoResults) {

        industrialNoResults.style.display =
            visibleCount === 0
                ? "block"
                : "none";

    }

}


if (industrialSearch) {

    industrialSearch.addEventListener(
        "input",
        filterIndustrialProducts
    );

}


/* =========================================
   OPEN PRODUCT MODAL
========================================= */

function openProductModal(productId) {

    if (
        !productModal ||
        !chemicalProducts[productId]
    ) {
        return;
    }


    const product =
        chemicalProducts[productId];


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


    document.body.style.overflow =
        "hidden";


    if (modalClose) {

        modalClose.focus();

    }

}


/* =========================================
   PRODUCT BUTTONS
========================================= */

const productButtons =
    document.querySelectorAll(
        ".product-button"
    );


productButtons.forEach(function (button) {

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


    document.body.style.overflow = "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeProductModal
    );

}


if (modalOverlay) {

    modalOverlay.addEventListener(
        "click",
        closeProductModal
    );

}


/* =========================================
   ESCAPE KEY
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
   CLICK OUTSIDE MOBILE MENU
========================================= */

document.addEventListener(
    "click",
    function (event) {

        if (
            !navbar ||
            !menuButton ||
            !navbar.classList.contains("open")
        ) {
            return;
        }


        const clickedNavbar =
            navbar.contains(event.target);

        const clickedButton =
            menuButton.contains(event.target);


        if (
            !clickedNavbar &&
            !clickedButton
        ) {

            navbar.classList.remove("open");

            menuButton.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

        }

    }
);


/* =========================================
   SCROLL REVEAL ANIMATION
========================================= */

const revealElements =
    document.querySelectorAll(
        ".product-card, " +
        ".specialty-card, " +
        ".application-card, " +
        ".intro-grid, " +
        ".section-heading"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(function (entry) {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "reveal",
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(function (element) {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    revealElements.forEach(function (element) {

        element.classList.add(
            "reveal",
            "visible"
        );

    });

}


/* =========================================
   DYNAMIC COPYRIGHT YEAR
========================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   MODAL CONTENT CLICK PROTECTION
========================================= */

const modalContent =
    document.querySelector(".modal-content");


if (modalContent) {

    modalContent.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

        }
    );

}


/* =========================================
   INITIALIZATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        filterIndustrialProducts();

    }
);