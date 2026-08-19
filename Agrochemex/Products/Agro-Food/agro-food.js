/* =========================================
   AGROCHEMEX
   AGRO-FOOD PAGE
   agro-food.js
========================================= */

"use strict";


/* =========================================
   DOM ELEMENTS
========================================= */

const header =
    document.getElementById("header");

const navbar =
    document.getElementById("navbar");

const menuButton =
    document.getElementById("menuButton");

const processedSearch =
    document.getElementById("processedSearch");

const processedGrid =
    document.getElementById("processedGrid");

const processedNoResults =
    document.getElementById("processedNoResults");

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

const productInformation = {

    oil: {
        icon: "🫒",

        category: "PROCESSED FOOD",

        title: "Oil",

        description:
            "Edible oils and oil-based food products " +
            "for suitable culinary and commercial " +
            "applications."
    },


    spices: {
        icon: "🌶️",

        category: "PROCESSED FOOD",

        title: "Spices",

        description:
            "A range of spices and seasoning products " +
            "prepared for food and culinary applications."
    },


    pickles: {
        icon: "🥒",

        category: "PROCESSED FOOD",

        title: "Pickles",

        description:
            "Prepared pickle products made from selected " +
            "ingredients for convenient food applications."
    },


    "ready-meals": {
        icon: "🍱",

        category: "PROCESSED FOOD",

        title: "Ready-to-Eat Meals",

        description:
            "Convenient prepared meal options designed " +
            "for quick and practical food consumption."
    }

};


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

}


/* =========================================
   CLOSE MOBILE NAVIGATION
========================================= */

if (navbar) {

    const navLinks =
        navbar.querySelectorAll(".nav-link");

    navLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                if (
                    navbar.classList.contains("open")
                ) {

                    navbar.classList.remove("open");

                    if (menuButton) {

                        menuButton.classList.remove(
                            "open"
                        );

                        menuButton.setAttribute(
                            "aria-expanded",
                            "false"
                        );

                    }

                }

            }
        );

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
   SMOOTH SCROLL
========================================= */

const internalLinks =
    document.querySelectorAll(
        'a[href^="#"]'
    );


internalLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

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

        }
    );

});


/* =========================================
   PROCESSED FOOD SEARCH
========================================= */

function filterProcessedProducts() {

    if (!processedSearch || !processedGrid) {
        return;
    }


    const searchTerm =
        processedSearch.value
            .trim()
            .toLowerCase();


    const cards =
        processedGrid.querySelectorAll(
            ".product-card"
        );


    let visibleCount = 0;


    cards.forEach(function (card) {

        const searchableText =
            (
                card.dataset.name +
                " " +
                card.textContent
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


    if (processedNoResults) {

        if (visibleCount === 0) {

            processedNoResults.style.display =
                "block";

        } else {

            processedNoResults.style.display =
                "none";

        }

    }

}


if (processedSearch) {

    processedSearch.addEventListener(
        "input",
        filterProcessedProducts
    );

}


/* =========================================
   OPEN PRODUCT MODAL
========================================= */

function openProductModal(productId) {

    if (
        !productModal ||
        !productInformation[productId]
    ) {
        return;
    }


    const product =
        productInformation[productId];


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
   PRODUCT BUTTON EVENTS
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
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".product-card, " +
        ".produce-card, " +
        ".benefit-card, " +
        ".intro-grid, " +
        ".section-heading"
    );


if (
    "IntersectionObserver" in window
) {

    const revealObserver =
        new IntersectionObserver(
            function (entries, observer) {

                entries.forEach(
                    function (entry) {

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

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    revealElements.forEach(
        function (element) {

            element.classList.add(
                "reveal"
            );

            revealObserver.observe(
                element
            );

        }
    );

} else {

    /*
       Fallback for older browsers.
    */

    revealElements.forEach(
        function (element) {

            element.classList.add(
                "reveal",
                "visible"
            );

        }
    );

}


/* =========================================
   DYNAMIC COPYRIGHT YEAR
========================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   CLOSE MOBILE MENU WHEN
   CLICKING OUTSIDE
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


        const clickedInsideNavbar =
            navbar.contains(event.target);


        const clickedMenuButton =
            menuButton.contains(event.target);


        if (
            !clickedInsideNavbar &&
            !clickedMenuButton
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
   PREVENT MODAL CONTENT CLICK
   FROM CLOSING MODAL
========================================= */

const modalContent =
    document.querySelector(
        ".modal-content"
    );


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

        filterProcessedProducts();

    }
);