
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, child, get,set } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";
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




export function xd(){

 return new Promise((resolve, reject) => {
    try {
      const omg = ref(database, 'prueba');

      get(omg)
     
        .then((snapshot) => {
          if (snapshot.exists()) {
            console.log(snapshot.val());
            resolve(snapshot.val());
          } else {
            console.log("1'");
            resolve(0);
          }
        })
        .catch((error) => {
          console.error("2");
          reject(error);
        });
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });

}
// conexion.js

// Función para iniciar sesión
export function login() {
  let correo = document.getElementById("correo").value;
  let contraseña = document.getElementById("contrasena").value;

  return signInWithEmailAndPassword(auth, correo, contraseña);
}
export function nuevoMed(Nname, Ncant, Ncodigo, Nclinica) {
  return new Promise((resolve, reject) => {
    try {
      // Obtén una referencia al nodo donde deseas almacenar el nuevo medicamento
      const medicamentoRef = ref(database, 'medicamentos/' + Nname );
      const newMed={
        codigo:Ncodigo,
        [Nclinica]: {
          cantidad: Ncant
        }    
      }
      console.log(newMed);


      // Almacena los datos del nuevo medicamento
      set(medicamentoRef, newMed)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error("Error al crear el nuevo medicamento:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error al crear el nuevo medicamento:", error);
      reject(error);
    }
  });
}
export function actualizarBD(medicamento, nuevaCantidad) {
  return new Promise((resolve, reject) => {
    try {
      // Obtén una referencia al nodo que deseas actualizar
      const medicamentoRef = ref(database, 'medicamentos/' + medicamento.name + '/' + medicamento.clinica + '/cantidad');

      // Realiza la actualización de la cantidad del medicamento
      set(medicamentoRef, nuevaCantidad)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          console.error("Error al actualizar la cantidad del medicamento:", error);
          reject(error);
        });
    } catch (error) {
      console.error("Error al actualizar la cantidad del medicamento:", error);
      reject(error);
    }
  });

}
export function peticionClinica(){

  let user=auth.currentUser.email; 
  console.log(user);
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

export function pruebaPeticion(clinica) {
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
              const medicamentoActual = medicamentos[medicamentoKey];
              codigo=medicamentoActual.codigo;

              medicamento = {
                name: nombreMedicamento,
                cant: medicamentoActual[clinica].cantidad,
                clinica: clinica, 
                codigo: codigo 
              };
              listMeds.push(medicamento);
            });

            //console.log("Datos obtenidos de 'medicamentos':", listMeds);  
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

