document.addEventListener("DOMContentLoaded", () => {
    const codeBlock = document.querySelector(".code-block");
    if (!codeBlock) return;

    let isActive = false;

    const observer = new IntersectionObserver(
        ([entry]) => {

            // ENTER
            if (entry.isIntersecting && entry.intersectionRatio > 0.93 && !isActive) {
                codeBlock.classList.add("is-active");
                document.body.classList.add("is-dark-mode");
                isActive = true;
            }

            // EXIT — ЕДИНСТВЕНО правилният начин
            if (!entry.isIntersecting && isActive) {
                codeBlock.classList.remove("is-active");
                document.body.classList.remove("is-dark-mode");
                isActive = false;
            }

        },
        {
            threshold: Array.from({ length: 100 }, (_, i) => i / 100)
        }
    );

    observer.observe(codeBlock);
});
