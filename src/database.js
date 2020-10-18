const mongoose= require('mongoose');

mongoose.connect('mongodb://localhost/archivos-db',{
    useCreateIndex:true,
    useNewUrlParser:true,
    useFindAndModify:false
})
.then(db=>console.log('La base de datos esta conectada'))
.catch(err=>console.error(err));
