module.exports = (function() {
    function isProd() {
        return false;
        return process.env.NODE_ENV == 'production';
    }
    return {
        isProd: isProd
    }
})();
