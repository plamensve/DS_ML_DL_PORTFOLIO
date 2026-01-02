document.addEventListener("DOMContentLoaded", () => {
    const section = document.querySelector("#about");
    const codeBlock = document.querySelector(".code-block");
    const header = document.querySelector(".header");

    if (!section || !codeBlock || !header) return;

    let isActive = false;

    function updateState() {
        const scrollTop = window.scrollY;
        const headerHeight = header.offsetHeight;

        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        const enteredSection = scrollTop + headerHeight >= sectionTop;
        const leftSection = scrollTop >= sectionBottom;

        if (enteredSection && !leftSection) {
            // ВЪТРЕ В СЕКЦИЯТА
            if (!isActive) {
                codeBlock.classList.add("is-active");
                document.body.classList.add("is-dark-mode");
                isActive = true;
            }
        } else {
            // ИЗВЪН СЕКЦИЯТА (и нагоре, и надолу)
            if (isActive) {
                codeBlock.classList.remove("is-active");
                document.body.classList.remove("is-dark-mode");
                isActive = false;
            }
        }
    }

    window.addEventListener("scroll", updateState, { passive: true });
    window.addEventListener("resize", updateState);
    updateState();
});
