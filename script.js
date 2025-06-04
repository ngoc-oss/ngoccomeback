document.addEventListener("DOMContentLoaded", function () {
  const cartItems = document.getElementById("cart-items");
  const totalPrice = document.getElementById("total-price");
  const buttons = document.querySelectorAll(".add-to-cart");
  const clearBtn = document.getElementById("clear-cart");
  const checkoutBtn = document.getElementById("checkout");
  const popup = document.getElementById("checkout-popup");
  const closePopup = document.getElementById("close-popup");
// Sidebar mở/đóng
const openCartBtn = document.getElementById("open-cart-btn");
const closeCartBtn = document.getElementById("close-cart-btn");
const cartSidebar = document.getElementById("cart-sidebar");
cartSidebar.classList.add("active");

openCartBtn.addEventListener("click", () => {
  cartSidebar.classList.add("active");
});
closeCartBtn.addEventListener("click", () => {
  cartSidebar.classList.remove("active");
});

  let cart = [];

  // TẢI GIỎ HÀNG TỪ localStorage
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }

  // THÊM SẢN PHẨM
  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const name = button.getAttribute("data-name");
      const price = parseInt(button.getAttribute("data-price"));
      addToCart(name, price);
    });
  });

  // THÊM VÀO GIỎ (nếu trùng thì +1)
  function addToCart(name, price) {
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    saveCart();
    renderCart();
    cartSidebar.classList.add("active"); // mở sidebar sau khi thêm sp

  }

  // XOÁ MỘT SẢN PHẨM
  function removeItem(index) {
    cart.splice(index, 1);
    saveCart();
    renderCart();
  }

  // XOÁ TOÀN BỘ
  clearBtn.addEventListener("click", () => {
    if (confirm("Bạn chắc chắn muốn xoá toàn bộ giỏ hàng?")) {
      cart = [];
      saveCart();
      renderCart();
    }
  });

  // HIỂN THỊ GIỎ HÀNG
  function renderCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.name} (x${item.qty}) - ${(item.price * item.qty).toLocaleString()}₫
        <button class="remove-btn" onclick="removeItemFromCart(${index})">Xoá</button>
      `;
      cartItems.appendChild(li);
      total += item.price * item.qty;
    });

    totalPrice.innerText = `Tổng: ${total.toLocaleString()}₫`;
  }

  // LƯU GIỎ HÀNG
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  // THANH TOÁN GIẢ LẬP
  checkoutBtn.addEventListener("click", () => {
    if (cart.length === 0) {
      alert("Giỏ hàng trống!");
      return;
    }

    popup.style.display = "flex";
    cart = [];
    saveCart();
    renderCart();
  });

  closePopup.addEventListener("click", () => {
    popup.style.display = "none";
  });

  // Cho HTML gọi
  window.removeItemFromCart = removeItem;
});

