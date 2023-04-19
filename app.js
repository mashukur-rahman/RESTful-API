const express=require("express")
const bodyParser=require("body-parser")
const ejs= require("ejs")
const  mongoose =require("mongoose")
const app=express()
app.use(express.static("public"))
mongoose.connect("mongodb://localhost:27017/wikiDB", {useNewUrlParser:true})

const wikiSchema=mongoose.Schema({
    title:String,
    content:String
})

const wikiDoc=mongoose.model("article", wikiSchema)


app.set("view engine", "ejs")
app.use(bodyParser.urlencoded({extended:true}))

app.get("/", (req,res)=>{
    async function finded(){
        
        res.send(await wikiDoc.find({}).exec())
    } 
    finded()
    
})

app.post("/", (req,res)=>{
    const newArticle=new wikiDoc({
        title:req.body.title,
        content: req.body.content
    })
    newArticle.save()

})

app.delete("/", (req, res)=>{
    async function deleted(){
        await wikiDoc.deleteMany().exec()
    }
    deleted()
})

app.put("/:title", (req, res)=>{
    async function updated(){
        await wikiDoc.updateOne({title:req.params.title}, {title:req.body.title, content:req.body.content})
    }
    updated()
})




app.listen(3000, (req, res)=>{})