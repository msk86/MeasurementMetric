# Measurement & Metric

## What's Measurement & Metric
Since we are focusing on measuring, we need a tool
to help us collect metric data, also provide analytics
and visualization.

Measurement & Metric is this tool which can easily:
* Creating a new metric
* Choosing a metric type
* Collecting data(Manually & Automatically)
* Analyzing metric
* A great visualization

## User Journey

Jie is a team manager, her main work is collecting
all kind of data, and find out how the performance of
the team.

* Login in to `http://mm.com`
* Click `New Metric` button
* Fill form and submit:
  * `Metric Name`:`<input value="Session">`
  * `Metric category`:`<radio value="Normal" selected><radio value="Schedule">`
  * `Metric Type`:`<input value="Team;Office">`
  * `Other Infos`:`<input value="Runner;Feedback">`
  * `Week start`:`<select><option>Monday</option><option>...</option><option>Sunday</option></select>`
  * `Time Frame`:`<select><option>Daily</option><option>Weekly</option><option>Fortnightly</option><option>Monthly</option></select>`
* See `New metric "Session" is created successfully!`
* Go back to `http://mm.com`
* See the `Session` metric is on the dashboard now, the value is `0/Day`
* Hover on the `Session` metric panel, I can see `Increase`
button.
* Click on `Increase` button
* See a popup with
  * `Metric Type`:`<select><option>Team</option><option>Office</option></select>`
  * `Runner`:`<input>`
  * `Feedback`:`<input>`
* Submit the form, the value changes to `1/Day`
* Click on `Analysis` button on the right side of the panel
* See a line-chart to show the `daily` data of last 30 days
  * Have a line of total number
  * Have a line of `Team`
  * Have a line of `Office`
* The frequence can be changed to `weekly`, `fortnightly`, `monthly`
* The data range can be changed
* Click on `List` button on the right side of the panel
* See a full list of `Session` metric, with `Metric Type`, `Runner`, `Created At`
* Click `Delete` in a row to delete a metric
* Click `New Metric` button again, to add a new metric
* Fill form and submit:
  * `Metric Name`:`<input value="Commits">`
  * `Metric category`:`<radio value="Normal"><radio value="Schedule" selected>`
  * `API`:`<input value="https://api.github.com">`
  * `User Name`:`<input value="username">`
  * `Password`:`<input value="password">`
  * `Metric function`:`<textarea>function(apiResult) {return apiResult.metric; }</textarea>`
  * `Frequency(Day)`:`<input value="1">`
  * `Trigger Time`:`<input type="time" value="10:00">`
  * `Week start`:`<select><option>Monday</option><option>...</option><option>Sunday</option></select>`
  * `Time Frame`:`<select><option>Daily</option><option>Weekly</option><option>Fortnightly</option><option>Monthly</option></select>`
* See `New metric "Commits" is created successfully!`
* See the `commits` metric changes at every 10:00am

## To run app
`node app.js`
then open `localhost:4000`