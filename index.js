const express = require('express');
// Crea la app
const app = express();
const PORT = 3000;
// Arreglo para GET, PATCH y DELETE
let dataArray = [
    { id: 1, nombre: "Ducati" },
    { id: 2, nombre: "Yamaha" },
    { id: 3, nombre: "KTM" },
    { id: 4, nombre: "Gasgas" },
    { id: 6, nombre: "Aprilia" },
    { id: 7, nombre: "Honda" }
];
// Parsea JSON
app.use(express.json())
// Método para GET
app.get('/Data', (req, res) => {
    //Envia una respuesta en formato JSON de un arreglo de objetos
    res.json(dataArray)
});

// Método para GET un registro por ID
app.get('/Data/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertir el id a un entero

    // Buscar el registro con el ID proporcionado
    const foundItem = dataArray.find(item => item.id === id);

    if (foundItem) {
        // Si se encuentra el registro, devolverlo en la respuesta
        res.json(foundItem);
    } else {
        // Si no se encuentra el registro con el ID proporcionado, devolver un error
        res.status(404).send('No se encontró el registro con el ID proporcionado.');
    }
});

//Metodo POST para agregar un registro mas al arreglo de objetos
app.post('/Data', (req, res) => {
    //Extraemos el cuerpo (body) de la solicitud 
    const newData = req.body;
    //Añadimos el objeto New Data al final del array DataArray
    dataArray.push(newData);
    //Imprime en la consola que la Data ha sido recibida e imprimos la NuevaData
    console.log('Recibido:', newData);
    //Le enviamos una respuesta al cliente para indicar que los datos fueron recibidos correctamente
    res.send('Datos recibidos correctamente.');
});

// Método para DELETE
app.delete('/Data/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertir el id a un entero

    // Buscar el índice del elemento con el ID proporcionado
    const index = dataArray.findIndex(item => item.id === id);

    if (index !== -1) {
        // Si se encuentra el elemento, eliminarlo del arreglo
        const deletedItem = dataArray.splice(index, 1);

        console.log('Elemento eliminado:', deletedItem);
        res.send('Elemento eliminado correctamente.');
    } else {
        // Si no se encuentra el elemento con el ID proporcionado, devolver un error
        res.status(400).send('No se encontró el elemento con el ID proporcionado.');
    }
});

// Método para PATCH
app.patch('/Data/:id', (req, res) => {
    const id = parseInt(req.params.id); // Convertir el id a un entero
    const newData = req.body; //Extraemos el cuerpo (body) de la solicitud 

    // Buscar el índice del elemento con el ID proporcionado
    const index = dataArray.findIndex(item => item.id === id);

    if (index !== -1) {
        // Si se encuentra el elemento, modificarlo en el arreglo
        dataArray[index] = { ...dataArray[index], ...newData }; //Esta sintaxis crea un objeto nuevo que combina las propiedades de elemento existe
        console.log('Elemento modificado:', dataArray[index]);
        res.send('Elemento modificado correctamente.');
    } else {
        // Si no se encuentra el elemento con el ID proporcionado, devolver un error
        res.status(400).send('No se encontró el elemento con el ID proporcionado.');
    }
});


app.listen(PORT, () => {
    console.log(`Servidor Express en funcionamiento en http://localhost:${PORT}`);
});
