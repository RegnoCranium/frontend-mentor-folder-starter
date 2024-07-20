fetch("data.json")
  .then((response) => response.json())
  .then((data) => {
    const main = document.getElementById("food-items");

    data.forEach((item) => {
      const foodItem = document.createElement("div");
      foodItem.classList.add("food-item");
      const itemId = `${item.name.toLowerCase().replace(/\s/g, "-")}`;

      foodItem.innerHTML = `
        <div class="food-header-container">
          <img class="mobile-img" src="${item.image.mobile}" alt="Img of ${
        item.name
      }" data-id="${itemId}"/>
          <img class="pc-img" src="${item.image.desktop}" alt="Img of ${
        item.name
      }" />
          <div class="btns-container" data-id="${itemId}">
            <div class="add-btn-container">
              <button class="add-to-cart-btn" data-id="${itemId}" data-price="${
        item.price
      }" data-thumbnail="${item.image.thumbnail}">
                <img class="cart-svg" src="./assets/images/icon-add-to-cart.svg" alt="Add to cart icon"> 
                <span>Add to Cart</span>
              </button>
            </div>
            <div class="change-amount-container" style="display: none;">
              <button class="decrease-btn" data-id="${itemId}"><img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement icon"/></button>
              <div class="amount" data-id="${itemId}">1</div>
              <button class="increase-btn" data-id="${itemId}"><img src="./assets/images/icon-increment-quantity.svg" alt="Increment icon"/></button>
            </div>
          </div>
        </div>
        <div class="food-info">
          <div class="category">${item.category}</div>
          <div class="name">${item.name}</div>
          <div class="price">$${item.price.toFixed(2)}</div>
        </div>
      `;
      main.appendChild(foodItem);
    });

    const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
    const increaseBtns = document.querySelectorAll(".increase-btn");
    const decreaseBtns = document.querySelectorAll(".decrease-btn");
    const confirmOrderBtn = document.querySelector(".confirm-order-btn");
    const closeConfirmBtn = document.querySelector(".close-confirmed");

    const cart = {};

    const updateCartDisplay = () => {
      const cartDisplay = document.getElementById("cart");
      const emptyCartFiller = document.querySelector(".cart-empty");
      cartDisplay.innerHTML = "";

      for (const [id, { quantity, price }] of Object.entries(cart)) {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("cart-element");
        itemDiv.innerHTML = `<div class="cart-element-info">
            <span class="cart-element-name">${id.replace(/-/g, " ")}</span>  
          <div>
            <span class="cart-element-quantity">${quantity}x</span>  
            <span class="cart-element-price">@ $${price.toFixed(
              2
            )}</span> <span class="cart-element-total">$${(
          price * quantity
        ).toFixed(2)}</span>
          </div>
        </div>`;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerHTML =
          '<img src="./assets/images/icon-remove-item.svg" alt="Remove icon" />';
        deleteBtn.addEventListener("click", () => {
          delete cart[id];
          updateCartDisplay();
          toggleButtons(id, true);
        });

        updateAmountDisplay(id);
        itemDiv.appendChild(deleteBtn);
        cartDisplay.appendChild(itemDiv);
      }

      if (Object.keys(cart).length === 0) {
        emptyCartFiller.style.display = "flex";
      } else {
        emptyCartFiller.style.display = "none";
      }
      updateTotal();
    };

    const updateTotal = () => {
      const totalContainer = document.querySelector(".total-container");
      const cartAmount = document.querySelector("#cart-amount");

      if (Object.keys(cart).length === 0) {
        totalContainer.style.display = "none";
        cartAmount.textContent = "0";
        return;
      }

      let totalPrice = 0;
      let totalQuantity = 0;

      for (const [id, { quantity, price }] of Object.entries(cart)) {
        totalPrice += price * quantity;
        totalQuantity += quantity;
      }

      const totalDisplay = document.querySelector(".total");
      cartAmount.textContent = totalQuantity;
      totalDisplay.textContent = `$${totalPrice.toFixed(2)}`;
      totalContainer.style.display = "block";
    };

    const updateAmountDisplay = (id) => {
      const amountContainer = document.querySelector(
        `.amount[data-id="${id}"]`
      );

      const amount = cart[id] === undefined ? 1 : cart[id].quantity;
      amountContainer.textContent = `${amount}`;
    };

    const updateHighlight = (id, turnOn) => {
      const img = document.querySelector(`img[data-id="${id}"]`);
      const btnsContainer = document.querySelector(
        `.btns-container[data-id="${id}"]`
      );

      if (turnOn) {
        img.classList.add("highlight");
        btnsContainer.classList.add("highlight-border-btn");
      } else {
        img.classList.remove("highlight");
        btnsContainer.classList.remove("highlight-border-btn");
      }
    };

    const toggleButtons = (id, showAddButton) => {
      const addBtnContainer = document.querySelector(
        `.add-to-cart-btn[data-id="${id}"]`
      ).parentElement;
      const changeAmountContainer = document.querySelector(
        `.increase-btn[data-id="${id}"]`
      ).parentElement;

      if (showAddButton) {
        addBtnContainer.style.display = "block";
        changeAmountContainer.style.display = "none";
      } else {
        addBtnContainer.style.display = "none";
        changeAmountContainer.style.display = "flex";
      }

      updateHighlight(id, !showAddButton);
    };

    addToCartBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        const price = parseFloat(btn.getAttribute("data-price"));
        const thumbnail = btn.getAttribute("data-thumbnail");
        cart[id] = { quantity: 1, price, thumbnail };
        updateCartDisplay();
        toggleButtons(id, false);
      });
    });

    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        cart[id].quantity += 1;
        updateCartDisplay();
      });
    });

    decreaseBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-id");
        if (cart[id].quantity > 1) {
          cart[id].quantity -= 1;
        } else {
          delete cart[id];
          toggleButtons(id, true);
        }
        updateCartDisplay();
      });
    });

    const updateConfirmedDisplay = () => {
      const confirmedDisplay = document.querySelector(".confirmed-food-items");
      confirmedDisplay.innerHTML = "";
      const totalDisplay = document.querySelector(".confirmed-total");
      let total = 0;
      for (const [id, { quantity, price, thumbnail }] of Object.entries(cart)) {
        total += quantity * price;
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("confirmed-food-item");
        itemDiv.innerHTML = `<img src="${thumbnail}" alt="Thumbnail"/>
          <div class="confirmed-food-info">
            <div class="confirmed-food-main">
              <div class="cart-element-name truncate">${id.replace(
                /-/g,
                " "
              )}</div>
              <span>
                <div class="cart-element-quantity">${quantity}x</div>
                <div class="cart-element-price">@ $${price.toFixed(2)}</div>
              </span>
            </div>
            <div class="cart-element-total" style="color: hsl(14, 65%, 9%)">
              $${(price * quantity).toFixed(2)}
            </div>
          </div>`;
        confirmedDisplay.appendChild(itemDiv);
      }

      totalDisplay.textContent = `$${total.toFixed(2)}`;
    };

    confirmOrderBtn.addEventListener("click", () => {
      updateConfirmedDisplay();
      for (let foodItem in cart) {
        delete cart[foodItem];
        toggleButtons(foodItem, true);
      }
      updateCartDisplay();
      const confirm = document.querySelector(".confirmed-msg-bg");
      confirm.style.display = "flex";
      document.querySelector("body").style.overflow = "hidden";
    });

    closeConfirmBtn.addEventListener("click", () => {
      const confirm = document.querySelector(".confirmed-msg-bg");
      confirm.style.display = "none";
      updateConfirmedDisplay();
      document.querySelector("body").style.overflow = "auto";
    });
  })
  .catch((error) => console.error("Error fetching the data: ", error));
