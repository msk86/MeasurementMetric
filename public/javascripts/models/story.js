(function (root, factory) {
    root.Metric = root.Metric || {};
    root.Metric.Story = factory();
}(this, function () {
    function Story() {

    }

    Story.storyTypes = [
        {name: 'all', seriesLabel: 'ALL', color: "#efc142"},
        {name: 'userStory', seriesLabel: 'Stories', color: "#00ac6d"},
        {name: 'techTask', seriesLabel: 'Tech Tasks', color: "#1eb7ea"},
        {name: 'bug', seriesLabel: 'Bugs', color: "#fb7f68"}
    ];

    return Story;

}));