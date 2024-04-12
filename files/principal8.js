import { pruebaPeticion, peticionClinica,xd, actualizarBD} from './conexion4.js';
function setClinica(clinica){
  let textClinica=document.getElementById("clinica");
  textClinica.textContent=clinica;

}


function actualizarCantidad(medicamento, nuevaCantidad) {
  //(async () => {
    try {
  
      //alert("Se actualizó la cantidad del medicamento:", medicamento.name, "a", nuevaCantidad);

       actualizarBD(medicamento, nuevaCantidad);

  
    } catch (error) {
      console.error(error);
    }  
  //});
}


function imprimirLista(medicamentos) {
  const cuerpoTabla = document.getElementById("cuerpoTabla");

  
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

    cuerpoTabla.appendChild(fila);
});
}

/*
let clinica;
(async () => {
  try {

  
    clinica=  await peticionClinica();
    alert(clinica);
    setClinica(clinica);

  } catch (error) {
    console.error("Error al obtener clinica:");
  }
})();*/
(async () => {
  try {
    await xd();

    let clinica=  await peticionClinica();

    let lista=await pruebaPeticion(clinica);
    setClinica(clinica);
    imprimirLista(lista)

  } catch (error) {
    console.error("Error al obtener algo:");
  }
})();
