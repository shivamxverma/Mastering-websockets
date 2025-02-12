import Redis from 'ioredis';

const client = new Redis();

async function init(){
    // const result = await client.get('name');
    // await client.expire('name',10);
    // console.log('Result -> ',result);
    // await client.lpush('messages',1);
    // await client.lpush('messages',2);
    // await client.lpush('messages',3);
    // await client.lpush('messages',4);

    const result = await client.blpop('messages',10);
    console.log('Result -> ',result);

}

init();

export default init;