//////////////////////////////////////////////////////////////////////////
//                                                                      //
// This is a generated file. You can view the original                  //
// source in your browser if your browser supports source maps.         //
// Source maps are supported by all recent versions of Chrome, Safari,  //
// and Firefox, and by Internet Explorer 11.                            //
//                                                                      //
//////////////////////////////////////////////////////////////////////////


(function () {

/* Imports */
var Meteor = Package.meteor.Meteor;
var global = Package.meteor.global;
var meteorEnv = Package.meteor.meteorEnv;
var Blaze = Package.blaze.Blaze;
var UI = Package.blaze.UI;
var Handlebars = Package.blaze.Handlebars;
var Chart = Package['chart:chart'].Chart;
var WebApp = Package.webapp.WebApp;
var Log = Package.logging.Log;
var Tracker = Package.deps.Tracker;
var Deps = Package.deps.Deps;
var Session = Package.session.Session;
var DDP = Package['ddp-client'].DDP;
var Mongo = Package.mongo.Mongo;
var Spacebars = Package.spacebars.Spacebars;
var Template = Package['templating-runtime'].Template;
var check = Package.check.check;
var Match = Package.check.Match;
var _ = Package.underscore._;
var $ = Package.jquery.$;
var jQuery = Package.jquery.jQuery;
var Random = Package.random.Random;
var EJSON = Package.ejson.EJSON;
var LaunchScreen = Package['launch-screen'].LaunchScreen;
var HTML = Package.htmljs.HTML;

/* Package-scope variables */
var setChart;

(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/jayuda_flx-chart/client/template.chart.js                                                  //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //

Template.__checkName("flxchart");
Template["flxchart"] = new Template("Template.flxchart", (function() {
  var view = this;
  return HTML.Raw('<div id="flxchart"></div>');
}));

/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);






(function(){

/////////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                     //
// packages/jayuda_flx-chart/client/chart.js                                                           //
//                                                                                                     //
/////////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                       //
/**
 * Created by ThinkMac on 8/26/16.
 */

Template.flxchart.onRendered(function () {
	this.autorun(function(){
			var instance = Template.instance();
			var view = Blaze.getView();
			var dataTemplate = Blaze.getData(view);

			var id = "chart";
			var width = 400;
			var height = 400;

			if (adaDATA(dataTemplate.id)) {
				id = dataTemplate.id;
			}
			if (adaDATA(dataTemplate.width)) {
				width = dataTemplate.width;
			}
			if (adaDATA(dataTemplate.height)) {
				height = dataTemplate.height;
			}
			if (!adaDATA(dataTemplate.data)) {
				console.log("Hello Flexure, CHART NEED [O] DATA !!");
				return;
			}
			if (!adaDATA(dataTemplate.tipe)) {
				console.log("Hello Flexure, PLEASE WRITE CHART [S] TIPE !!");
				return;
			}

			var element = document.getElementById("flxchart");
			var newElement = '<canvas id="' + id + '" width="' + width + '" height="' + height + '"></canvas>';
			element.insertAdjacentHTML('afterbegin', newElement);

			var ctx = document.getElementById(dataTemplate.id).getContext("2d");
			setChart(dataTemplate.data, ctx, dataTemplate.tipe);
		});

});

setChart = function (oData, hCTX, tipe) {
	var optionsLINE = {
		//Boolean - Whether to show lines for each scale point
		scaleShowLine: true,
		//Boolean - Whether we show the angle lines out of the radar
		angleShowLineOut: true,
		//Boolean - Whether to show labels on the scale
		scaleShowLabels: false,
		// Boolean - Whether the scale should begin at zero
		scaleBeginAtZero: true,
		//String - Colour of the angle line
		angleLineColor: "rgba(0,0,0,.1)",
		//Number - Pixel width of the angle line
		angleLineWidth: 1,
		//String - Point label font declaration
		pointLabelFontFamily: "'Arial'",
		//String - Point label font weight
		pointLabelFontStyle: "normal",
		//Number - Point label font size in pixels
		pointLabelFontSize: 10,
		//String - Point label font colour
		pointLabelFontColor: "#666",
		//Boolean - Whether to show a dot for each point
		pointDot: true,
		//Number - Radius of each point dot in pixels
		pointDotRadius: 3,
		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth: 1,
		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius: 20,
		//Boolean - Whether to show a stroke for datasets
		datasetStroke: true,
		//Number - Pixel width of dataset stroke
		datasetStrokeWidth: 2,
		//Boolean - Whether to fill the dataset with a colour
		datasetFill: true,
		//String - A legend template
		legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};
	var optionsCIRCLE = {
		responsive : true,
		showTooltips: true,
		onAnimationComplete: function() {
			this.showTooltip(this.segments, false);
		},
		animateScale: true,
		tooltipTemplate: "<%= label %> - <%= value %>"
	};

	if( window.myFlxChart!==undefined) {
		window.myFlxChart.destroy();
	}

	if(tipe === "LINE") {
		window.myFlxChart = new Chart(hCTX).Line(oData, optionsLINE);
	} else if (tipe === "DOUGHNUT") {
		window.myFlxChart = new Chart(hCTX).Doughnut(oData,optionsCIRCLE);
	} else if (tipe === "PIE"){
		window.myFlxChart = new Chart(hCTX).Pie(oData,optionsCIRCLE);
	} else if (tipe === "POLAR"){
		window.myFlxChart = new Chart(hCTX).PolarArea(oData, optionsCIRCLE);
	} else if (tipe === "RADAR"){
		window.myFlxChart = new Chart(hCTX).Radar(oData, optionsLINE);
    } else if (tipe === "BAR"){
        optionsLINE.type = 'bar';
        window.myFlxChart = new Chart(hCTX).Bar(oData, optionsLINE);
	} else if (tipe === "BARHORIZONTAL"){
    	optionsLINE.type = 'horizontalBar';
		window.myFlxChart = new Chart(hCTX).HorizontalBar(oData, optionsLINE);
	}
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

}).call(this);


/* Exports */
Package._define("jayuda:flx-chart");

})();
