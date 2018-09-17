const Router = require('express').Router;

const routes = Router();

const logId = (req) => {
    if(req.body.id) {
        console.log('UNIQUE ID: ' + req.body.id);
    }
}

routes.get('/', (req, res)=>{
    console.log('This is the home route ')
    logId(req);
    res.status(200).send('<h1>HOME ROUTE</h1>')
});


routes.get('/200', function(req, res) {

    console.log('everythings good');
    res.send('OK');
});

routes.get('/noaccess/1', (req, res) => {
    console.log('requesting access 1');
    // The message we send back to the client is almost the same at the
    // route noaccess2, let's make them the same
    throw new Error("You don't have access to this route.");

    res.status(200).send(':\\')
});

routes.get('/noaccess/2', (req, res) => {
    console.log('requesting access 2');
    throw new Error("You do not have access to this route.");

    res.status(200).send(':/')
});

routes.get('/internal', (req, res) => {
    console.log('1 I should pass my id down the rabbit hole');
    someInternalFunction('foo');
    res.status(200).send("No time to stop and talk I'm late I'm late I'm late");
});

function someInternalFunction() {
    console.log('1 my id should match the one that came before me');

    throw new Error('Deep from within');
}

module.exports = routes;
