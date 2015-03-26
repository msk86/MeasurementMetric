module.exports = (function() {
    function isProd() {
        return process.env.NODE_ENV == 'production';
    }
    return {
        isProd: isProd
    }
})();
