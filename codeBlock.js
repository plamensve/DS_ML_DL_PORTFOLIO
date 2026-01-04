document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#about");
    const codeBlock = document.querySelector(".code-block");
    const header = document.querySelector(".header");

    const skillsGrids = document.querySelectorAll(".skills-grid");

    if (!section || !codeBlock || !header) return;

    let isActive = false;

    function updateState() {
        const scrollTop = window.scrollY;
        const headerHeight = header.offsetHeight;

        /* ===== ABOUT / CODE BLOCK ===== */
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        const enteredSection = scrollTop + headerHeight >= sectionTop;
        const leftSection = scrollTop >= sectionBottom;

        if (enteredSection && !leftSection) {
            if (!isActive) {
                codeBlock.classList.add("is-active");
                document.body.classList.add("is-dark-mode");
                isActive = true;
            }
        } else {
            if (isActive) {
                codeBlock.classList.remove("is-active");
                document.body.classList.remove("is-dark-mode");
                isActive = false;
            }
        }

        /* ===== SKILLS (PER GRID) ===== */
        const triggerLine = scrollTop + window.innerHeight * 0.75;

        skillsGrids.forEach(grid => {
            const gridTop = grid.offsetTop;

            if (triggerLine >= gridTop) {
                grid.classList.add("is-active");
            }
        });
    }

    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    updateState();
});
