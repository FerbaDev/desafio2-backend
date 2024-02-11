const { error } = require("console");
const fs = require("fs");
const rutaSin = "./ejemplo-sin.txt";

fs.writeFileSync(rutaSin, "Hola mundo!");

//como leer un archivo
//ruta y codificacion utf-8
let contenido = fs.readFileSync(rutaSin, "utf-8");
console.log(contenido);

//verificar si el archivo existe
if (fs.existsSync("./firulais.txt")) {
  let res = fs.readFileSync("./firulais.txt", "utf-8");
  console.log(res);
} else {
  console.log("No existe el archivo");
}

//actualizar contenidos
fs.writeFileSync(rutaSin, "actualizacion de hola mundo.");
//puedo agregar mas contenido

fs.appendFileSync(rutaSin, " agregando contenido al final");

// eliminar

fs.unlinkSync(rutaSin);

// crear archivo con callback

const concall = "./conCall.txt";
fs.writeFile(concall, "trabajando con callback", (error) => {
  if (error) return;
  console.log("no se creo el archivo");

  //leer el archivo
  fs.readFile(concall, "utf-8", (error, contenido) => {
    //aca el callback tiene 2 parametros, el error y el cotenido
    if (error) return console.log("no pudimos leer el archivo");
    console.log(contenido);

    //agregando mas contenido, adentro d ela funcion read
    fs.appendFile(concall, " agregando contenido con callback", (error) => {
      if (error) return console.log("no se pudo");

      //eliminar
      //   fs.unlink(concall, (error) => {
      //     if (error) return console.log("no pudimos eliminar el archivo");
      //   });
    });
  });
});

//manejo de archivo con promesas
//  tenemos que trabajar con la propiedad promises del modulo fs
const textPromises = "./textoPro.txt";
const operacionesAsincronicas = async () => {
  //crear un archivo
  await fs.promises.writeFile(textPromises, "nuevo archivo");

  //leer archivo
  let res = await fs.promises.readFile(textPromises, "utf-8");
  console.log(res);

  //agregar archivo
  await fs.promises.appendFile(textPromises, ", cargando cont asincrono");

  //releer
  res = await fs.promises.readFile(textPromises, "utf-8");
  console.log(res);

  // eliminar
  // await fs.promises.unlink(textPromises);
};
operacionesAsincronicas();

//manejo de datos complejos

const arrayPersonas = [
  {
    nombre: "Pepe",
    apellido: "Argento",
    edad: 50,
  },
  {
    nombre: "Moni",
    apellido: "Argento",
    edad: 45,
  },
  {
    nombre: "Coki",
    apellido: "Argento",
    edad: 23,
  },
  {
    nombre: "Paola",
    apellido: "Argento",
    edad: 20,
  },
];
//le damos nombre al archivo
const archivoArgento = "./archivoArgento.json";
//creamos una funcion para guardar archivos
const guardarArchivos = async () => {
  await fs.promises.writeFile(
    archivoArgento,
    JSON.stringify(arrayPersonas, null, 2)
    //colocando null y 2 en el stringify el json se tabula
  );
};
//ejecutamos la funcion
guardarArchivos();

//leer archivos
const leerArchivos = async () => {
  let res = await fs.promises.readFile(archivoArgento, "utf-8");
  let nuevoArchivo = JSON.parse(res);
  console.log(nuevoArchivo);
};
leerArchivos();
