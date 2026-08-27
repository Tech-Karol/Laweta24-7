document.addEventListener("DOMContentLoaded", () => {

    // ==========================================
    // HEADER — efekt po przewinięciu
    // ==========================================

    const header = document.getElementById("header");

    function updateHeader() {
        if (!header) return;

        if (window.scrollY > 30) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", updateHeader);
    updateHeader();


    // ==========================================
    // MENU MOBILNE
    // ==========================================

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            navMenu.classList.toggle("active");

            const menuOpen =
                navMenu.classList.contains("active");

            menuToggle.setAttribute(
                "aria-expanded",
                menuOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                menuOpen
                    ? "Zamknij menu"
                    : "Otwórz menu"
            );

        });


        // Zamknięcie menu po kliknięciu
        // w dowolny link

        const navLinks =
            navMenu.querySelectorAll("a");

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Otwórz menu"
                );

            });

        });


        // Zamknięcie menu po kliknięciu poza nim

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedButton =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedButton
            ) {
                navMenu.classList.remove("active");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Otwórz menu"
                );
            }

        });

    }


    // ==========================================
    // LIGHTBOX — POWIĘKSZANIE ZDJĘĆ
    // ==========================================

    const galleryItems =
        document.querySelectorAll(
            '[data-lightbox="gallery"]'
        );

    const lightbox =
        document.getElementById("lightbox");

    const lightboxImage =
        document.getElementById("lightboxImage");

    const lightboxClose =
        document.getElementById("lightboxClose");


    if (
        galleryItems.length &&
        lightbox &&
        lightboxImage &&
        lightboxClose
    ) {

        galleryItems.forEach(item => {

            item.addEventListener("click", event => {

                event.preventDefault();

                const imageUrl =
                    item.getAttribute("href");

                const image =
                    item.querySelector("img");

                if (!imageUrl) return;

                lightboxImage.src = imageUrl;

                lightboxImage.alt =
                    image
                        ? image.alt
                        : "Powiększone zdjęcie";

                lightbox.classList.add("active");

                document.body.style.overflow = "hidden";

            });

        });


        function closeLightbox() {

            lightbox.classList.remove("active");

            document.body.style.overflow = "";

            setTimeout(() => {
                lightboxImage.src = "";
            }, 300);

        }


        // Przycisk X

        lightboxClose.addEventListener(
            "click",
            closeLightbox
        );


        // Kliknięcie poza zdjęciem

        lightbox.addEventListener(
            "click",
            event => {

                if (event.target === lightbox) {
                    closeLightbox();
                }

            }
        );


        // ESC

        document.addEventListener(
            "keydown",
            event => {

                if (
                    event.key === "Escape" &&
                    lightbox.classList.contains("active")
                ) {
                    closeLightbox();
                }

            }
        );

    }


    // ==========================================
    // AUTOMATYCZNY ROK W STOPCE
    // ==========================================

    const year =
        document.getElementById("year");

    if (year) {
        year.textContent =
            new Date().getFullYear();
    }


    // ==========================================
    // OBSŁUGA BŁĘDÓW ZDJĘĆ
    // ==========================================

    const images =
        document.querySelectorAll("img");

    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                image.classList.add(
                    "image-error"
                );

                console.warn(
                    "Nie znaleziono zdjęcia:",
                    image.src
                );

            }
        );

    });


    // ==========================================
    // ANIMACJA ELEMENTÓW PRZY SCROLLU
    // ==========================================

    const animatedElements =
        document.querySelectorAll(
            ".service-card, .quick-item, .gallery-item, .contact-box"
        );


    if ("IntersectionObserver" in window) {

        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
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


        animatedElements.forEach(element => {

            element.classList.add(
                "scroll-hidden"
            );

            observer.observe(element);

        });

    } else {

        animatedElements.forEach(element => {
            element.classList.add("visible");
        });

    }


    // ==========================================
    // TELEFON — ANIMOWANY PRZYCISK
    // ==========================================

    const phoneButtons =
        document.querySelectorAll(
            'a[href^="tel:"]'
        );

    phoneButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                button.classList.add(
                    "phone-clicked"
                );

                setTimeout(() => {

                    button.classList.remove(
                        "phone-clicked"
                    );

                }, 500);

            }
        );

    });


    // ==========================================
    // LOG
    // ==========================================

    console.log(
        "🚛 Strona Laweta została załadowana."
    );

});
