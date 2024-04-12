
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




export function pruebaPeticion() {
  let medicamento,cantidad,codigo;
  return new Promise((resolve, reject) => {
    let listMeds = [];
    try {
      // Obtén una referencia al nodo que deseas leer
      const medicamentosRef = ref(database, 'medicamentos');

      // Realiza la consulta para obtener los datos de "medicamentos"
      get(medicamentosRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Obtén el valor del nodo "medicamentos"
            const medicamentos = snapshot.val();

            // Itera sobre cada medicamento dentro de "medicamentos"
Object.keys(medicamentos).forEach((medicamentoKey) => {
  // Obtén el nombre del medicamento
  const nombreMedicamento = medicamentoKey;

  // Obtén el objeto de medicamento actual
  const medicamentoActual = medicamentos[medicamentoKey];
  codigo=medicamentoActual.codigo;


  //EN VEZ DE ITERAR DE CLINICA EN CLINICA, SIMPLEMENTE USA LA CLINICA DEL ADMINISTRADOR PEDIDA ANTES


  Object.keys(medicamentoActual).forEach((clinicaKey) => {
    // Salta si la clave actual es "nombre" (esto depende de la estructura real de tus datos)
    if (clinicaKey === "nombre") return;

    // Obtén la cantidad para esta clínica
     cantidad = medicamentoActual[clinicaKey].cantidad;
    // Obtén el código para esta clínica

    // Crea el objeto medicamento con los datos recopilados
    if (cantidad!=undefined){
      medicamento = {
        name: nombreMedicamento,
        cant: cantidad,
        clinica: clinicaKey, 
        codigo: codigo 
      };
    }


  });
  listMeds.push(medicamento);
  
});


    resolve(listMeds);
     } else {
            console.log("No hay datos en el nodo 'medicamentos'");
            resolve([]);
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos de 'medicamentos':", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error al obtener datos de 'medicamentos':", error);
      reject(error);
    }
  });
}

export function peticionClinica(){
  alert(auth.currentUser.email)
  let user=auth.currentUser.email; 
  user=user.replace(".","");
  return new Promise((resolve, reject) => {
    try {
      // Obtén una referencia al nodo que deseas leer
      const clinicaRef = ref(database, 'administradores/'+user+'/clinica');

      // Realiza la consulta para obtener los datos de "clinica"
      get(clinicaRef)
     
        .then((snapshot) => {
          if (snapshot.exists()) {
            // Obtén el valor del nodo "clinica"
            const clinica = snapshot.val();
            //console.log(clinica);
            resolve(clinica);
          } else {
            console.log("No hay datos en el nodo 'clinica'");
            resolve([]);
          }
        })
        .catch((error) => {
          console.error("Error al obtener datos de 'clinica':", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error al obtener datos de 'clinica':", error);
      reject(error);
    }
  });
}