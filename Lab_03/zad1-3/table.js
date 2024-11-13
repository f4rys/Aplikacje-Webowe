async function getData() {
  const response = await fetch("https://dummyjson.com/products");
  const data = await response.json();
  return data.products.slice(0, 30);
}

function displayData(products) {
  const tableBody = document.querySelector("#dataTable tbody");
  tableBody.innerHTML = "";

  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${index + 1}</td>
            <td><img src="${product.thumbnail}" alt="${
      product.title
    }" width="50"></td>
            <td>${product.title}</td>
            <td>${product.description}</td>
        `;
    tableBody.appendChild(row);
  });
}

function filterData(products, query) {
  return products.filter((product) =>
    product.title.toLowerCase().includes(query.toLowerCase())
  );
}

function sortData(products, order) {
  if (order === "asc") {
    return products.sort((a, b) => a.title.localeCompare(b.title));
  } else if (order === "desc") {
    return products.sort((a, b) => b.title.localeCompare(a.title));
  }
  return products;
}

document.addEventListener("DOMContentLoaded", async () => {
  let products = await getData();
  let originalProducts = [...products];

  const filterInput = document.getElementById("filterInput");
  const sortSelect = document.getElementById("sortSelect");

  const updateTable = () => {
    const filteredData = filterData(originalProducts, filterInput.value);
    const sortedData = sortData(filteredData, sortSelect.value);
    displayData(sortedData);
  };

  filterInput.addEventListener("input", updateTable);
  sortSelect.addEventListener("change", updateTable);

  displayData(products);
});
