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

    // 🔑 INITIAL CHECK (ключовото)
    function checkInitialPosition() {
        const rect = codeBlock.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        const visibleHeight =
            Math.min(rect.bottom, viewportHeight) -
            Math.max(rect.top, 0);

        const ratio = visibleHeight / rect.height;

        if (ratio >= 0.8) {
            activate();
        }
    }

    const observer = new IntersectionObserver(
        ([entry]) => {
            const ratio = entry.intersectionRatio;

            // ENTER
            if (ratio >= 0.8) {
                activate();
            }

            // EXIT – напълно извън viewport
            if (ratio === 0) {
                deactivate();
            }
        },
        {
            threshold: [0, 0.8]
        }
    );

    observer.observe(codeBlock);
    checkInitialPosition(); // 🔥 това решава проблема
});
