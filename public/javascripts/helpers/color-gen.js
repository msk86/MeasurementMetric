(function (root, factory) {
    root.Metric = root.Metric || {};
    root.Metric.ColorGen = factory();
}(this, function () {
    var count = 0;
    var colors = ['#efc142', '#00ac6d', '#1eb7ea', '#fb7f68'];
    function next() {
        var color = colors[count % colors.length];
        count ++;
        return color;
    }

    return {
        next: next
    };
}));
