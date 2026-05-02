function filterTools() {
    const searchTerm = document
        .getElementById("toolSearch")
        .value.toLowerCase()
        .trim();
    const cards = document.querySelectorAll(".tool-card");

    cards.forEach((card) => {
        const text = card.textContent.toLowerCase();
        card.style.display = text.includes(searchTerm) ? "block" : "none";
    });
}
function filterByCategory(category) {
    document
        .querySelectorAll(".tag-btn")
        .forEach((btn) => btn.classList.remove("active"));
    event.currentTarget.classList.add("active");

    const cards = document.querySelectorAll(".tool-card");
    if (category === "all") {
        cards.forEach((card) => (card.style.display = "block"));
    } else {
        cards.forEach((card) => {
            card.style.display =
                card.getAttribute("data-category") === category ? "block" : "none";
        });
    }
}
