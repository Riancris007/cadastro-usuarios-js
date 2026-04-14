const form = document.getElementById("userForm");
const userIdInput = document.getElementById("userId");
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const telefoneInput = document.getElementById("telefone");
const tableBody = document.getElementById("userTableBody");

let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

function salvarLocalStorage() {
  localStorage.setItem("usuarios", JSON.stringify(usuarios));
}

function renderizarUsuarios() {
  tableBody.innerHTML = "";

  usuarios.forEach((usuario, index) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${usuario.nome}</td>
      <td>${usuario.email}</td>
      <td>${usuario.telefone}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editarUsuario(${index})">Editar</button>
        <button class="action-btn delete-btn" onclick="excluirUsuario(${index})">Excluir</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const nome = nomeInput.value.trim();
  const email = emailInput.value.trim();
  const telefone = telefoneInput.value.trim();
  const userId = userIdInput.value;

  if (!nome || !email || !telefone) {
    alert("Preencha todos os campos.");
    return;
  }

  const usuario = { nome, email, telefone };

  if (userId === "") {
    usuarios.push(usuario);
  } else {
    usuarios[userId] = usuario;
  }

  salvarLocalStorage();
  renderizarUsuarios();
  form.reset();
  userIdInput.value = "";
});

function editarUsuario(index) {
  const usuario = usuarios[index];

  nomeInput.value = usuario.nome;
  emailInput.value = usuario.email;
  telefoneInput.value = usuario.telefone;
  userIdInput.value = index;
}

function excluirUsuario(index) {
  const confirmar = confirm("Deseja realmente excluir este usuário?");
  if (confirmar) {
    usuarios.splice(index, 1);
    salvarLocalStorage();
    renderizarUsuarios();
  }
}

renderizarUsuarios();