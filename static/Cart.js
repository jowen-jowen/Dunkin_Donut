


document.querySelectorAll(".qty-input").forEach(input => {
    input.addEventListener("change", function () {

        let newQty = parseInt(this.value);

        if (newQty < 1) newQty = 1;
        if (newQty > 10) newQty = 10;

        this.value = newQty;

        const price = parseFloat(this.dataset.price);
        const id = this.dataset.id;

        const summaryRow = document.getElementById("summary-" + id);

        summaryRow.querySelector(".summary-qty").textContent = newQty;

        const newTotal = price * newQty;
        summaryRow.querySelector(".item-total").textContent = newTotal.toFixed(2);

        let grandTotal = 0;
        document.querySelectorAll(".item-total").forEach(el => {
            grandTotal += parseFloat(el.textContent);
        });

        document.querySelector("#grand-total span:last-child").textContent =
            "₱" + grandTotal.toFixed(2);
    });
});

document.querySelectorAll(".remove-form").forEach(form => {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const formData = new FormData(this);

        fetch(this.action, {
            method: "POST",
            body: formData
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    this.closest(".cart-box").remove();

                    const uniqueID = this.closest(".cart-box")
                        .querySelector(".qty-input").dataset.id;

                    const summaryRow = document.getElementById("summary-" + uniqueID);
                    if (summaryRow) summaryRow.remove();

                    updateGrandTotal();
                    showPopup(data.message);
                } else {
                    showPopup(data.message, true);
                }
            })
            .catch(() => showPopup("Error removing item!", true));
    });
});

function updateGrandTotal() {
    let grand = 0;
    document.querySelectorAll(".item-total").forEach(el => {
        grand += parseFloat(el.textContent);
    });

    document.querySelector("#grand-total span:last-child").textContent =
        "₱" + grand.toFixed(2);
}

function showPopup(message, error = false) {
    const popup = document.createElement("div");
    popup.textContent = message;

    popup.style.position = "fixed";
    popup.style.top = "20px";
    popup.style.right = "20px";
    popup.style.padding = "15px 25px";
    popup.style.borderRadius = "10px";
    popup.style.fontSize = "20px";
    popup.style.zIndex = "9999";
    popup.style.color = "white";
    popup.style.background = error ? "#ff4d4d" : "#1ec94c";
    popup.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";

    document.body.appendChild(popup);

    setTimeout(() => {
        popup.style.opacity = "0";
        popup.style.transition = "0.5s";
    }, 1500);

    setTimeout(() => popup.remove(), 2000);
}