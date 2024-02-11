//se requiere file system

const { error } = require("console");
const fs = require("fs");

//ruta
const ruta = "./productos.json";
//se crea la clase

class ProductManager {
  static id = 0;

  constructor() {
    this.products = [];
    this.path = "./productos.json";
  }
  //metodo crear archivo
  createFile() {
    fs.writeFileSync("./productos.json", "[]");
  }
  //agregar producto
  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      let productosActuales = await this.readProducts();
      const newProduct = {
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
        id: ProductManager.id,
      };
      ProductManager.id++;
      productosActuales.push(newProduct);
      await this.saveProducts(productosActuales);
    } catch (error) {
      console.log("Error al agregar prodcuto", error);
    }
  }
  //leer productos
  async readProducts() {
    try {
      const contenido = await fs.promises.readFile(this.path, "utf-8");
      let contenidoParseado = JSON.parse(contenido);
      return contenidoParseado;
    } catch (error) {
      console.log("Error al leer productos", error);
    }
  }
  //guarda el producto
  async saveProducts(arrayProductos) {
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(arrayProductos, null, 2)
    );
    try {
    } catch (error) {
      console.log("No se pudo guardar el producto ", error);
    }
  }
  //trae la lista de productos
  async getProducts() {
    //verificar si el archivo existe
    let fileExist = fs.existsSync(ruta);
    if (!fileExist) {
      //si no extiste lo crea
      this.createFile();
    }
    try {
      const productos = await this.readProducts();
      console.log("Productos: ", productos);
    } catch (error) {
      console.log("No se pudo consultar el producto ", error);
    }
  }
  //busca por id
  getProductById(id) {
    let prodcuto = this.products.find((producto) => producto.id === id);
    prodcuto ? { prodcuto } : console.log("Not found");
  }

  updateProduct() {}

  deleteProduct() {}
}

//instanciamos
const productManager = new ProductManager();

//llamamos al getProducts
productManager.getProducts();

// //agregamos un producto
// //nuevo producto:
productManager.addProduct(
  "producto prueba",
  "Este es un producto prueba",
  200,
  "Sin imagen",
  "abc123",
  25
);
//probamos otro producto para chequear que el id no se repita
productManager.addProduct(
  "producto prueba 2",
  "Este es OTRO producto prueba",
  200,
  "Sin imagen",
  "abc124",
  25
);

// //consultamos nuevamente la base de productos:
productManager.getProducts();

// productManager.getProducts();
