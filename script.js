const searchForm = document.querySelector(".nav__search-form");
const searchInput = document.querySelector(".nav__input");
const searchIcon = document.querySelector(".nav__search-icon");

searchInput.addEventListener("keypress", (e) => {
  e.preventDefault();
  if (e.key == "Enter") {
    // console.log(typeof searchInput.value);
    if (searchInput.value) searchForm.submit();
  }
});

searchIcon.addEventListener("click", (e) => {
  if (searchInput.value) searchForm.submit();
});

//don hang

var itemList = {
  sp001: {
    name: "Sữa Chua Vị Kiwi",
    price: 21000,
    photo: "./data/images/sanpham/kiwi.jpg",
  },
  sp002: {
    name: "Sữa Chua Vị Xoài",
    price: 22000,
    photo: "./data/images/sanpham/mango.jpg",
  },
  sp003: {
    name: "Sữa Chua Vị Dưa lưới",
    price: 23000,
    photo: "./data/images/sanpham/cantaloupe.jpg",
  },
  sp004: {
    name: "Sữa Chua Vị Mâm Xôi",
    price: 24000,
    photo: "./data/images/sanpham/blackberry.jpg",
  },
  sp005: {
    name: "Sữa Chua Vị Dâu Tây",
    price: 25000,
    photo: "./data/images/sanpham/strawberry.jpg",
  },
  sp006: {
    name: "Sữa Chua Vị Việt Quất",
    price: 26000,
    photo: "./data/images/sanpham/blueberry.jpg",
  },
  sp007: {
    name: "Sữa Chua Vị Bưởi",
    price: 27000,
    photo: "./data/images/sanpham/grapes.jpg",
  },
  sp008: {
    name: "Sữa Chua Vị Táo Xanh",
    price: 28000,
    photo: "./data/images/sanpham/green-apple.jpg",
  },
  sp009: {
    name: "Sữa Chua Vị Dứa",
    price: 29000,
    photo: "./data/images/sanpham/pineapple.jpg",
  },
};

const products = document.querySelectorAll(".product");

products.forEach((item) => {
  let productInput = item.querySelector("input");
  let productButton = item.querySelector("button");

  let productImg = item.querySelector("img");
  productButton.addEventListener("click", () => {
    let productNumber = parseInt(productInput.value);
    console.log(productNumber);
    let productCode = productImg.dataset.code;
    if (!localStorage[productCode]) {
      localStorage.setItem(productCode, productNumber);
    } else {
      let existedNumber = parseInt(localStorage.getItem(productCode));
      if (existedNumber + productNumber > 100)
        localStorage.setItem(productCode, 100);
      else localStorage.setItem(productCode, existedNumber + productNumber);
    }
  });
});

// don hang html
const table = document.querySelector(".donhang");

if (table) {
  const tableBody = table.querySelector("tbody");
  let htmlContent = "";
  let sum = 0;
  for (let sp in itemList) {
    if (localStorage[sp]) {
      let img = itemList[sp].photo;
      let name = itemList[sp].name;
      let price = itemList[sp].price;
      let num = localStorage[sp];
      htmlContent += `
        <tr>
            <td>
                <img src="${img}" width="100" height="100" class="donhang-img"/>
                
            </td>
            <td>
                <p class="donhang-name">${name}</p>
            
            </td>
            <td>
    
                <p class="donhang-soluong">${num}</p>
            
            </td>
            <td>
    
                <p class="donhang-gia">${price}</p>
            
            </td>
            <td>
    
                <p class="donhang-thanhtien">${price * num}</p>
            
            </td>
            <td>
    
                <i class="fa-solid fa-trash donhang-remove" data-code="${sp}"></i>
        
            </td>
        </tr>
        `;
      sum += price * num;
    }
  }
  let currentDate = new Date();
  let day = currentDate.getDay();
  let hour = currentDate.getHours();
  let discount = 0;
  if (
    day <= 3 &&
    day >= 1 &&
    ((hour >= 7 && hour <= 11) || (hour >= 13 && hour <= 17))
  )
    discount = 0.1;
  console.log(discount);
  table.querySelector(".table__A").innerHTML = sum;
  table.querySelector(".table__B").innerHTML = sum * discount;
  table.querySelector(".table__C").innerHTML = 0.1 * (sum - sum * discount);
  table.querySelector(".table__D").innerHTML =
    sum + sum * discount + 0.1 * (sum - sum * discount);

  tableBody.innerHTML = htmlContent;

  const removeBtns = document.querySelectorAll(".donhang-remove");
  removeBtns.forEach((btn) => {
    let code = btn.dataset.code;
    btn.addEventListener("click", () => {
      localStorage.removeItem(code);
      window.location.href = "/donhang.html";
    });
  });
}

function goToDonhang() {
  console.log("goto don hang");
  window.location.href = "/donhang.html";
}

const cart = document.querySelector(".nav__cart");
cart.onclick = goToDonhang;

window.onstorage = () => {
  location.href = "/donhang.html";
};
