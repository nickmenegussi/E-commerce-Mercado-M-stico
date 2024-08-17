// Módulo de inicialização do servidor servidor web onde a nossa webapi estára hospedada

// Improtar o arquivo app
const app = require('./app')

// Importar a porta do servidor
const port = app.get('port')

// Testar API
app.listen(port, () => console.log(`Run on port ${port}!`))

