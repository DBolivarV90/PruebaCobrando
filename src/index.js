const express= require('express');
const path= require('path');
const exphbs=require('express-handlebars');
const session= require('express-session');
const passport=require('passport');
const methodOverride= require('method-override');
const fileUpload = require('express-fileupload') 
const xlsx= require('xlsx');
const generateSchema = require('generate-schema');
const Mongoose=require('mongoose');
let cont=0;



const app= express();
require('./database');
require('./config/passport');


app.set('port',process.env.PORT||3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
    defaultLayout:'main',
    layoutsDir:path.join(app.get('views'),'layouts'),
    partialsDir:path.join(app.get('views'),'partials'),
    extname:'.hbs'
    
}));

app.set('view engine','.hbs');

app.use(express.urlencoded({extended: false}));
app.use(methodOverride('_method'));
app.use(session({secret: 'mysecretapp',
resave: true,
saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(fileUpload())
//Rutas
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/archivos'));
app.post('/archivos',async(req,res)=>{

       let EDFile = req.files.file
    EDFile.mv(`./files/${EDFile.name}`,err => {
        if(err) return res.status(500).send({ message : err })
        else{
            const workbook=xlsx.readFile(`./files/${EDFile.name}`);
            const workbookSheets=workbook.SheetNames;
            
            const sheet=workbookSheets[0];
            const dataExcel=xlsx.utils.sheet_to_json(workbook.Sheets[sheet]);
            console.log(dataExcel);  
           
            let mongooseSchema= generateSchema.mongoose(dataExcel,{ strict: false });
            console.log(mongooseSchema);
            
           
            let NewArchivo=Mongoose.model('archivo',mongooseSchema);
            let newarchivo= NewArchivo(dataExcel);
            newarchivo.save()
               
              
          
                    
                
                
           
           
            
            
            }
             
            
            
            
            });
           
            
            res.send('Lo estamos logrando!');
     

});



app.listen(app.get('port'),()=>{
    console.log('Servidor escuchando en el puerto',app.get('port'));
});

