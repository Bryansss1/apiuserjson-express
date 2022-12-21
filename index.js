const express=require("express")
const path=require("path")
const fs=require("fs/promises")

const app=express()
app.use(express.json())

const Workpath=path.resolve("./files/task.json")

//obtener datos de api
app.get("/tasks",async(req,res)=>{
const  Workapi= await fs.readFile(Workpath,"utf-8")
res.send(Workapi)
})


//agg datos a la api
app.post("/tasks",async(req,res)=>{
    const  Workapi=JSON.parse(await fs.readFile(Workpath,"utf-8"))
    const Body=req.body
    const{title,description,status}=Body
    if(title,description,status){
     const Lastindex=Workapi.length-1
     const idGen=Workapi[Lastindex].id+1
      Workapi.push({...Body,id:idGen})
      await fs.writeFile(Workpath,JSON.stringify(Workapi))
      res.send(console.log("Tarea agregada"))  
    }
})


//eliminar datos de la api
app.delete("/tasks",async(req,res)=>{
    const  Workapi=JSON.parse(await fs.readFile(Workpath,"utf-8"))
    const Body=req.body
    const{id}=Body
    const indexx=Workapi.findIndex(task=>task.id===id)
    Workapi.splice(indexx,1)
    await fs.writeFile(Workpath,JSON.stringify(Workapi))
   res.send(console.log(`tarea con id:${Body.id} eliminado`))
})


//actualizar usuario de la api
app.put("/tasks",async(req,res)=>{
    const  Workapi=JSON.parse(await fs.readFile(Workpath,"utf-8"))
    const Body=req.body
    const {id,status,title,description}=Body
    const  Workput=Workapi.findIndex(work=>work.id===id)
    if(Workput>=0){
        Workapi.splice(Workput,1,Body)
        await fs.writeFile(Workpath,JSON.stringify(Workapi))
        res.send(console.log(`tarea con id:${Body.id} actualizada`))
    }else{
        if(status,title,description){
            const Lastindex=Workapi.length-1
             const idGen=Workapi[Lastindex].id+1
            Workapi.push({...Body,id:idGen})
            await fs.writeFile(Workpath,JSON.stringify(Workapi))
            res.send(console.log("Tarea agregada"))  
        }
    }

})








const PORT=2000
app.listen(PORT,()=>{
    console.log("server abierto port 2000")
})