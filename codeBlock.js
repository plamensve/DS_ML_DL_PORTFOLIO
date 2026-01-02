document.addEventListener("DOMContentLoaded", () => {
    const codeBlock = document.querySelector(".code-block");
    if (!codeBlock) return;

    let isActive = false;

    const observer = new IntersectionObserver(
        ([entry]) => {
            const ratio = entry.intersectionRatio;

            // ENTER: поне 80% видимост
            if (ratio >= 0.8 && !isActive) {
                codeBlock.classList.add("is-active");
                document.body.classList.add("is-dark-mode");
                isActive = true;
            }

            // EXIT: напълно извън viewport
            if (ratio === 0 && isActive) {
                codeBlock.classList.remove("is-active");
                document.body.classList.remove("is-dark-mode");
                isActive = false;
            }
        },
        {
            threshold: [0, 0.8]
        }
    );

    observer.observe(codeBlock);
});
