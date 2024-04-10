import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js";
// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwXqH7LUCSJdKhPHpXWDq1QgSn50FnWAY",
  authDomain: "prueba-4eea4.firebaseapp.com",
  databaseURL: "https://prueba-4eea4-default-rtdb.firebaseio.com",
  projectId: "prueba-4eea4",
  storageBucket: "prueba-4eea4.appspot.com",
  messagingSenderId: "1053257691964",
  appId: "1:1053257691964:web:cd8e562ee02b31d43d2439",
  measurementId: "G-4KE0E1HJEL"
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);
const auth = getAuth();
// Función para iniciar sesión con email y contraseña





// conexion.js

// Función para iniciar sesión
export function login() {
  let correo = document.getElementById("correo").value;
  let contraseña = document.getElementById("contrasena").value;

  return signInWithEmailAndPassword(auth, correo, contraseña);
}





export async function pruebaPeticion() {
  try {
    // Obtén una referencia al nodo que deseas leer
    const medicamentosRef = ref(database, 'medicamentos');
    // Realiza la consulta para obtener el valor del nodo
    const snapshot = await get(medicamentosRef);

    if (snapshot.exists()) {
      // Obtén el valor del nodo "medicamentos"
      const medicamentos = snapshot.val();

      // Itera sobre cada medicamento dentro de "medicamentos"
      Object.keys(medicamentos).forEach((medicamentoKey) => {
        // Obtiene el nombre del medicamento
        const medicamentoNombre = medicamentos[medicamentoKey].nombre;
        console.log("Medicamento:", medicamentoNombre);

        // Itera sobre cada presentación del medicamento
        Object.keys(medicamentos[medicamentoKey]).forEach((presentacionKey) => {
          // Verifica que no sea el nombre del medicamento
          if (presentacionKey !== 'nombre') {
            // Obtiene los detalles de la presentación
            const presentacion = medicamentos[medicamentoKey][presentacionKey];
            console.log("Presentación:", presentacionKey);
            console.log("Cantidad:", presentacion.cantidad);
          }
        });
      });
    } else {
      // Devuelve un mensaje si no existe
      return "El nodo no existe";
    }
  } catch (error) {
    // Devuelve el error si ocurre uno
    throw error;
  }
}

  /*

  const medicamentosRef = ref(database, 'medicamentos');

// Realiza la consulta para obtener los datos de "medicamentos"
get(medicamentosRef)
  .then((snapshot) => {
    if (snapshot.exists()) {
      // Obtén el valor del nodo "medicamentos"
      const medicamentos = snapshot.val();

      // Itera sobre cada medicamento dentro de "medicamentos"
      Object.keys(medicamentos).forEach((medicamentoKey) => {
        // Obtiene el nombre del medicamento
        const medicamentoNombre = medicamentos[medicamentoKey].nombre;
        console.log("Medicamento:", medicamentoNombre);

        // Itera sobre cada presentación del medicamento
        Object.keys(medicamentos[medicamentoKey]).forEach((presentacionKey) => {
          // Verifica que no sea el nombre del medicamento
          if (presentacionKey !== 'nombre') {
            // Obtiene los detalles de la presentación
            const presentacion = medicamentos[medicamentoKey][presentacionKey];
            console.log("Presentación:", presentacionKey);
            console.log("Cantidad:", presentacion.cantidad);
          }
        });
      });
    } else {
      console.log("No hay datos en el nodo 'medicamentos'");
    }
  })
  .catch((error) => {
    console.error("Error al obtener datos de 'medicamentos':", error);
  });
  */
