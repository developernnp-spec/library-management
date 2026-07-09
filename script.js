let data = JSON.parse(localStorage.getItem("books")) || [];
let editIndex = null;
let filteredData = null;

/* =========================
   LOAD DATA
========================= */
function readAll() {
    displayData();
}

/* =========================
   DISPLAY TABLE
========================= */
function displayData() {

    let table = document.getElementById("bookContainer");
    if (!table) return;

    let html = "";

    let showData = filteredData || data;

    showData.forEach((d) => {

        let index = data.indexOf(d);

        if (editIndex === index) {

            html += `
            <tr>
                <td><input value="${d.name}" id="name${index}"></td>
                <td><input value="${d.author}" id="author${index}"></td>
                <td><input value="${d.category}" id="category${index}"></td>
                <td><input value="${d.year}" id="year${index}"></td>
                <td><input value="${d.count}" id="count${index}"></td>

                <td>
                    <button onclick="saveEdit(${index})">Save</button>
                    <button onclick="cancelEdit()">Cancel</button>
                </td>
            </tr>
            `;

        } else {

            html += `
            <tr>
                <td>${d.name}</td>
                <td>${d.author}</td>
                <td>${d.category}</td>
                <td>${d.year}</td>
                <td>${d.count}</td>

                <td>
                <button class="view-btn" onclick="viewImage('${d.image}')">View</button>
                    <button class="edit-btn" onclick="startEdit(${index})">Edit</button>
                    <button class="delete-btn" onclick="deleteBook(${index})">Delete</button>
                    
                </td>
            </tr>
            `;
        }
    });

    table.innerHTML = html;
}

/* =========================
   ADD BOOK (CREATE PAGE)
========================= */
function add(e) {
    e.preventDefault();

    let name = document.querySelector(".name").value;
    let author = document.querySelector(".Author").value;
    let category = document.querySelector(".Category").value;
    let year = document.querySelector(".Year").value;
    let count = document.querySelector(".number").value;
    let image = document.getElementById("preview").src || "";

    if (!name || !author || !category || !year || !count) {
        alert("⚠️ Please fill all fields");
        return;
    }

    let newBook = { name, author, category, year, count, image };

    data.push(newBook);

    localStorage.setItem("books", JSON.stringify(data));

    alert("✅ Book Added");

    window.location.href = "index.html";
}

/* =========================
   EDIT
========================= */
function startEdit(index) {
    editIndex = index;
    displayData();
}

function saveEdit(index) {

    data[index] = {
        name: document.getElementById(`name${index}`).value,
        author: document.getElementById(`author${index}`).value,
        category: document.getElementById(`category${index}`).value,
        year: document.getElementById(`year${index}`).value,
        count: document.getElementById(`count${index}`).value,
        image: data[index].image // keep image
    };

    localStorage.setItem("books", JSON.stringify(data));

    editIndex = null;

    alert("✅ Updated");

    displayData();
}

function cancelEdit() {
    editIndex = null;
    displayData();
}

/* =========================
   DELETE
========================= */
function deleteBook(index) {

    if (confirm("❌ Delete this book?")) {

        data.splice(index, 1);

        localStorage.setItem("books", JSON.stringify(data));

        displayData();
    }
}

/* =========================
   SEARCH
========================= */
let searchInput = document.querySelector(".search input");

if (searchInput) {
    searchInput.addEventListener("input", function () {

        let value = this.value.toLowerCase();

        if (value === "") {
            filteredData = null;
        } else {
            filteredData = data.filter(book =>
                book.name.toLowerCase().includes(value)
            );
        }

        displayData();
    });
}

/* =========================
   IMAGE PREVIEW (CREATE PAGE)
========================= */
let imageInput = document.getElementById("imageInput");
let preview = document.getElementById("preview");

if (imageInput) {
    imageInput.addEventListener("change", function () {

        let file = this.files[0];

        if (file) {
            let reader = new FileReader();

            reader.onload = function (e) {
                preview.src = e.target.result;
            };

            reader.readAsDataURL(file);
        }
    });
}
function viewImage(src) {

    if (!src) {
        alert("No Image Available");
        return;
    }

    let modal = document.getElementById("imageModal");
    let img = document.getElementById("modalImg");

    modal.style.display = "block";
    img.src = src;

    // 🔥 prevent background scroll
    document.body.style.overflow = "hidden";
}

function closeModal() {

    let modal = document.getElementById("imageModal");

    modal.style.display = "none";

    // 🔥 enable scroll back
    document.body.style.overflow = "auto";
}
