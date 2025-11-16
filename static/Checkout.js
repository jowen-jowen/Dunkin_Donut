document.getElementById("orderForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let formData = new FormData(this);

    fetch("{{ url_for('confirm_order') }}", {
        method: "POST",
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            showPopup("Order Confirmed");

            setTimeout(() => {
                window.location.href = "/";
            }, 2000);
        } else {
            showPopup(data.message, true);
        }
    })
});
function showPopup(message, error = false) {
    const popup = document.createElement("div");
    popup.textContent = message;

    popup.style.position = "fixed";
    popup.style.top = "50%";
    popup.style.left = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    popup.style.padding = "30px 60px";
    popup.style.fontSize = "40px";
    popup.style.borderRadius = "20px";
    popup.style.zIndex = "9999";
    popup.style.color = "white";
    popup.style.background = error ? "#ff4d4d" : "#1ec94c";
    popup.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
    popup.style.opacity = "0";
    popup.style.transition = "opacity 0.4s ease-in-out";

    document.body.appendChild(popup);

    setTimeout(() => popup.style.opacity = "1", 50);

    setTimeout(() => {
        popup.style.opacity = "0";
        setTimeout(() => popup.remove(), 400);
    }, 1500);
}