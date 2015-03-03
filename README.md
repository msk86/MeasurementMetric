# Measurement & Metric

## What's Measurement & Metric
Since we are focusing on measuring, we need a tool
to help us collect metric data, also provide analytics
and visualization.

Measurement & Metric is this tool which can easily:

* Creating a new metric
* Collecting data(Manually & Automatically)
* Analyzing metric
* A great visualization

## Env

* MongoDB: `brew install mongodb`
    * Configuration for **dbpath**:

            sudo mkdir -p /data/db
            sudo chmod 0755 /data/db
            sudo chown {userName}:staff /data/db

* NodeJS: `brew install node`
* NPM: `npm install`

## Startup

* Start MongoDB: `mongod` or `nohup mongod &`
* Start App: `node app.js` or `nodemon app.js` or `sudo MM_PORT=80 NODE_ENV=production forever start app.js`

## Create Metric

* Category: `Normal` means this metric can only be recorded manually, `Schedule` means this metric can only be recorded automatically.
* Name: The unique name of this metric. Cannot be empty.
* Unit: The unit of this metric, such as `mins`, `hours`, `times`, `etc.`. Can be empty.
* Description: The description for this metric. Can be empty.
* CountMethod: How to count the data in the time frame. `Total()` means we need the total count, `Avg()` means we want the average value, `Max()` means we need the maximum one, `Min()` means we need the minimum one.
* Types: Define the types of the metric. Such as the **Story** metric have 2 types, `UserStory` and `Bug`, we put `UserStory;Bug` here. The analysis is based on this metric type. Can be empty.
* Fields: Define additional fields for te metric. We we want to store a `StoryNo` and a `StoryName` of **Story** metric, we can put `StoryNo;StoryName` here. Can be empty.
* API(`Schedule` only): API url of schedule job, the schedule job will hit this API automatically. Can be empty, that means this job doesn't require any API.
* Username(`Schedule` only): Username for base authentication. Can be empty.
* Password(`Schedule` only): Password for base authentication. Can be empty.
* JS Method(`Schedule` only): An anonymous JavaScript function to process the result from API. The function looks like:

        function(apiResult, lastRecord, _) {
            ...
            return {
                metricValue: 1,
                metricType: 'typeA',
                otherField: '...'
            };
        }

    * apiResult: `JsonObject`, if the result form API cannot be parse to JSON, this is a `String`.
    * lastRecord: `JsonObject`, the latest record of this metric, usually this object can provide some useful data.
    * _: `underscore` object.
    * return value: null / an object / an array. If return `null`, no record will be stored. If return `Object`, the object will be stored. If return `Array`, all elements will be stored. `metricValue` is the number we need count, default to 1. `metricType` is the type defined in `Types`, also can store what every you want.
* Frequency(`Schedule` only): A cron pattern to define the schedule.
* TimeFrame: A default time window, metric analysis based on this TimeFrame.
