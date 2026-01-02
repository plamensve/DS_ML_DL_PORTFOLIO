document.addEventListener("DOMContentLoaded", () => {
    const codeBlock = document.querySelector(".code-block");
    if (!codeBlock) return;

    let isActive = false;

    function activate() {
        if (isActive) return;
        codeBlock.classList.add("is-active");
        document.body.classList.add("is-dark-mode");
        isActive = true;
    }

    function deactivate() {
        if (!isActive) return;
        codeBlock.classList.remove("is-active");
        document.body.classList.remove("is-dark-mode");
        isActive = false;
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.7) {
                activate();
            }

            if (!entry.isIntersecting) {
                deactivate();
            }
        },
        {
            threshold: [0, 0.7],
            rootMargin: "-10% 0px -10% 0px"
        }
    );

    observer.observe(codeBlock);
});
