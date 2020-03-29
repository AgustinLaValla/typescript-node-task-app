import mongoose from 'mongoose';
import App from './app';
import colors from 'colors';

async function connect() {
    try { 
        await mongoose.connect('mongodb://localhost/ts-app-tsc-crud', {
            useNewUrlParser:true
        }).then(() => console.log(`${colors.yellow('Databse is connected')}`));
        
    }catch(error) { 
        console.log(error);
    }
}

export default connect;