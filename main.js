import express from 'express';
import fs from 'fs';
import path from 'path';

const __dirname = import.meta.dirname;
const app = express();
const port = 3000;

app.use(express.static('assets'));

app.get('/', (req,res)=>{
    res.sendFile(path.join(__dirname, '/index.html'))    
})

//fecha actual
let today = new Date();
let dd = String(today.getDate()).padStart(2, '0');
let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
let yyyy = today.getFullYear();

today = dd + '/' + mm + '/' + yyyy;

app.get('/crear', (req,res)=>{
    let {archivo,contenido} = req.query;
    fs.writeFile(`${archivo}.txt`, `${today}: ${contenido}`,'utf8',()=>{
        console.log(`archivo creado`)
        res.send('Exito Archivo Creado!');
    });

})

app.get('/leer',(req,res)=>{
    let {archivo} = req.query;
    fs.readFile(`${archivo}.txt`,'utf8',(err,data)=>{
        if(err){
            console.log(err);
        }else{
            console.log(data);
            res.send(`leyendo archivo: ${archivo}.txt <br> ${data}`);
        }
    })
})

app.get('/renombrar', (req,res)=>{
    let {nombre, nuevoNombre} = req.query;
    fs.rename(`${nombre}.txt`, `${nuevoNombre}.txt`,(err,data)=>{
        if(err){
            console.log(err)
        }else{
            console.log(`renombrado`); 
            res.send(`Exito Archivo Renombrado de ${nombre} a ${nuevoNombre}`);
        }
        
    })
    
})

app.get('/eliminar', (req,res)=>{
    let {archivo} = req.query;
    fs.unlink(`${archivo}.txt`,()=>{
        
    })
    res.send(`Exito Archivo ${archivo} Eliminado!`);
})

app.listen(port, ()=>{
    console.log(`Conectado a puerto ${port}`)
})

