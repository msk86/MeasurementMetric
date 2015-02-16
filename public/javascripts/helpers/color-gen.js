(function (root, factory) {
    root.Metric = root.Metric || {};
    root.Metric.ColorGen = factory();
}(this, function () {
    function Gen() {
        this.count = 0;
        this.colors = ['#efc142', '#00ac6d', '#1eb7ea', '#fb7f68'];
    }

    Gen.prototype.next = function() {
        var color = this.colors[this.count % this.colors.length];
        this.count ++;
        return color;
    };

    return Gen;
}));
