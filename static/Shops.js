function showShop(shopName) {
    document.getElementById('shopList').style.display = 'none';
    document.getElementById('backBtn').style.display = 'block';
    document.getElementById('sectionTitle').textContent = shopName.charAt(0).toUpperCase() + shopName.slice(1);
}

function goBack() {
    document.getElementById('shopList').style.display = 'flex';
    document.getElementById('dunkinSection').style.display = 'none';
    document.getElementById('backBtn').style.display = 'none';
    document.getElementById('sectionTitle').textContent = 'Shops';
}

document.querySelectorAll(".ajax-add").forEach(form => {
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
                    showPopup(data.message);
                } else {
                    showPopup(data.message, true);
                }
            })
            .catch(() => {
                showPopup("Login first before adding", true);
            });
    });
});

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