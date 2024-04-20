import { pruebaPeticion, peticionClinica,xd, actualizarBD,eliminarNodoClinica,salirSesion} from './conexion3.js';
function setClinica(clinica){
  let textClinica=document.getElementById("clinica");
  textClinica.textContent=clinica;

}

let clinica,lista=[];
function actualizarCantidad(medicamento, nuevaCantidad) {
  if(nuevaCantidad<0){
    alert("No se puede tener una cantidad negativa de medicamentos");
    pedirLista();
    return;}
    try {
  
       actualizarBD(medicamento, nuevaCantidad);

  
    } catch (error) {
      console.error(error);
    }  
}
const selectorOrden = document.getElementById("ordenarPor");
selectorOrden.addEventListener("change", () => {
  const criterio = selectorOrden.value;
  imprimirLista(lista.sort((a, b) => a[criterio].localeCompare(b[criterio])));
});
const searchInput = document.getElementById("searchInput");


export function cerrarSesion() {
  if(confirm("¿Estás seguro de que deseas cerrar sesión?")){
    salirSesion();
    window.location.href = "index.html";
  }
}

const logOutLink = document.getElementById("logOut");
    logOutLink.addEventListener("click", cerrarSesion);

// Agregar un evento de escucha para cada vez que se modifique el valor del input
searchInput.addEventListener("input", function() {
  // Obtener el valor actual del input de búsqueda
  const searchTerm = searchInput.value.toLowerCase().trim();

  // Filtrar la lista de medicamentos
  const filteredMedicamentos = lista.filter(medicamento => {
    // Convertir el nombre del medicamento a minúsculas y eliminar espacios en blanco
    const lowerCaseName = medicamento.name.toLowerCase().trim();
    // Verificar si el nombre del medicamento comienza con el término de búsqueda
    return lowerCaseName.startsWith(searchTerm);
  });
  imprimirLista(filteredMedicamentos)
});
function imprimirLista(medicamentos) {
  const cuerpoTabla = document.getElementById("cuerpoTabla");

  // Limpiar el cuerpo de la tabla
  cuerpoTabla.innerHTML = '';

  medicamentos.forEach(medicamento => {
    const fila = document.createElement("tr");

    const nombreCell = document.createElement("td");
    nombreCell.textContent = medicamento.name;
    fila.appendChild(nombreCell);

    const cantidadCell = document.createElement("td");
    const cantidadInput = document.createElement("input");
    cantidadInput.type = "number";
    cantidadInput.value = medicamento.cant;
    cantidadInput.addEventListener("blur", () => {
      actualizarCantidad(medicamento, cantidadInput.value);
    });
    cantidadCell.appendChild(cantidadInput);
    fila.appendChild(cantidadCell);

    const clinicaCell = document.createElement("td");
    clinicaCell.textContent = medicamento.clinica;
    fila.appendChild(clinicaCell);

    const codigoCell = document.createElement("td");
    codigoCell.textContent = medicamento.codigo;
    fila.appendChild(codigoCell);

    // Botón Eliminar
    const eliminarCell = document.createElement("td");
    const eliminarButton = document.createElement("button");
    eliminarButton.textContent = "Eliminar";
    eliminarButton.addEventListener("click", () => {
      if (confirm("¿Estás seguro de que deseas eliminar este medicamento?")) {
        eliminarMedicamento(medicamento.name,medicamento.codigo);
      }
    });
    eliminarCell.appendChild(eliminarButton);
    fila.appendChild(eliminarCell);

    cuerpoTabla.appendChild(fila);
  });
}

async function pedirLista(){
  lista=await pruebaPeticion(clinica);  
  imprimirLista(lista.sort((a, b) => a.name.localeCompare(b.name)));

}
// Función para eliminar el medicamento (solo muestra un alert)
function eliminarMedicamento(nombreMedicamento,codigo) {
    //alert("Medicamento eliminado: " + nombreMedicamento)
    console.log("Se eliminara el medicamento "+nombreMedicamento+" de la clinica "+clinica);
    alert("Se eliminara el medicamento "+nombreMedicamento+" de la clinica "+clinica);
    eliminarNodoClinica(nombreMedicamento,clinica,codigo);
    const index = lista.findIndex(medicamento => medicamento.name === nombreMedicamento);
    lista.splice(index, 1);
    imprimirLista(lista.sort((a, b) => a.name.localeCompare(b.name)));



}


(async () => {
  try {
    await xd();

    clinica=  await peticionClinica();

    //lista=await pruebaPeticion(clinica);
    pedirLista();
    setClinica(clinica);
    //imprimirLista(lista)

  } catch (error) {
    alert("Inicia sesion antes");
    window.location.href = "index.html";

    
  }
})();
