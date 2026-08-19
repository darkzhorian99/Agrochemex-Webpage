/* =========================================
   AGROCHEMEX
   MAIN JAVASCRIPT
========================================= */

"use strict";


/* =========================================
   ELEMENTS
========================================= */

const header = document.getElementById("header");
const menuButton = document.getElementById("menuButton");
const navbar = document.getElementById("navbar");

const navLinks = document.querySelectorAll(".nav-link");

const backToTop = document.getElementById("backToTop");

const productSearch = document.getElementById("productSearch");
const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");
const noProducts = document.getElementById("noProducts");

const productLinks = document.querySelectorAll(".product-link");

const productModal = document.getElementById("productModal");
const modalOverlay = document.getElementById("modalOverlay");
const modalClose = document.getElementById("modalClose");

const modalIcon = document.getElementById("modalIcon");
const modalCategory = document.getElementById("modalCategory");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");

const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

const currentYear = document.getElementById("currentYear");


/* =========================================
   MOBILE NAVIGATION
========================================= */

if (menuButton && navbar) {

    menuButton.addEventListener("click", () => {

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


/* Close mobile menu after clicking link */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        if (!navbar || !menuButton) {
            return;
        }

        navbar.classList.remove("open");

        menuButton.classList.remove("open");

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    });

});


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
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll(
    "main section[id]"
);

function updateActiveNavigation() {

    const scrollPosition =
        window.scrollY + 150;

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop =
            section.offsetTop;

        const sectionHeight =
            section.offsetHeight;

        if (
            scrollPosition >= sectionTop &&
            scrollPosition <
            sectionTop + sectionHeight
        ) {
            currentSection =
                section.getAttribute("id");
        }

    });

    navLinks.forEach((link) => {

        const target =
            link.getAttribute("href");

        link.classList.toggle(
            "active",
            target === `#${currentSection}`
        );

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);


/* =========================================
   BACK TO TOP
========================================= */

function updateBackToTop() {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}

window.addEventListener(
    "scroll",
    updateBackToTop,
    { passive: true }
);


if (backToTop) {

    backToTop.addEventListener(
        "click",
        () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );

}


/* =========================================
   PRODUCT FILTER
========================================= */

let activeFilter = "all";


function filterProducts() {

    const searchTerm =
        productSearch
            ? productSearch.value
                .trim()
                .toLowerCase()
            : "";

    let visibleProducts = 0;


    productCards.forEach((card) => {

        const category =
            card.dataset.category || "";

        const name =
            card.dataset.name || "";

        const title =
            card
                .querySelector("h3")
                ?.textContent
                .toLowerCase() || "";

        const description =
            card
                .querySelector("p")
                ?.textContent
                .toLowerCase() || "";


        const matchesCategory =
            activeFilter === "all" ||
            category === activeFilter;


        const matchesSearch =
            searchTerm === "" ||
            name.includes(searchTerm) ||
            title.includes(searchTerm) ||
            description.includes(searchTerm) ||
            category.includes(searchTerm);


        if (
            matchesCategory &&
            matchesSearch
        ) {

            card.style.display = "";

            visibleProducts++;

        } else {

            card.style.display = "none";

        }

    });


    if (noProducts) {

        noProducts.style.display =
            visibleProducts === 0
                ? "block"
                : "none";

    }

}


/* Filter button events */

filterButtons.forEach((button) => {

    button.addEventListener("click", () => {

        filterButtons.forEach((btn) => {

            btn.classList.remove("active");

        });

        button.classList.add("active");

        activeFilter =
            button.dataset.filter || "all";

        filterProducts();

    });

});


/* Product search */

if (productSearch) {

    productSearch.addEventListener(
        "input",
        filterProducts
    );

}


/* =========================================
   PRODUCT MODAL
========================================= */

const productData = {

    "agro-food": {

        icon: "🌾",

        category: "AGRO-FOOD",

        title: "Agro-Food Solutions",

        description:
            "A dedicated product category for solutions connected with agriculture and food-related applications."

    },

    "agro-chemical": {

        icon: "🌱",

        category: "AGRO-CHEMICAL",

        title: "Agro-Chemical Solutions",

        description:
            "A dedicated category for agricultural chemical products and solutions. Actual products, specifications and regulatory information should be added according to your company's portfolio."

    },

    "chemical": {

        icon: "🧪",

        category: "CHEMICAL",

        title: "Chemical Solutions",

        description:
            "A category for chemical products and materials intended for suitable industrial and commercial applications."

    }

};


function openProductModal(category) {

    const data =
        productData[category];

    if (!data || !productModal) {
        return;
    }

    if (modalIcon) {
        modalIcon.textContent =
            data.icon;
    }

    if (modalCategory) {
        modalCategory.textContent =
            data.category;
    }

    if (modalTitle) {
        modalTitle.textContent =
            data.title;
    }

    if (modalDescription) {
        modalDescription.textContent =
            data.description;
    }

    productModal.classList.add("show");

    productModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow = "hidden";

}


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


productLinks.forEach((button) => {

    button.addEventListener("click", () => {

        const category =
            button.dataset.product;

        openProductModal(category);

    });

});


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


/* Close modal using Escape */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            event.key === "Escape" &&
            productModal?.classList.contains("show")
        ) {

            closeProductModal();

        }

    }
);


/* =========================================
   FOOTER PRODUCT FILTER
========================================= */

const footerFilterLinks =
    document.querySelectorAll(
        "[data-footer-filter]"
    );

footerFilterLinks.forEach((link) => {

    link.addEventListener("click", () => {

        const category =
            link.dataset.footerFilter;

        activeFilter = category;

        filterButtons.forEach((button) => {

            button.classList.toggle(
                "active",
                button.dataset.filter === category
            );

        });

        filterProducts();

    });

});


/* =========================================
   CONTACT FORM
========================================= */

function showFormStatus(
    message,
    type
) {

    if (!formStatus) {
        return;
    }

    formStatus.textContent = message;

    formStatus.className =
        `form-status ${type}`;

}


function validateEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        .test(email);

}


if (contactForm) {

    contactForm.addEventListener(
        "submit",
        (event) => {

            event.preventDefault();


            const name =
                document.getElementById("name");

            const email =
                document.getElementById("email");

            const message =
                document.getElementById("message");


            /* Remove old errors */

            [
                name,
                email,
                message
            ].forEach((field) => {

                if (field) {
                    field.classList.remove("error");
                }

            });


            let valid = true;


            if (
                !name ||
                name.value.trim().length < 2
            ) {

                name?.classList.add("error");

                valid = false;

            }


            if (
                !email ||
                !validateEmail(
                    email.value.trim()
                )
            ) {

                email?.classList.add("error");

                valid = false;

            }


            if (
                !message ||
                message.value.trim().length < 10
            ) {

                message?.classList.add("error");

                valid = false;

            }


            if (!valid) {

                showFormStatus(
                    "Please complete the required fields correctly.",
                    "error"
                );

                return;

            }


            /*
                This is a frontend-only form.

                To actually send messages to your email,
                connect this form to your backend,
                Formspree, EmailJS, PHP, Node.js, etc.
            */

            showFormStatus(
                "Thank you! Your enquiry has been received by this demo form.",
                "success"
            );

            contactForm.reset();

        }
    );

}


/* =========================================
   CURRENT YEAR
========================================= */

if (currentYear) {

    currentYear.textContent =
        new Date().getFullYear();

}


/* =========================================
   SCROLL REVEAL
========================================= */

const revealElements =
    document.querySelectorAll(
        ".about-grid, .product-card, .solution-card, .why-item, .contact-wrapper"
    );


revealElements.forEach((element) => {

    element.classList.add("reveal");

});


const revealObserver =
    new IntersectionObserver(
        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) {
                    return;
                }

                entry.target.classList.add(
                    "visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },
        {
            threshold: 0.12
        }
    );


revealElements.forEach((element) => {

    revealObserver.observe(element);

});


/* =========================================
   INITIALIZATION
========================================= */

filterProducts();
updateHeader();
updateBackToTop();
updateActiveNavigation();