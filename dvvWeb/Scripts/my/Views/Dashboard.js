﻿/*global my */

my.Views.Dashboard = (function ($) {
    "use strict";
    var runStart;

    var init = function init(_serverName, _dbName, _numberOfPoints, _pollingFrequency) {

        var totalsContainer = document.getElementById('totalRowsGraph');
        var totalsDataset = new vis.DataSet();

        var rpsContainer = document.getElementById('rpsGraph');
        var rpsDataset = new vis.DataSet();

        var options = {
            start: moment(),
            end: moment() + 360000
        };
        var totalsGraph2D = new vis.Graph2d(totalsContainer, totalsDataset, options);
        var rpsGraph2D = new vis.Graph2d(rpsContainer, rpsDataset, options);

        $('#stopButton').prop('disabled', false);
        $('#startButton').prop('disabled', true); 
        $('#resetButton').prop('disabled', true);

        $('#stopButton').click(function () {
            $('#stopButton').prop('disabled', true);
            $('#startButton').prop('disabled', false);
            $('#resetButton').prop('disabled', false);

            chart.server.stop();
        });

        $('#startButton').click(function () {
            $('#stopButton').prop('disabled', false);
            $('#startButton').prop('disabled', true);
            $('#resetButton').prop('disabled', true);

            runStart = moment();
            $("#runStartTime").val(runStart.format("YYYY-MM-DD h:mm:ss a"));

            chart.server.start(_serverName, _dbName, _numberOfPoints, _pollingFrequency);            
        });

        $('#resetButton').click(function () {
            $('#stopButton').prop('disabled', true);
            $('#startButton').prop('disabled', false);
            $('#resetButton').prop('disabled', false);

            var resetOptions = {
                start: moment(),
                end: moment() + 360000
            };

            totalsDataset = new vis.DataSet();
            rpsDataset = new vis.DataSet();

            totalsContainer.innerHTML = "";
            rpsContainer.innerHTML = "";

            totalsGraph2D = new vis.Graph2d(totalsContainer, totalsDataset, resetOptions);
            rpsGraph2D = new vis.Graph2d(rpsContainer, rpsDataset, resetOptions);

            $(':text').val("");
        });

        // Reference the auto-generated proxy for the hub.  
        var chart = $.connection.chartHub;

        // Create a function that the hub can call back to display messages.
        chart.client.addPointToChart = function (data) {
            var now = moment();
            var graphingModel = JSON.parse(data);
            var newData = [];
            newData.push({ x: now, y: graphingModel.CurrentRowCount });
            totalsGraph2D.itemsData.add(newData);
            totalsGraph2D.setWindow(null, now + 36000);

            newData = [];
            newData.push({ x: now, y: graphingModel.CurrentRPS });
            rpsGraph2D.itemsData.add(newData);
            rpsGraph2D.setWindow(null, now + 36000);

            $("#runStartTime").val(runStart.format("YYYY-MM-DD h:mm:ss a"));
            $("#lastUpdated").val(now.format("YYYY-MM-DD h:mm:ss a"));
            $("#estTimeLeft").val(graphingModel.TimeLeft);

            var elem = document.getElementById("currentRowCount");
            elem.innerHTML = "(" + my.Common.Utilities.commafy(graphingModel.CurrentRowCount.toFixed(0).toLocaleString()) + " currently)";
            elem = document.getElementById("currentRPS");
            elem.innerHTML = "(" + my.Common.Utilities.commafy(graphingModel.CurrentRPS.toFixed(1).toLocaleString()) + " currently)";

            $("#maxRowCount").val(my.Common.Utilities.commafy(graphingModel.MaxRowCount.toFixed(0).toLocaleString()));
            $("#minRowCount").val(my.Common.Utilities.commafy(graphingModel.MinRowCount.toFixed(0).toLocaleString()));
            $("#maxRPS").val(my.Common.Utilities.commafy(graphingModel.MaxRPS.toFixed(1).toLocaleString()));
            $("#minRPS").val(my.Common.Utilities.commafy(graphingModel.MinRPS.toFixed(1).toLocaleString()));

            $("#avgRowCount").val(my.Common.Utilities.commafy(graphingModel.AverageRowCount.toFixed(0).toLocaleString()));
            $("#avgRowCountNZ").val(my.Common.Utilities.commafy(graphingModel.AverageRowCountNZ.toFixed(0).toLocaleString()));
            $("#avgRPS").val(my.Common.Utilities.commafy(graphingModel.AverageRPS.toFixed(1)));
            $("#avgRPSNZ").val(my.Common.Utilities.commafy(graphingModel.AverageRPSNZ.toFixed(1).toLocaleString()));

            $("#totalRowsMoved").val(my.Common.Utilities.commafy(graphingModel.TotalRowsMoved.toFixed(0).toLocaleString()));
            $("#totalRowsAdded").val(my.Common.Utilities.commafy(graphingModel.TotalRowsAdded.toFixed(0).toLocaleString()));
            $("#totalRowsRemoved").val(my.Common.Utilities.commafy(graphingModel.TotalRowsRemoved.toFixed(0).toLocaleString()));
        }

        $.connection.hub.start().done(function () {
            //alert('initializing server');
            runStart = moment();
            chart.server.start(_serverName, _dbName, _numberOfPoints, _pollingFrequency);
        });
    }


     return {
init: init
};

})(this.jQuery);