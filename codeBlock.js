document.addEventListener("DOMContentLoaded", () => {
    const codeBlock = document.querySelector(".code-block");
    if (!codeBlock) return;

    let isActive = false;

    const observer = new IntersectionObserver(
        ([entry]) => {

            if (entry.intersectionRatio >= 0.96 && !isActive) {
                codeBlock.classList.add("is-active");
                document.body.classList.add("is-dark-mode");
                isActive = true;
            }

            // EXIT: completely out
            if (entry.intersectionRatio === 0 && isActive) {
                codeBlock.classList.remove("is-active");
                document.body.classList.remove("is-dark-mode");
                isActive = false;
            }

        },
        {
            threshold: [0, 0.96]
        }
    );

    observer.observe(codeBlock);
});