import { pruebaPeticion, peticionClinica} from './conexion.js';
function setClinica(clinica){
  let textClinica=document.getElementById("clinica");
  textClinica.textContent=clinica;

}
function imprimirLista(medicamentos) {
  const listaMedicamentos = document.getElementById("listaMedicamentos");
  
  medicamentos.forEach(medicamento => {
    const listItem = document.createElement("li");
    listItem.textContent = medicamento.name+" cantidad: "+ medicamento.cant+" clinica: "+medicamento.clinica+" codigo: "+medicamento.codigo;
    listaMedicamentos.appendChild(listItem);
  });
}
(async () => {
  try {
    let lista=await pruebaPeticion();
    let clinica=await peticionClinica();
    setClinica(clinica);
    imprimirLista(lista)

  } catch (error) {
    console.error("Error al obtener algo:", error);
  }
})();
