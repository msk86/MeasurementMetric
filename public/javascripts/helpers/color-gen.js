(function (root, factory) {
    root.Metric = root.Metric || {};
    root.Metric.ColorGen = factory();
}(this, function () {
    function Gen() {
        this.colors = ['#efc142', '#00ac6d', '#1eb7ea', '#fb7f68', '#4a4aff', '#ffbdbd', '#aa00cc', '#ff6000'];
        this.count = Math.floor(Math.random() * this.colors.length);
    }

    Gen.prototype.next = function() {
        var color = this.colors[this.count % this.colors.length];
        this.count ++;
        return color;
    };

    return Gen;
}));
