import { login } from './conexion.js';
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
//añadir si el formulario es null y de ser asi retornar a conexion



const boton = document.getElementById("boton");
if(boton != null){
  boton.addEventListener('click', async (event) => {
    event.preventDefault(); // Evitar que el formulario se envíe por defecto
  
    try {
      await login(); // Intentar iniciar sesión
      alert("Inicio de sesión exitoso");
      window.location.href = "principal.html"; // Redirigir después del inicio de sesión exitoso
    } catch (error) {
      alert("Error de inicio de sesión: " + error.message);
    }
  });
}




