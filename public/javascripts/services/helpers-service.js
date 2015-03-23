(function (angular) {

    angular.module('metric').factory('HelpersService', ['DataService', function (DataService) {
        function frameRangeUrl(metricName, timeFrame) {
            return encodeURI("/helpers/range/teams/" + TEAM + "/metrics/" + metricName + "/timeframes/" + timeFrame);
        }

        return {
            getFrameRange: function (metricName, timeFrame) {
                return DataService.get(frameRangeUrl(metricName, timeFrame));
            }
        }

    }]);

})(window.angular);
