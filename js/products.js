async function fetchProducts(options = {}) {
  const { featuredOnly = false, activeOnly = true } = options;

  let query = supabaseClient
    .from("products")
    .select(`
      id, created_at, updated_at, category_id, name, slug, description,
      image_url, brand, model, specifications, is_featured, is_active,
      categories ( id, name, slug )
    `)
    .order("created_at", { ascending: false });

  if (activeOnly) query = query.eq("is_active", true);
  if (featuredOnly) query = query.eq("is_featured", true);

  const { data, error } = await query;
  if (error) throw error;
  return data || [];
}

function productCategory(product) {
  return product.categories?.name || "Uncategorized";
}

function productImage(product) {
  if (product.image_url) {
    return `<img src="${escapeHtml(product.image_url)}" alt="${escapeHtml(product.name)}" loading="lazy">`;
  }
  const initials = (product.name || "PR").slice(0, 2).toUpperCase();
  return `<span>${escapeHtml(initials)}</span>`;
}

function productCard(product) {
  return `<article class="product-card">
    <div class="product-image">${productImage(product)}</div>
    <div class="product-body">
      <span class="category">${escapeHtml(productCategory(product))}</span>
      <h3>${escapeHtml(product.name)}</h3>
      <p>${escapeHtml(product.description || "Product information available in the catalogue.")}</p>
      ${product.brand ? `<small>${escapeHtml(product.brand)}${product.model ? ` · ${escapeHtml(product.model)}` : ""}</small>` : ""}
    </div>
  </article>`;
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;",
    '"': "&quot;", "'": "&#039;"
  }[char]));
}

async function renderProducts(elementId, options = {}) {
  const element = document.getElementById(elementId);
  if (!element) return;
  element.innerHTML = `<div class="empty">Loading products...</div>`;

  try {
    const products = await fetchProducts(options);
    element.innerHTML = products.length
      ? products.map(productCard).join("")
      : `<div class="empty">No products available.</div>`;
  } catch (error) {
    console.error("Error loading products:", error);
    element.innerHTML = `<div class="empty">Unable to load products right now.</div>`;
  }
}

async function initProductsPage() {
  const grid = document.getElementById("allProducts");
  const search = document.getElementById("searchInput");
  const filter = document.getElementById("categoryFilter");
  if (!grid || !search || !filter) return;

  grid.innerHTML = `<div class="empty">Loading products...</div>`;

  try {
    const products = await fetchProducts();
    const categories = [...new Map(
      products
        .filter(p => p.categories)
        .map(p => [p.categories.id, p.categories])
    ).values()].sort((a, b) => a.name.localeCompare(b.name));

    filter.innerHTML = `<option value="all">All categories</option>` +
      categories.map(c => `<option value="${escapeHtml(c.id)}">${escapeHtml(c.name)}</option>`).join("");

    function draw() {
      const q = search.value.toLowerCase().trim();
      const categoryId = filter.value;
      const result = products.filter(product => {
        const matchesCategory = categoryId === "all" || String(product.category_id) === categoryId;
        const haystack = [product.name, product.description, product.brand, product.model, productCategory(product)]
          .filter(Boolean).join(" ").toLowerCase();
        return matchesCategory && haystack.includes(q);
      });
      grid.innerHTML = result.length
        ? result.map(productCard).join("")
        : `<div class="empty">No matching products found.</div>`;
    }

    search.addEventListener("input", draw);
    filter.addEventListener("change", draw);
    draw();
  } catch (error) {
    console.error("Error loading products:", error);
    grid.innerHTML = `<div class="empty">Unable to load products. Check your Supabase RLS policies.</div>`;
  }
}
