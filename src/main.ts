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
const currency = new Intl.NumberFormat("es-DO", { style: "currency", currency: "DOP" });

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

render();
