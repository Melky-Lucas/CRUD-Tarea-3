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

let editingId: number | null = null;

const tbody = document.getElementById("product-list") as HTMLTableSectionElement;
const form = document.getElementById("product-form") as HTMLFormElement;
const formTitle = document.getElementById("form-title") as HTMLHeadingElement;
const inputName = document.getElementById("name") as HTMLInputElement;
const inputCategory = document.getElementById("category") as HTMLInputElement;
const inputPrice = document.getElementById("price") as HTMLInputElement;
const inputStock = document.getElementById("stock") as HTMLInputElement;
const submitBtn = document.getElementById("submit-btn") as HTMLButtonElement;
const cancelBtn = document.getElementById("cancel-btn") as HTMLButtonElement;
const currency = new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" });

function nextId(): number {
  return Math.max(0, ...products.map((p) => p.id)) + 1;
}

function createCell(text: string): HTMLTableCellElement {
  const td = document.createElement("td");
  td.textContent = text;
  return td;
}

function createButton(label: string, className: string, onClick: () => void): HTMLButtonElement {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = label;
  btn.className = className;
  btn.addEventListener("click", onClick);
  return btn;
}

function resetForm(): void {
  editingId = null;
  form.reset();
  formTitle.textContent = "Nuevo producto";
  submitBtn.textContent = "Agregar producto";
  cancelBtn.hidden = true;
}

function startEdit(id: number): void {
  const product = products.find((p) => p.id === id);
  if (!product) return;
  editingId = id;
  inputName.value = product.name;
  inputCategory.value = product.category;
  inputPrice.value = String(product.price);
  inputStock.value = String(product.stock);
  formTitle.textContent = `Editar producto #${id}`;
  submitBtn.textContent = "Guardar cambios";
  cancelBtn.hidden = false;
  form.scrollIntoView({ behavior: "smooth" });
}

function render(): void {
  tbody.innerHTML = "";
  products.forEach((p) => {
    const tr = document.createElement("tr");
    const actions = document.createElement("td");
    actions.className = "actions";
    actions.append(
      createButton("Editar", "edit", () => startEdit(p.id))
    );
    tr.append(
      createCell(String(p.id)),
      createCell(p.name),
      createCell(p.category),
      createCell(currency.format(p.price)),
      createCell(String(p.stock)),
      actions
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

  if (editingId === null) {
    products.push({ id: nextId(), name, category, price, stock });
  } else {
    const product = products.find((p) => p.id === editingId);
    if (product) Object.assign(product, { name, category, price, stock });
  }
  resetForm();
  render();
});

cancelBtn.addEventListener("click", resetForm);

render();
