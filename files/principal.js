import { pruebaPeticion } from './conexion.js';
function imprimirLista(lista) {
  const contenedor = document.getElementById("lista");

  // Crea un elemento de lista ul
  const ul = document.createElement("ul");
  
  // Itera sobre la lista de nombres y crea un elemento de lista li para cada nombre
  nombres.forEach((name) => {
    // Crea un elemento de lista li
    const li = document.createElement("li");
  
    // Establece el texto del elemento de lista li como el nombre actual
    li.textContent = nombre;
  
    // Agrega el elemento de lista li al elemento de lista ul
    ul.appendChild(li);
  });
  
  // Agrega el elemento de lista ul al contenedor
  contenedor.appendChild(ul);
}
(async () => {
  try {
    let lista=await pruebaPeticion();
    imprimirLista(lista)
  } catch (error) {
    console.error("Error al obtener el valor del nodo:", error);
  }
})();
