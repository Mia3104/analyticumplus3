document.addEventListener("DOMContentLoaded", function () {
    const footer = document.querySelector("footer");

    function updateFooterPosition() {
        const allElements = Array.from(document.querySelectorAll("body > *:not(footer)"));
        let totalHeight = allElements.reduce((sum, el) => sum + el.offsetHeight, 0);

        const cooperationBlock = document.querySelector(".cooperation-block");
        if (cooperationBlock) {
            const offsetTop = cooperationBlock.offsetTop;
            const scrollHeight = cooperationBlock.scrollHeight;
            totalHeight = offsetTop + scrollHeight;
        }

        let footerOffset;

        if (window.innerWidth <= 743) {
            footerOffset = 684; // Мобильные устройства
        } else if (window.innerWidth <= 1599) {
            footerOffset = 963; // Планшеты и маленькие мониторы
        } else if (window.innerWidth <= 1919) {
            footerOffset = 690; // Стандартный десктоп
        } else {
            footerOffset = 880; // Большие экраны
        }

        footer.style.position = "absolute";
        footer.style.top = `${totalHeight + footerOffset}px`;

        console.log("Footer position updated:", {
            totalHeight,
            footerOffset,
            finalTop: totalHeight + footerOffset,
            windowWidth: window.innerWidth
        });
    }

    updateFooterPosition();
    window.addEventListener("resize", updateFooterPosition);
});