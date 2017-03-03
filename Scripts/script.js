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

function loadDataset(data) {
    data.forEach(function (e, i) {
        d3.select("#r" + e.CODE_REG)
            .attr("class", function (d) { return "region q" + quantile(+e.POP) + "-9"; })
            .on("mouseover", function (d) {
                div.transition()
                    .duration(200)
                    .style("opacity", .9);
                div.html("<b>Région : </b>" + e.NOM_REGION + "<br>"
                        + "<b>Population : </b> cste<br>")
                    .style("left", (d3.event.pageX + 30) + "px")
                    .style("top", (d3.event.pageY - 30) + "px");
            })
            .on("mouseout", function (d) {
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.html("")
                    .style("left", "0px")
                    .style("top", "0px");
            });
    });
}

function updateData(plotName) {
    switch (plotName) {
        case "obesity":
            d3.csv("Data/population.csv", function (error, data) { loadDataset(data); });
            $("#map svg").attr("class", "Purples");
            break;
        case "vegetables":
            d3.csv("Data/population.csv", function (error, data) { loadDataset(data); });
            $("#map svg").attr("class", "Greens");
            break;
        case "butter":
            d3.csv("Data/population.csv", function (error, data) { loadDataset(data); });
            $("#map svg").attr("class", "YlGn");
            break;
        case "sport":
            d3.csv("Data/population.csv", function (error, data) { loadDataset(data); });
            $("#map svg").attr("class", "RdBu");
            break;
        case "fastfood":
            d3.csv("Data/population.csv", function (error, data) { loadDataset(data); });
            $("#map svg").attr("class", "YlOrBr");
            break;
        default:
            d3.csv("Data/population.csv", function (error, data) { loadDataset(data); });
            $("#map svg").attr("class", "Greys");
    }
}

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

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Append the group that will contain our paths
    var deps = svg.append("g");

    // Use a queue to asynchronously load json files
    queue()
        .defer(d3.json, "Json/departements.geojson")
        .defer(d3.json, "Json/regions_before_2015.geojson")
        .defer(d3.csv, "Data/population.csv")
        .await(ready);

    function ready(error, departements, regions, population) {
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
        deps.selectAll("path")
			.data(departements.features)
			.enter()
			.append("path")
			.attr('id', function (data) {
			    return "d" + data.properties.code;
			})
			.attr("d", path)
            .attr("class", "department");

        // Quantile scales map an input domain to a discrete range, 0...max(population) to 1...9
        var quantile = d3.scaleQuantile()
            .domain([0, d3.max(population, function (e) { return +e.POP; })])
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
            d3.select("#r" + e.CODE_REG)
                .attr("class", function (d) { return "region q" + quantile(+e.POP) + "-9"; })
                .on("mouseover", function (d) {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9);
                    div.html("<b>Région : </b>" + e.NOM_REGION + "<br>"
                            + "<b>Population : </b> cste<br>")
                        .style("left", (d3.event.pageX + 30) + "px")
                        .style("top", (d3.event.pageY - 30) + "px");
                })
                .on("mouseout", function (d) {
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
        menuDiv.html("Au Nord, il va falloir faire un régime !").style("left", $("#menu_item_1 a img").position().left + "px").style("top", $("#menu_item_1 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_2").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Amis du Nord-Est, avez-vous oublié ce qu'était une courgette ?").style("left", $("#menu_item_2 a img").position().left + "px").style("top", $("#menu_item_2 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_3").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Beurre VS Huile : un combat Nord-Sud").style("left", $("#menu_item_3 a img").position().left + "px").style("top", $("#menu_item_3 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_4").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les plus sportifs sont au pays du surf et du rugby (au Sud-Ouest quoi…)").style("left", $("#menu_item_4 a img").position().left + "px").style("top", $("#menu_item_4 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_5").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Les Parisiens ne cuisinent plus !").style("left", $("#menu_item_5 a img").position().left + "px").style("top", $("#menu_item_5 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_6").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Mais que fait Romane? le graphe n'existe pas!!!").style("left", $("#menu_item_6 a img").position().left + "px").style("top", $("#menu_item_6 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_7").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9);
        menuDiv.html("Mais que fait Romane? le graphe n'existe pas!!!").style("left", $("#menu_item_7 a img").position().left + "px").style("top", $("#menu_item_7 a img").position().top + "px");
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