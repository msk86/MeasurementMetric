(function (angular, $) {

    angular.module('metric').factory('DataService', ['$timeout', '$q', function ($timeout, $q) {
        function dataPromise(url, data, method) {
            var deferred = $q.defer();
            $.ajax({
                url: url,
                type: method,
                data: data
            }).success(function (d) {
                $timeout(function () {
                    if(d.error) {
                        deferred.reject(d.error);
                    } else {
                        deferred.resolve(d);
                    }
                });
            }).error(function () {
                $timeout(function () {
                    deferred.reject("An error occurred while " + method + " to " + url);
                });
            });
            return deferred.promise;
        }

        function http(method) {
            return function(url, data) {
                return dataPromise(url, data, method);
            }
        }

        return {
            get : http('GET'),
            post : http('POST'),
            put : http('PUT'),
            delete : http('DELETE')
        }

    }]);

})(window.angular, window.jQuery);
