import { appCreate } from "./app.ts"

const PORT = Number(process.env.PORT) || 3000;
const app=appCreate();

app.listen(PORT, ()=> {
    console.log(`mock SnailPay escuchando en http://localhost:${PORT}`);
    console.log(`POST http://localhost:${PORT}/api/payments`);
});