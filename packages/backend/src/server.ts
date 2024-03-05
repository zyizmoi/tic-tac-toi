import app from './app'
import * as dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 5001

app.listen(PORT, () => console.log(`Listening on port ${PORT}.`))
