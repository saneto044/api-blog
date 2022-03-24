const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/drive',{useNewUrlParser:true,useUnifiedTopology:true})
.then(() => {
    console.log('server is online')
}).catch((err) => {
    console.log('there was an error: ' + err)
})

module.exports = mongoose