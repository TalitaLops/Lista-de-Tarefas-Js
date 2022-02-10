'use strict';

//"Banco de dados"
let lembrete = [
  { objetivo: "Build a modern To do app", status: "checked" },
  { objetivo: "Workout for 30 minutes at the gym", status: "" },
  { objetivo: "Buy groceries (milk, vegetables, fruits, fish)", status: "" },
  { objetivo: "Clean the house and backyard", status: "" },
  { objetivo: "Take the car to the autoshop for an oil change", status: "" },
];

// Função para criar novo item
const criarTarefa = (titulo, status, indice) => {
  const tarefa = document.createElement("label");
  tarefa.classList.add("tarefas");
  tarefa.innerHTML = `
        <input type="checkbox" name="item" ${status} data-indice=${indice}/>
        <p>${titulo}</p>
        <button id="botaoExcluir" data-indice=${indice}><img src="img/icons8-excluir-30.png"/></button>
    `;
  document.getElementById("listaItens").appendChild(tarefa);
};
// Criar item com "Enter" e botão
const addItem = (evento) => {
  const tecla = evento.key;
  const texto = evento.target.value;
  const buttonAdd = evento.target;

  if (tecla === "Enter" || buttonAdd.id === "addNew") {
    lembrete.push({ objetivo: texto, status: "" });
    atualizarLista();
  } 
};

document.getElementById("new").addEventListener("keypress", addItem);
document.getElementById("novoItem").addEventListener("click",addItem);


// Função para "mais opções"
var more = document.querySelector("#more");
more.addEventListener("click", function () {
  var opcoes = document.querySelector("#opcoes");

  if (opcoes.style.display === "none") {
    opcoes.style.display = "block";
  } else {
    opcoes.style.display = "none";
  }
});

// Função marcar tudo
function check(checked = true) {
  const checkboxes = document.querySelectorAll('input[name="item"]');
  checkboxes.forEach((checkbox) => {
    checkbox.checked = checked;
  });
}
const btn = document.querySelector("#completo");
btn.onclick = checkAll;
function checkAll() {
  check();
  this.onclick = uncheckAll;
}
function uncheckAll() {
  check(false);
  this.onclick = checkAll;
}

// Função fechar item
const apagarTarefa = (indice) => {
  lembrete.splice(indice, 1);
  atualizarLista();
};
const click = (evento) => {
  const elemento = evento.target;
  if (elemento.id === "botaoExcluir") {
    const indice = elemento.dataset.indice;
    apagarTarefa(indice);
  }
};
document.getElementById("listaItens").addEventListener("click", click);

const atualizarLista = () => {
  limparLista();
  lembrete.forEach((tarefa, indice) =>
    criarTarefa(tarefa.objetivo, tarefa.status, indice)
  );
};



atualizarLista();