import Redis from 'ioredis';
import axios from 'axios';
import Express  from 'express';
const client = new Redis();

const app = Express();

app.get('/',async (req : any,res: any) => {
    const cachedVal = await client.get('todos');

    if(cachedVal)return res.json(JSON.parse(cachedVal));
    const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos');

    await client.set('todos',JSON.stringify(data));


    return res.json(data);
})

app.listen(9000,()=>{
  console.log('Your server is runnning on 9000');
})

