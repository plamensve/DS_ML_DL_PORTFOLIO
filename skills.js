document.addEventListener("DOMContentLoaded", () => {
    const skillsGrid = document.querySelector(".skills-grid");
    if (!skillsGrid) return;

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.intersectionRatio >= 0.4) {
                skillsGrid.classList.add("is-active");
                observer.disconnect();
            }
        },
        {
            threshold: [0, 0.4, 1]
        }
    );

    observer.observe(skillsGrid);
});
