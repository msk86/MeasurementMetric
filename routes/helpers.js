var express = require('express');
var router = express.Router();
var dateHelper = require('../helpers/date-helper');

router.get('/range/:timeFrame', function(req, res, next) {
    var range = dateHelper.getDateRange(new Date(), req.params.timeFrame);
    range.start = dateHelper.formatDate(range.start);
    range.end = dateHelper.formatDate(range.end);
    res.json(range);
});

module.exports = router;
