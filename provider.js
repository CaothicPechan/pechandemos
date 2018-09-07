


app.get('/404', (req,res) => {
    res.json({
        response: '404 error!'
    });
})