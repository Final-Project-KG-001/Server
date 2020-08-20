const errorHandler = (err, req, res, next) => {
    switch (err.name) {
        case '404 Not Found':
            const error = err.error;
            res.status(400).json({error});

            break;
    
        default:
            res.status(500).json({error: {
                message: 'Internal Server Error'
            }});
            break;
    }
};

module.exports = errorHandler;