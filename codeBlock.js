document.addEventListener("DOMContentLoaded", () => {
    const codeBlock = document.querySelector(".code-block");
    if (!codeBlock) return;

    let isActive = false;

    const observer = new IntersectionObserver(
        ([entry]) => {
            const ratio = entry.intersectionRatio;

            // ENTER
            if (ratio > 0.95 && !isActive) {
                codeBlock.classList.add("is-active");
                document.body.classList.add("is-dark-mode");
                isActive = true;
            }

            // EXIT
            if (ratio < 0.3 && isActive) {
                codeBlock.classList.remove("is-active");
                document.body.classList.remove("is-dark-mode");
                isActive = false;
            }
        },
        {
            threshold: [0, 0.2, 0.95, 1]
        }
    );

    observer.observe(codeBlock);
});
