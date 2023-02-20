function message(req, res, next) {
    console.log('This message is coming from middleware');
    next();
};

module.exports = {message}