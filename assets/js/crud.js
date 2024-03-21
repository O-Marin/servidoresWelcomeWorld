function crearArchivo(){

fs.writeFile('lista.txt', tareas , 'utf8', () => {
    console.log('Archivo creado');
});
}

function leerArchivo(){
    fs.readFile('lista.text', 'utf8',(err,data) =>{
        console.log(data)
    })
}

function renombrarArchivo(){
    fs.rename('lista.txt', 'lista_modificada.txt', ()=>{
        console.log('renombrado')
    })
}

function eliminarArchivo(){
fs.unlink('lista.txt',()=>{
    console.log('Archivo eliminado')
})

}

export {crearArchivo,leerArchivo,renombrarArchivo,eliminarArchivo};

