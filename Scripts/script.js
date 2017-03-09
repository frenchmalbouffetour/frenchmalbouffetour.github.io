/*+===================================================================
  Author: 	 Thomas SELECK
  
  Version: 	 1.0.0
  
  Email: 	 thomas.seleck@outlook.fr
  
  File:      script.js

  Summary:   This file contains all the javascript code needed for the website to work.

===================================================================+*/

// Menu event handlers
function handler() {
    var wrapper = document.getElementById('cn-wrapper');

    if (!open) {
        this.innerHTML = "Close";
        classie.add(wrapper, 'opened-nav');
        $(".cn-button:hover").css("background", "#aaafb0")
    }
    else {
        this.innerHTML = "Menu";
        classie.remove(wrapper, 'opened-nav');
        $(".cn-button:hover").css("background", "#e1e3e4")
    }
    open = !open;
}


function loadDataset(data, battle, tooltip_type) {
	if (battle == "yes"){
    data.forEach(function (e, i) {
            d3.select("#r" + e.reg_code)
                .attr("class", function (d) { 
				    if (e.battle_result == "Beurre") { 
					return "region q" + "1-9";
					} else { 
					return "region q" + "5-9";
					}
				})
                .on("mouseover", function (d) {
					d3.select(this).transition().duration(300).style("opacity", 0.4);
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
				    div.html("<b>" + e.reg_name + "</b> <br>"
							+ "<b> <u>" + e.battle_result + " </u> </b> <br>"
							+ Math.round(e.value_beurre) +" g/jour de beurre <br>"
							+ Math.round(e.value_huile) +" g/jour d'huile <br>"
							+ "<b> Par rapport à la moyenne française : </b> <br>"
							+ (Math.round(e.delta_beurre)<0?'':'+') + Math.round(e.delta_beurre) +" % de beurre <br>"
							+ (Math.round(e.delta_huile)<0?'':'+') + Math.round(e.delta_huile) +" % d'huile <br>")
						.style("left", (d3.event.pageX + 30) + "px")
					    .style("top", (d3.event.pageY - 30) + "px");
                })
                .on("mouseout", function (d) {
					d3.select(this)
					.transition().duration(300)
					.style("opacity", 1);
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    div.html("")
                        .style("left", "0px")
                        .style("top", "0px");
                });
        });				
	} else {
	// Define the variable called quantile
		var quantile = d3.scaleQuantile()
            .domain([d3.min(data, function (e) { return +e.value; }), d3.max(data, function (e) { return +e.value; })])
            .range(d3.range(9));
	
    data.forEach(function (e, i) {
            d3.select("#r" + e.reg_code)
                .attr("class", function (d) { return "region q" + quantile(+e.value) + "-9"; })
                .on("mouseover", function (d) {
					d3.select(this).transition().duration(300).style("opacity", 0.4);
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
					switch (tooltip_type) { 
					    case "sport":
						    div.html("<b>" + e.reg_name + "</b> <br>"
							        + Math.round(e.value) +" minutes/semaine <br>" 
							        + "<b>Classement : </b>"+ e.rank +"<br>"
							        + (Math.round(e.delta)<0?'':'+') + Math.round(e.delta) +" % par rapport à la moyenne française <br>")
						        .style("left", (d3.event.pageX + 30) + "px")
								.style("top", (d3.event.pageY - 30) + "px");						
						    break;
						case "fastfood":
						    div.html("<b>" + e.reg_name + "</b> <br>"
							        + Math.round(e.value) +" % mangent plus d'1 fois/mois dans un fastfood <br>" 
							        + "<b>Classement : </b>"+ e.rank +"<br>"
							        + (Math.round(e.delta)<0?'':'+') + Math.round(e.delta) +" points par rapport à la moyenne française <br>")
						        .style("left", (d3.event.pageX + 30) + "px")
								.style("top", (d3.event.pageY - 30) + "px");						
						    break
						default:
						    div.html("<b>" + e.reg_name + "</b> <br>"
							        + Math.round(e.value) +" g/jour <br>" 
							        + "<b>Classement : </b>"+ e.rank +"<br>"
							        + (Math.round(e.delta)<0?'':'+') + Math.round(e.delta) +" % par rapport à la moyenne française <br>")
						        .style("left", (d3.event.pageX + 30) + "px")
								.style("top", (d3.event.pageY - 30) + "px");
					}
                })
                .on("mouseout", function (d) {
					d3.select(this)
					.transition().duration(300)
					.style("opacity", 1);
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    div.html("")
                        .style("left", "0px")
                        .style("top", "0px");
                });
        });		
	}

}

function updateData(plotName) {
    switch (plotName) {
        case "obesity":
            d3.csv("Data/fruits_legumes_resultats.csv", function (error, data) { loadDataset(data, "no"); });
            $("#map svg").attr("class", "Purples");
            break;
        case "vegetables":
            d3.csv("Data/fruits_legumes_resultats.csv", function (error, data) { loadDataset(data, "no"); });
            $("#map svg").attr("class", "RdYlGn");
            break;
        case "butter":
            d3.csv("Data/beurre_vs_huile_resultats.csv", function (error, data) { loadDataset(data, "yes"); });
            $("#map svg").attr("class", "YlGn");
            break;
        case "sport":
            d3.csv("Data/act_physique_resultats.csv", function (error, data) { loadDataset(data, "no", "sport"); });
            $("#map svg").attr("class", "RdBu");
            break;
        case "fastfood":
            d3.csv("Data/fastfood_resultats.csv", function (error, data) { loadDataset(data, "no", "fastfood"); });
            $("#map svg").attr("class", "YlOrRd");
            break;
		case "alcool":
            d3.csv("Data/fruits_legumes_resultats.csv", function (error, data) { loadDataset(data, "no"); });
            $("#map svg").attr("class", "YlOrBr");
            break;
		case "coffee":
            d3.csv("Data/cafe_resultats.csv", function (error, data) { loadDataset(data, "no"); });
            $("#map svg").attr("class", "GnYlRd");
            break;
        default:
            d3.csv("Data/fruits_legumes_resultats.csv", function (error, data) { loadDataset(data, "no"); });
            $("#map svg").attr("class", "Greys");
    }
}
var div = null;

function main() {
    var width = $(window).width();
    var height = $(window).height();
    
    // Create a path object to manipulate geoJSON data
    var path = d3.geoPath();

    // Define projection property
    if (width > height) {
        var projection = d3.geoConicConformal() // Lambert-93
            .center([2.454071, 46.279229]) // Center on France
		    .scale([height * 5])
		    .translate([width / 2, height / 2]);
    } else {
        var projection = d3.geoConicConformal() // Lambert-93
		    .center([2.454071, 46.279229]) // Center on France
		    .scale([width * 5])
		    .translate([width / 2, height / 2]);
    }
    

    path.projection(projection); // Assign projection to path object

    // Add svg HTML tag to DOM
    var svg = d3.select('#map').append("svg")
		.attr("id", "svg")
		.attr("width", width)
		.attr("height", height)
		.attr("class", "Blues");

    div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Append the group that will contain our paths
    var deps = svg.append("g");

    // Use a queue to asynchronously load json files
    queue()
        //.defer(d3.json, "Json/departements.geojson")
        .defer(d3.json, "Json/regions_before_2015.geojson")
        .defer(d3.csv, "Data/fruits_legumes_resultats.csv")
        .await(ready);

    function ready(error, regions, population) {
        // Add regions
        deps.selectAll("g")
            .data(regions.features)
			.enter()
			.append("path")
			.attr('id', function (data) {
			    return "r" + data.properties.code;
			})
			.attr("d", path);

        // Add departments
        /*deps.selectAll("path")
			.data(departements.features)
			.enter()
			.append("path")
			.attr('id', function (data) {
			    return "d" + data.properties.code;
			})
			.attr("d", path)
            .attr("class", "department");*/

        // Quantile scales map an input domain to a discrete range, 0...max(population) to 1...9
		var quantile = d3.scaleQuantile()
            .domain([d3.min(population, function (e) { return +e.value; }), d3.max(population, function (e) { return +e.value; })])
            .range(d3.range(9));

        // Legend
        /*var legend = svg.append('g')
            .attr('transform', 'translate(525, 150)')
            .attr('id', 'legend');

        legend.selectAll('.colorbar')
            .data(d3.range(9))
            .enter().append('svg:rect')
            .attr('y', function (d) { return d * 20 + 'px'; })
            .attr('height', '20px')
            .attr('width', '20px')
            .attr('x', '0px')
            .attr("class", function (d) { return "q" + d + "-9"; });

        var legendScale = d3.scaleLinear()
            .domain([0, d3.max(csv, function (e) { return +e.POP; })])
            .range([0, 9 * 20]);

        var legendAxis = svg.append("g")
            .attr('transform', 'translate(550, 150)')
            .call(d3.axisRight(legendScale).ticks(6));*/

        population.forEach(function (e, i) {
            d3.select("#r" + e.reg_code)
                .attr("class", function (d) { return "region q" + quantile(+e.value) + "-9"; })
                .on("mouseover", function (d) {
					d3.select(this).transition().duration(300).style("opacity", 0.4);
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<b>" + e.reg_name + "</b> <br>"
                            + Math.round(e.value) +" g/jour <br>" 
							+ "<b>Classement : </b>"+ e.rank +"<br>"
							+ (Math.round(e.delta)<0?'':'+') + Math.round(e.delta) +" % par rapport à la moyenne française <br>")
                        .style("left", (d3.event.pageX + 30) + "px")
                        .style("top", (d3.event.pageY - 30) + "px");
                })
                .on("mouseout", function (d) {
					d3.select(this)
					.transition().duration(300)
					.style("opacity", 1);
                    div.transition()
                        .duration(500)
                        .style("opacity", 0);
                    div.html("")
                        .style("left", "0px")
                        .style("top", "0px");
                });
        });
    };

    // What to do on resize
    function resize() {
        var width = $(window).width();
        var height = $(window).height();

        if (width > height) {
            projection.scale([height * 5])
                .translate([width / 2, height / 2]);
        } else {
            projection.scale([width * 5])
                .translate([width / 2, height / 2]);
        }

        d3.select("#map").attr("width", width).attr("height", height);
        d3.select("svg").attr("width", width).attr("height", height);

        d3.selectAll("path").attr('d', path);
    }
    d3.select(window).on('resize', resize);

    // Menu tooltip
    var menuDiv = d3.select("body").append("div")
        .attr("class", "tooltip")
        .attr("id", "menuTooltip")
        .style("opacity", 0);

    $("#menu_item_1").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les obèses").style("left", $("#menu_item_1 a img").position().left + "px").style("top", $("#menu_item_1 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_2").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les veggies").style("left", $("#menu_item_2 a img").position().left + "px").style("top", $("#menu_item_2 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_3").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les plutôt-beurre et les plutôt-huile").style("left", $("#menu_item_3 a img").position().left + "px").style("top", $("#menu_item_3 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_4").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les sportifs").style("left", $("#menu_item_4 a img").position().left + "px").style("top", $("#menu_item_4 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_5").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les adeptes du fastfood").style("left", $("#menu_item_5 a img").position().left + "px").style("top", $("#menu_item_5 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_6").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les alcolos").style("left", $("#menu_item_6 a img").position().left + "px").style("top", $("#menu_item_6 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_7").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les caféinomanes").style("left", $("#menu_item_7 a img").position().left + "px").style("top", $("#menu_item_7 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_8").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Mais que fait Romane? le graphe n'existe pas!!!").style("left", $("#menu_item_8 a img").position().left + "px").style("top", $("#menu_item_8 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });
}

$(window).bind("load", main);