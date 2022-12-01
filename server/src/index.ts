import express, {Request, Response} from 'express'; 
const app = express()

app.get('/',(req: Request, res: Response): void => {
    console.log('Here')
    res.status(500).send('luminosity-led Node Server')
})

app.listen(8080)