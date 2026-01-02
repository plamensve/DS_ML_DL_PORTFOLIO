document.addEventListener("DOMContentLoaded", () => {
    const codeBlock = document.querySelector(".code-block");
    if (!codeBlock) return;

    let isActive = false;

    function update() {
        const rect = codeBlock.getBoundingClientRect();
        const viewportHeight = window.innerHeight;

        // колко % от code-block е навлязло отгоре
        const visibleFromTop = viewportHeight - rect.top;
        const progress = visibleFromTop / rect.height;

        // АКТИВАЦИЯ – когато сме навлезли поне 80%
        if (progress >= 0.8 && !isActive) {
            codeBlock.classList.add("is-active");
            document.body.classList.add("is-dark-mode");
            isActive = true;
        }

        // ДЕАКТИВАЦИЯ – когато напълно излезе
        if (rect.bottom <= 0 && isActive) {
            codeBlock.classList.remove("is-active");
            document.body.classList.remove("is-dark-mode");
            isActive = false;
        }
    }

    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    update(); // initial check
});
