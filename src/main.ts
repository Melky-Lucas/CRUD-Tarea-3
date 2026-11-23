interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  stock: number;
}

const products: Product[] = [
  { id: 1, name: "Laptop Lenovo IdeaPad", category: "Tecnología", price: 38500, stock: 12 },
  { id: 2, name: "Mouse inalámbrico", category: "Tecnología", price: 850, stock: 40 },
  { id: 3, name: "Silla ergonómica", category: "Oficina", price: 7900, stock: 8 },
  { id: 4, name: "Cuaderno profesional", category: "Papelería", price: 120, stock: 150 },
  { id: 5, name: "Audífonos Bluetooth", category: "Tecnología", price: 2300, stock: 25 },
];

const tbody = document.getElementById("product-list") as HTMLTableSectionElement;
const form = document.getElementById("product-form") as HTMLFormElement;
const inputName = document.getElementById("name") as HTMLInputElement;
const inputCategory = document.getElementById("category") as HTMLInputElement;
const inputPrice = document.getElementById("price") as HTMLInputElement;
const inputStock = document.getElementById("stock") as HTMLInputElement;
const currency = new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" });

function nextId(): number {
  return Math.max(0, ...products.map((p) => p.id)) + 1;
}

function createCell(text: string): HTMLTableCellElement {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

function render(): void {
  tbody.innerHTML = "";
  products.forEach((p) => {
    const tr = document.createElement("tr");
    tr.append(
      createCell(String(p.id)),
      createCell(p.name),
      createCell(p.category),
      createCell(currency.format(p.price)),
      createCell(String(p.stock))
    );
    tbody.appendChild(tr);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = inputName.value.trim();
  const category = inputCategory.value.trim();
  const price = Number(inputPrice.value);
  const stock = Number(inputStock.value);

  if (!name || !category || !Number.isFinite(price) || price < 0 || !Number.isInteger(stock) || stock < 0) {
    alert("Revisa los datos: todos los campos son obligatorios y deben ser válidos.");
    return;
  }

  products.push({ id: nextId(), name, category, price, stock });
  form.reset();
  render();
});

render();
