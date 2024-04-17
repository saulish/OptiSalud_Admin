import {peticionClinica,xd, nuevo} from './conexion10.js';

let clinica,medicamento;
(async () => {
    try {
        await xd();
  
        clinica=  await peticionClinica();
        medicamento = {
            name:"",
            cant: 0,
            clinica: clinica,
            codigo: ""
        };

  
    } catch (error) {
      console.error("Error al obtener la clinica: ",error);
    }
  })();

  document.getElementById("form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que se envíe el formulario de forma predeterminada

    // Obtener los valores del formulario
    const nombre = document.getElementById("nombre").value;
    const cantidad = document.getElementById("cantidad").value;
    const codigo = document.getElementById("codigo").value;

    medicamento.name = nombre;
    medicamento.cant = cantidad;
    medicamento.codigo = codigo;

    try {
        const resultado = await nuevo(medicamento, clinica);
        if (resultado === true) {
            window.location.href = "principal.html";
        } else {
            //alert("Hubo un error al crear el medicamento. Por favor, inténtalo de nuevo.");
        }
    } catch (error) {
        console.error("Error al crear el medicamento:", error);
        alert("Hubo un error al crear el medicamento. Por favor, inténtalo de nuevo.");
    }
});




