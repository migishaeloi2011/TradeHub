// ==========================================
// TRADEHUB - MAIN JAVASCRIPT
// ==========================================

document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // MOBILE NAVIGATION
    // ==========================================

    const header = document.querySelector(".header");
    const navbar = document.querySelector(".navbar");

    if (header && navbar) {
        const menuButton = document.createElement("button");

        menuButton.className = "menu-toggle";
        menuButton.innerHTML = "☰";
        menuButton.setAttribute("aria-label", "Open navigation menu");

        header.insertBefore(menuButton, navbar);

        menuButton.addEventListener("click", () => {
            navbar.classList.toggle("show");
        });

        navbar.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navbar.classList.remove("show");
            });
        });
    }


    // ==========================================
    // PRODUCT SEARCH
    // ==========================================

    const productSearch = document.querySelector("#product-search");
    const productCards = document.querySelectorAll(".product-card");

    if (productSearch && productCards.length > 0) {

        productSearch.addEventListener("input", () => {

            const searchTerm = productSearch.value.toLowerCase().trim();

            productCards.forEach(card => {

                const productName =
                    card.querySelector("h3")?.textContent.toLowerCase() || "";

                const productDescription =
                    card.querySelector("p")?.textContent.toLowerCase() || "";

                if (
                    productName.includes(searchTerm) ||
                    productDescription.includes(searchTerm)
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }


    // ==========================================
    // CATEGORY SEARCH
    // ==========================================

    const categorySearch = document.querySelector("#category-search");
    const categoryCards = document.querySelectorAll(".category-card");

    if (categorySearch && categoryCards.length > 0) {

        categorySearch.addEventListener("input", () => {

            const searchTerm = categorySearch.value.toLowerCase().trim();

            categoryCards.forEach(card => {

                const categoryName =
                    card.querySelector("h3")?.textContent.toLowerCase() || "";

                const categoryDescription =
                    card.querySelector("p")?.textContent.toLowerCase() || "";

                if (
                    categoryName.includes(searchTerm) ||
                    categoryDescription.includes(searchTerm)
                ) {
                    card.style.display = "";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }


    // ==========================================
    // PRICE FILTER
    // ==========================================

    const priceFilter = document.querySelector("#price-filter");

    if (priceFilter && productCards.length > 0) {

        priceFilter.addEventListener("change", () => {

            const selectedPrice = priceFilter.value;

            productCards.forEach(card => {

                const priceElement = card.querySelector(".price");

                if (!priceElement) return;

                const priceText = priceElement.textContent
                    .replace(/[^0-9.]/g, "");

                const price = parseFloat(priceText);

                let showProduct = true;

                if (selectedPrice === "under100") {
                    showProduct = price < 100;
                }

                if (selectedPrice === "100-500") {
                    showProduct = price >= 100 && price <= 500;
                }

                if (selectedPrice === "500-1000") {
                    showProduct = price > 500 && price <= 1000;
                }

                if (selectedPrice === "over1000") {
                    showProduct = price > 1000;
                }

                card.style.display = showProduct ? "" : "none";
            });
        });
    }


    // ==========================================
    // ADD TO CART
    // ==========================================

    let cart = JSON.parse(localStorage.getItem("tradehubCart")) || [];

    const updateCartCounter = () => {

        const cartCounters = document.querySelectorAll(".cart-count");

        cartCounters.forEach(counter => {
            counter.textContent = cart.length;
        });
    };

    document.querySelectorAll(".add-to-cart").forEach(button => {

        button.addEventListener("click", () => {

            const card = button.closest(".product-card");

            if (!card) return;

            const productName =
                card.querySelector("h3")?.textContent || "Product";

            const price =
                card.querySelector(".price")?.textContent || "$0";

            const image =
                card.querySelector("img")?.getAttribute("src") || "";

            const product = {
                name: productName,
                price: price,
                image: image
            };

            cart.push(product);

            localStorage.setItem(
                "tradehubCart",
                JSON.stringify(cart)
            );

            updateCartCounter();

            button.textContent = "Added ✓";

            setTimeout(() => {
                button.textContent = "Add to Cart";
            }, 1500);

        });

    });

    updateCartCounter();


    // ==========================================
    // FAVORITE BUTTONS
    // ==========================================

    document.querySelectorAll(".favorite-btn").forEach(button => {

        button.addEventListener("click", () => {

            button.classList.toggle("active");

            if (button.classList.contains("active")) {
                button.textContent = "♥";
            } else {
                button.textContent = "♡";
            }

        });

    });


    // ==========================================
    // SIGN-IN FORM
    // ==========================================

    const signInForm = document.querySelector("#signin-form");

    if (signInForm) {

        signInForm.addEventListener("submit", event => {

            event.preventDefault();

            const email = document.querySelector("#email");
            const password = document.querySelector("#password");

            if (!email.value.trim()) {
                alert("Please enter your email address.");
                email.focus();
                return;
            }

            if (!email.value.includes("@")) {
                alert("Please enter a valid email address.");
                email.focus();
                return;
            }

            if (!password.value.trim()) {
                alert("Please enter your password.");
                password.focus();
                return;
            }

            if (password.value.length < 6) {
                alert("Password must contain at least 6 characters.");
                password.focus();
                return;
            }

            alert("Sign in information accepted. Backend authentication will be connected later.");

        });
    }


    // ==========================================
    // CONTACT FORM
    // ==========================================

    const contactForm = document.querySelector("#contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const firstName = document.querySelector("#first_name");
            const lastName = document.querySelector("#last_name");
            const email = document.querySelector("#contact-email");
            const message = document.querySelector("#message");

            if (!firstName.value.trim()) {
                alert("Please enter your first name.");
                firstName.focus();
                return;
            }

            if (!lastName.value.trim()) {
                alert("Please enter your last name.");
                lastName.focus();
                return;
            }

            if (!email.value.trim() || !email.value.includes("@")) {
                alert("Please enter a valid email address.");
                email.focus();
                return;
            }

            if (!message.value.trim()) {
                alert("Please enter your message.");
                message.focus();
                return;
            }

            alert("Your message has been received. Thank you for contacting TradeHub!");

            contactForm.reset();

        });
    }


    // ==========================================
    // SELL BUTTON
    // ==========================================

    document.querySelectorAll(".sell-btn").forEach(button => {

        button.addEventListener("click", event => {

            const href = button.getAttribute("href");

            if (!href || href === "#") {
                event.preventDefault();

                alert(
                    "The seller page will allow you to create and publish product listings."
                );
            }

        });

    });


    // ==========================================
    // SCROLL TO TOP
    // ==========================================

    const scrollButton = document.createElement("button");

    scrollButton.textContent = "↑";
    scrollButton.className = "scroll-top";
    scrollButton.setAttribute("aria-label", "Scroll to top");

    document.body.appendChild(scrollButton);

    window.addEventListener("scroll", () => {

        if (window.scrollY > 400) {
            scrollButton.classList.add("show");
        } else {
            scrollButton.classList.remove("show");
        }

    });

    scrollButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });


    // ==========================================
    // DYNAMIC FOOTER YEAR
    // ==========================================

    const yearElements = document.querySelectorAll(".current-year");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    // ==========================================
    // ACTIVE NAVIGATION LINK
    // ==========================================

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navbar a").forEach(link => {

        const linkPage =
            link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });

});