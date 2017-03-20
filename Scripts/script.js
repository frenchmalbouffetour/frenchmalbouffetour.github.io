/*+===================================================================
  Author: 	 Thomas SELECK
  
  Version: 	 1.0.0
  
  Email: 	 thomas.seleck@outlook.fr
  
  File:      script.js

  Summary:   This file contains all the javascript code needed for the website to work.

===================================================================+*/
// Cache du modal par bouton
function Modal_Cache(){
	$('#myModal').modal('hide');
}
// Menu event handlers
function handler() {
    var wrapper = document.getElementById('cn-wrapper');

    if (!open) {
        this.innerHTML = "Close";
        classie.add(wrapper, 'opened-nav');
        /*$(".cn-button:hover").css("background", "#aaafb0")*/
		$(".cn-button:hover").css("background", 'rgb(14,4,100)')
    }
    else {
        this.innerHTML = "Menu";
        classie.remove(wrapper, 'opened-nav');
        /*$(".cn-button:hover").css("background", "#e1e3e4")*/
		$(".cn-button:hover").css("background", "rgb(14,4,100)")
    }
    open = !open;
}

function updateTitles(mapName, newTitle, newSubtitle) {
	//Update Main Titles
    $("#main_title_placeholder").text(newTitle);
    $("#subtitle_placeholder").text(newSubtitle);
	
	// Update Information Tooltip (information logo)
	var infotooltipIndicator = d3.select("#info_tooltip_indicator");
	var infotooltipDesc = d3.select("#info_tooltip_desc");
	var infotooltipSource = d3.select("#info_tooltip_source");
	var infotooltipYear = d3.select("#info_tooltip_year");
	
	switch (mapName) {
		case "obesity":
			infotooltipIndicator.html("<b>" + newSubtitle + " (en %) </b>");
			infotooltipDesc.html("<b>Définition </b>: La prévalence de l'obésité correspond à la part (en %) de la population étudiée diagnostiquée comme obèse. On qualifie d'obèse une personne dont l'Indice de Masse Corporelle (IMC) est supérieur à 30 kg/m². Rappelons que les causes de l'obésité sont toutefois complexes : au-delà de l'alimentation, la génétique et certains facteurs environnementaux semblent en effet impliqués.");
			infotooltipSource.html("<b>Source </b>: <a href='http://www.roche.fr/content/dam/roche_france/fr_FR/doc/obepi_2012.pdf' target='_blank'> Enquête ObEpi</a> (INSERM)");
			infotooltipYear.html("<b>Année </b>: 2012");
			break;
		case "vegetables":
			infotooltipIndicator.html("<b>" + newSubtitle + " (en g/jour)</b>");
			infotooltipDesc.html("<b>Définition </b>: La consommation journalière moyenne de fruits et légumes correspond à la quantité moyenne en grammes consommée au cours d'une journée par un individu de la population étudiée.");
			infotooltipSource.html("<b>Source </b>: <a href='https://www.data.gouv.fr/fr/datasets/donnees-de-consommations-et-habitudes-alimentaires-de-letude-inca-2-3/' target='_blank'> Enquête INCA 2 </a> (ANSES)");
			infotooltipYear.html("<b>Année </b>: 2007");
			break;
		case "butter":
			infotooltipIndicator.html("<b>" + newSubtitle + "</b>");
			infotooltipDesc.html("<b>Définition </b>: La consommation journalière moyenne de beurre (resp. d'huile) correspond à la quantité moyenne en grammes consommée au cours d'une journée par un individu de la population étudiée. Ces deux quantités en grammes sont ensuite comparées pour déterminer si l'individu moyen de la région étudiée consomme plus de beurre ou plus d'huile.");
			infotooltipSource.html("<b>Source </b>: <a href='https://www.data.gouv.fr/fr/datasets/donnees-de-consommations-et-habitudes-alimentaires-de-letude-inca-2-3/' target='_blank'> Enquête INCA 2 </a> (ANSES)");
			infotooltipYear.html("<b>Année </b>: 2007");
			break;
		case "sport":
			infotooltipIndicator.html("<b>" + newSubtitle + "</b>");
			infotooltipDesc.html("<b>Définition </b>: La durée hebdomadaire moyenne d'activité physique intense correspond au temps moyen en minutes consacré à une activité sportive intense au cours d'une semaine par un individu de la population étudiée.");
			infotooltipSource.html("<b>Source </b>: <a href`\"https://www.data.gouv.fr/fr/datasets/donnees-de-consommations-et-habitudes-alimentaires-de-letude-inca-2-3/\" target='_blank'> Enquête INCA 2 </a> (ANSES)");
			infotooltipYear.html("<b>Année </b>: 2007");
			break;
		case "fastfood":
			infotooltipIndicator.html("<b>" + newSubtitle + "</b>");
			infotooltipDesc.html("<b>Définition </b>: Le pourcentage de la population allant plus d'1 fois par mois dans un fastfood correspond au nombre d'individus ayant indiqué une fréquence de fréquentation des fastfoods supérieure ou égale à 1 fois par mois au cours de l'enquête INCA 2 rapporté au nombre d'invididus de la population étudiée.");
			infotooltipSource.html("<b>Source </b>: <a href='https://www.data.gouv.fr/fr/datasets/donnees-de-consommations-et-habitudes-alimentaires-de-letude-inca-2-3/' target='_blank'> Enquête INCA 2 </a> (ANSES)");
			infotooltipYear.html("<b>Année </b>: 2007");
			break;
		case "alcohol":
			infotooltipIndicator.html("<b>" + newSubtitle + "</b>");
			infotooltipDesc.html("<b>Définition </b>: Le niveau d'ivresses répétées (en %) correspond à la part de la population étudiée ayant déclaré avoir été ivre au moins trois fois durant les douze derniers mois. Notons que ce type d'alcoolisation est à distinguer du nombre de buveurs quotiens ou du nombre de personnes dans une situation de dépendance. Pour plus d'informations, consulter l'Atlas des usages de substances psychoactives 2010 publié par l'Inpes.");
			infotooltipSource.html("<b>Source </b>: <a href='http://inpes.santepubliquefrance.fr/Barometres/barometre-sante-2010/atlas-usages-substances-psychoactives-2010/index.asp' target='_blank'> Enquête Baromètre santé de l'Inpes </a> (Inpes)");
			infotooltipYear.html("<b>Année </b>: 2010");
			break;
		case "patisserie":
			infotooltipIndicator.html("<b>" + newSubtitle + "</b>");
			infotooltipDesc.html("<b>Définition </b>: La consommation journalière moyenne de pâtisseries correspond à la quantité moyenne en grammes consommée au cours d'une journée par un individu de la population étudiée.");
			infotooltipSource.html("<b>Source </b>: <a href='https://www.data.gouv.fr/fr/datasets/donnees-de-consommations-et-habitudes-alimentaires-de-letude-inca-2-3/' target='_blank'> Enquête INCA 2 </a> (ANSES)");
			infotooltipYear.html("<b>Année </b>: 2007");
			break;
		case "charcuterie":
			infotooltipIndicator.html("<b>" + newSubtitle + "</b>");
			infotooltipDesc.html("<b>Définition </b>: La consommation journalière moyenne de charcuterie correspond à la quantité moyenne en grammes consommée au cours d'une journée par un individu de la population étudiée.");
			infotooltipSource.html("<b>Source </b>: <a href='https://www.data.gouv.fr/fr/datasets/donnees-de-consommations-et-habitudes-alimentaires-de-letude-inca-2-3/' target='_blank'> Enquête INCA 2 </a> (ANSES)");
			infotooltipYear.html("<b>Année </b>: 2007");
			break;
	}		
	
}

function loadDataset(data, mapName, invertedIndicatorColor) {
    var width = $(window).width();
    var height = $(window).height();

    // Define color scale
    var quantile = d3.scaleQuantile()
        .domain([d3.min(data, function (e) { return +e.value; }), d3.max(data, function (e) { return +e.value; })])
        .range(d3.range(4));

    // Get tooltip
    var div = d3.select("#map_tooltip");
    var tooltipRegionName = d3.select("#tooltip_region_name");
    var tooltipIndicator = d3.select("#tooltip_indicator");
    var tooltipRanking = d3.select("#tooltip_ranking");
    var tooltipMeanIndicator = d3.select("#tooltip_mean_indicator");
	
	
	// Legend
	d3.select('#legend').remove();
	var legend = d3.select('#svg').append("g")
            .attr("transform", "translate(" + Math.round((width / 2) + width * 0.2) + ", " + Math.round(height / 2) + ")")
            .attr("id", "legend");
	
    var unit = "g/jour";
	var legend_title = "Légende :";
			
			switch (mapName) {
				case "sport":
					unit = "minutes/semaine";
					break;
				case "fastfood":
					unit = "%";
					break;
				case "alcohol":
					unit = "%";
					break;
				case "obesity":
					unit = "%";
					break;
				case "butter":
					legend_title = "Consomme plus de :";
					break;
				default:
					unit = "g/jour";
			}		
	
	    
		var range_legend = 4;
	
		if (mapName == "butter") { range_legend = 2; }
			
			
        // Add colorbar
        legend.selectAll(".colorbar")
            .data(d3.range(range_legend))
            .enter().append("svg:rect")
            .attr("y", function (d) { return d * 20 + "px"; })
            .attr("height", "20px")
            .attr("width", "20px")
            .attr("x", "0px")
            .attr("class", function (d) { return "q" + d + "-9"; });

        // Add legend to each color
        legend.selectAll(".colorbar")
            .data(d3.range(range_legend))
            .enter()
            .append("text")
            .attr("x", "30px")
            .attr("y", function (d) { return (d * 20 + 15) + "px"; })
            .text(function (d) {
				
				if (mapName == "butter"){ 
				
				switch(d) {
					case 0 :
						return "Beurre";
						break;
					case 1:
						return "Huile";
						break;
				}
				} else {

				switch(d) {
					case 0 :
						return "< " + Math.round(quantile.quantiles()[0]) + " " + unit;
						break;
					case 1:
						return Math.round(quantile.quantiles()[0]) + " - " + Math.round(quantile.quantiles()[1]) + " "+ unit ;
						break;
					case 2:
						return Math.round(quantile.quantiles()[1]) + " - " + Math.round(quantile.quantiles()[2]) + " "+ unit ;
						break;
					case 3 :
						return "> " + Math.round(quantile.quantiles()[2]) + " "+ unit;
						break;
			    }
				
				}

			})
			.attr("id","legendText");
			
		
		
        // Add legend title
        legend.selectAll(".colorbar")
            .data(d3.range(1))
            .enter()
            .append("text")
            .attr("x", "0px")
            .attr("y", "-15px")
            .text(function(d) { return legend_title; });
			
		
		
	
    // Read data from csv and put it on the map
    data.forEach(function (e, i) { // For each item in the csv file
        d3.select("#r" + e.reg_code) // Select a region from the map
            .attr("class", function (d) {
                if (mapName != "butter") {
                    return "region q" + quantile(+e.value) + "-9";
                } else {
                    if (e.battle_result == "Beurre") {
                        return "region q0-9";
                    } else {
                        return "region q1-9";
                    }
                }
            }) // Assign it a color
            .on("mouseover", function (d) { // Define map's behavior on mouse hover
                d3.select(this).transition().duration(300).style("opacity", 0.4);
                div.transition().duration(200).style("opacity", .9);

                // Set region's name
                tooltipRegionName.html(e.reg_name);

                // Set ranking value
                tooltipRanking.html("<span class='boldText'>Classement : </span>" + e.rank);

                // Set value
                if (!invertedIndicatorColor) {
                    if (Math.round(e.delta) >= 0) {
                        tooltipMeanIndicator.html("<span class='boldText greenIndicator'>+" + Math.round(e.delta) + " % </span> par rapport à la moyenne française");
                    } else {
                        tooltipMeanIndicator.html("<span class='boldText redIndicator'>" + Math.round(e.delta) + " % </span> par rapport à la moyenne française");
                    }
                } else {
                    if (Math.round(e.delta) >= 0) {
                        tooltipMeanIndicator.html("<span class='boldText redIndicator'>+" + Math.round(e.delta) + " % </span> par rapport à la moyenne française");
                    } else {
                        tooltipMeanIndicator.html("<span class='boldText greenIndicator'>" + Math.round(e.delta) + " % </span> par rapport à la moyenne française");
                    }
                }

                switch (mapName) {
                    case "sport":
                        tooltipIndicator.html(Math.round(e.value) + " minutes/semaine");
                        break;

                    case "fastfood":
                        tooltipIndicator.html(Math.round(e.value) + " % mangent plus d'1 fois/mois dans un fastfood");
                        break;

                    case "butter":
                        tooltipIndicator.html("<b><u>" + e.battle_result + " </u></b><br>" + Math.round(e.value_beurre) + " g/jour de beurre <br>" + Math.round(e.value_huile) + " g/jour d'huile <br>");
                        tooltipRanking.html("");
						if (Math.round(e.delta_beurre) >= 0){
							if (Math.round(e.delta_huile) >= 0){
								tooltipMeanIndicator.html("<b> Par rapport à la moyenne française : </b><br>" + "<span class='boldText redIndicator'>+"  + Math.round(e.delta_beurre) + " % </span> de beurre <br>" + "<span class='boldText redIndicator'>+" + Math.round(e.delta_huile) + " % </span> d'huile <br>");							
							} else {
								tooltipMeanIndicator.html("<b> Par rapport à la moyenne française : </b><br>" + "<span class='boldText redIndicator'>+"  + Math.round(e.delta_beurre) + " % </span> de beurre <br>" + "<span class='boldText greenIndicator'>" + Math.round(e.delta_huile) + " % </span> d'huile <br>");								
							}
						}
						else {
							if (Math.round(e.delta_huile) >= 0){
								tooltipMeanIndicator.html("<b> Par rapport à la moyenne française : </b><br>" + "<span class='boldText greenIndicator'>"  + Math.round(e.delta_beurre) + " % </span> de beurre <br>" + "<span class='boldText redIndicator'>+" + Math.round(e.delta_huile) + " % </span> d'huile <br>");							
							} else {
								tooltipMeanIndicator.html("<b> Par rapport à la moyenne française : </b><br>" + "<span class='boldText greenIndicator'>"  + Math.round(e.delta_beurre) + " % </span> de beurre <br>" + "<span class='boldText greenIndicator'>" + Math.round(e.delta_huile) + " % </span> d'huile <br>");								
							}							
						}
                        break;
					case "alcohol":
                        tooltipIndicator.html(Math.round(e.value) + " % ont une ivresse répétée");
                        break;
					
					case "obesity":
                        tooltipIndicator.html(Math.round(e.value) + " % d'adultes obèses");
                        break;

                    default:
                        tooltipIndicator.html(Math.round(e.value) + " g/jour");
                }

                // Ajust tooltip's position
                div.style("left", (d3.event.pageX + 30) + "px").style("top", (d3.event.pageY - 30) + "px");
            })
            .on("mouseout", function (d) {
                tooltipRegionName.html("");
                tooltipIndicator.html("");
                tooltipRanking.html("");
                tooltipMeanIndicator.html("");

                d3.select(this)
                    .transition().duration(300)
                    .style("opacity", 1);
                div.transition()
                    .duration(500)
                    .style("opacity", 0);
                div.style("left", "0px")
                    .style("top", "0px");
            });
    });
}

function updatePodium(data, type_podium){
	
	var sortedData = data;
	var bestRegion = "P1";
	var secRegion = "P2";
	var worstRegion = "P3";
	
	switch (type_podium) {
        case "descending":
            $("#Res_Title").text("Champions et Perdant des Bonnes Habitudes");
			$("#podium_image").attr('src', "Pics/rank.gif").attr('class', "Res_Logo");
			$("#podium_names").attr('class',"")
			
			sortedData = data.sort(function(a, b) { return b.value - a.value; });
			bestRegion = sortedData[0].reg_name;
			secRegion = sortedData[1].reg_name;
			worstRegion = sortedData[20].reg_name;
			
			$("#best_region_name").attr('class', "Res_1 greenIndicator").text(bestRegion);
			$("#sec_region_name").attr('class', "Res_2").text(secRegion);
			$("#worst_region_name").attr('class', "Res_3 redIndicator").text(worstRegion);
			
            break;
        case "ascending":
            $("#Res_Title").text("Champions et Perdant des Bonnes Habitudes");
			$("#podium_image").attr('src', "Pics/rank.gif").attr('class', "Res_Logo");
			$("#podium_names").attr('class',"")
			
			sortedData = data.sort(function(a, b) { return  a.value - b.value; });
			bestRegion = sortedData[0].reg_name;
			secRegion = sortedData[1].reg_name;
			worstRegion = sortedData[20].reg_name;

			$("#best_region_name").attr('class', "Res_1 greenIndicator").text(bestRegion);
			$("#sec_region_name").attr('class', "Res_2").text(secRegion);
			$("#worst_region_name").attr('class', "Res_3 redIndicator").text(worstRegion);
           
            break;
        case "butter":
			//New logo
            $("#Res_Title").text("Champions respectifs");
			$("#podium_image").attr('src', "Logos/podium_beurre.svg").attr('class', "Res_Logo_Beurre");
			$("#podium_names").attr('class', "Podium_Names_Beurre");
			
			//Winner names
			sortedDataBeurre = data.sort(function(a, b) { return b.value_beurre - a.value_beurre; });
			bestRegion = sortedDataBeurre[0].reg_name;
			$("#best_region_name").attr('class', "Res_1_Beurre redIndicator").text(bestRegion);
			
			sortedDataHuile = data.sort(function(a, b) { return b.value_huile - a.value_huile; });
			secRegion = sortedDataHuile[0].reg_name;
			$("#sec_region_name").attr('class', "Res_2_Beurre greenIndicator").text(secRegion);
			
			worstRegion = "";
			$("#worst_region_name").text(worstRegion);
			
            break;
        default:
			// Podium
            $("#Res_Title").text("Champions et Perdant des Bonnes Habitudes");
			$("#podium_image").attr('src', "Pics/rank.gif").attr('class', "Res_Logo");
			$("#podium_names").attr('class',"")
			
			sortedData = data.sort(function(a, b) { return b.value - a.value; });
			bestRegion = sortedData[0].reg_name;
			secRegion = sortedData[1].reg_name;
			worstRegion = sortedData[20].reg_name;
			
			$("#best_region_name").attr('class', "Res_1 greenIndicator").text(bestRegion);
			$("#sec_region_name").attr('class', "Res_2").text(secRegion);
			$("#worst_region_name").attr('class', "Res_3 redIndicator").text(worstRegion);
           
    }
	
	
}

function updateData(plotName) {
    switch (plotName) {
        case "obesity":
			d3.csv("Data/Obesite.csv", function (error, data) { loadDataset(data, "obesity", false);  updatePodium(data, "ascending"); });
			updateTitles("obesity","Obesité : où trouve-t-on le plus d'obèses ?", "Prévalence de l'obésité");
            $("#map svg").attr("class", "Purples");
            break;
        case "vegetables":
            d3.csv("Data/fruits_legumes_resultats.csv", function (error, data) { loadDataset(data, "vegetables", false);  updatePodium(data, "descending"); });
            updateTitles("vegetables","Fruits et légumes : qui en mange le moins ?", "Consommation journalière moyenne de fruits et légumes");
            $("#map svg").attr("class", "RdYlGn");
            break;
        case "butter":
            d3.csv("Data/beurre_vs_huile_resultats.csv", function (error, data) { loadDataset(data, "butter", false);  updatePodium(data, "butter"); });
            updateTitles("butter","Beurre vs Huile", "Comparaison de la consommation journalière moyenne de beurre et d'huile");
            $("#map svg").attr("class", "Butter");
            break;
        case "sport":
            d3.csv("Data/act_physique_resultats.csv", function (error, data) { loadDataset(data, "sport", false);  updatePodium(data, "descending"); });
            updateTitles("sport","Sports : où en fait-on le plus ?", "Durée hebdomadaire moyenne d'activité physique intense");
            $("#map svg").attr("class", "Blues");
            break;
        case "fastfood":
            d3.csv("Data/fastfood_resultats.csv", function (error, data) { loadDataset(data, "fastfood", false);  updatePodium(data, "ascending"); });
            updateTitles("fastfood","Fastfoods : qui y va régulièrement ?", "Pourcentage de la population allant plus d'1 fois par mois dans un fastfood");
            $("#map svg").attr("class", "YlOrRd");
            break;
		case "alcohol":
		    d3.csv("Data/Alcool.csv", function (error, data) { loadDataset(data, "alcohol", true);  updatePodium(data, "ascending"); });
		    updateTitles("alcohol","Alcool : où se prend-on le plus de cuites ?", "Ivresses répétées (au moins trois ivresses dans l’année)");
            $("#map svg").attr("class", "Whisky");
            break;
		case "patisserie":
		    d3.csv("Data/patisserie_resultats.csv", function (error, data) { loadDataset(data, "patisserie", true);  updatePodium(data, "ascending"); });
		    updateTitles("patisserie","Pâtisserie : où sont les plus gourmands ?", "Consommation journalière de pâtisseries");
            $("#map svg").attr("class", "Pink");
            break;
		case "charcuterie":
		    d3.csv("Data/Charcuterie.csv", function (error, data) { loadDataset(data, "charcuterie", true);  updatePodium(data, "ascending"); });
		    updateTitles("charcuterie","Charcuterie : où en mange-t-on le plus ?", "Consommation journalière de charcuterie");
            $("#map svg").attr("class", "Charc");
            break;
        default:
            d3.csv("Data/fruits_legumes_resultats.csv", function (error, data) { loadDataset(data, "default", false);  updatePodium(data, plotName); });
            updateTitles("vegetables","Default case, not implemented yet...", "Consommation journalière de fruits et légumes");
            $("#map svg").attr("class", "Greys");
    }
}

function main() {
    var width = $(window).width();
    var height = $(window).height();

    // Open the modal window
    $("#myModal").modal("show");
    
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

    var div = d3.select('#map_tooltip');

    // Append the group that will contain our paths
    var deps = svg.append("g");

    // Use a queue to asynchronously load json files
    queue()
        .defer(d3.json, "Json/regions_before_2015.geojson")
        .await(ready);

    function ready(error, regions) {
        // Add regions
        deps.selectAll("g")
            .data(regions.features)
			.enter()
			.append("path")
			.attr('id', function (data) {
			    return "r" + data.properties.code;
			})
			.attr("d", path);
		/* Remove Corsica from the map */
		 deps.selectAll('g #'+"r94").remove();


        // Load some data
        updateData("unknown");
 

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

        // Update legend's position
        $("#legend").attr("transform", "translate(" + Math.round((width / 2) + width * 0.2) + ", " + Math.round(height / 2) + ")")

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
        menuDiv.transition().duration(200).style("opacity", .9).style("background", 'white');
        menuDiv.html("Les obèses").style("left", $("#menu_item_1 a img").position().left + "px").style("top", $("#menu_item_1 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_2").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9).style("background", 'white');
        menuDiv.html("Les veggies").style("left", $("#menu_item_2 a img").position().left + "px").style("top", $("#menu_item_2 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_3").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9).style("background", 'white');
        menuDiv.html("Les plutôt-beurre et les plutôt-huile").style("left", $("#menu_item_3 a img").position().left + "px").style("top", $("#menu_item_3 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_4").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9).style("background", 'white');
        menuDiv.html("Les sportifs").style("left", $("#menu_item_4 a img").position().left + "px").style("top", $("#menu_item_4 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_5").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9).style("background", 'white');
        menuDiv.html("Les adeptes du fastfood").style("left", $("#menu_item_5 a img").position().left + "px").style("top", $("#menu_item_5 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_6").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9).style("background", 'white');
        menuDiv.html("Les alcolos").style("left", $("#menu_item_6 a img").position().left + "px").style("top", $("#menu_item_6 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_7").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9).style("background", 'white');
        menuDiv.html("Les gourmands").style("left", $("#menu_item_7 a img").position().left + "px").style("top", $("#menu_item_7 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    $("#menu_item_8").on("mouseover", function (d) {
        menuDiv.transition().duration(200).style("opacity", .9).style("background", 'white');
        menuDiv.html("Les amateurs de charcuterie").style("left", $("#menu_item_8 a img").position().left + "px").style("top", $("#menu_item_8 a img").position().top + "px");
    }).on("mouseout", function (d) {
        menuDiv.transition().duration(500).style("opacity", 0);
        menuDiv.html("").style("left", "0px").style("top", "0px");
    });

    // Info tooltip
    $("#info_logo").on("mouseover", function (d) {
        d3.select("#info_tooltip").transition().duration(200).style("opacity", .9);
        d3.select("#info_tooltip").style("left", ($("#info_logo").position().left + 40) + "px").style("top", ($("#info_logo").position().top + 100) + "px");
    }).on("mouseout", function (d) {
        d3.select("#info_tooltip").transition().duration(1).style("opacity", 0);
        d3.select("#info_tooltip").style("left", "0px").style("top", "0px");
    });
	/*$("#info_logo").on("click", function (d) {
        d3.select("#info_tooltip_text").transition().duration(200).style("opacity", 1);
        d3.select("#info_tooltip").style("left", ($("#info_logo").position().left + 40) + "px").style("top", ($("#info_logo").position().top + 100) + "px");
    });*/
}

$(window).bind("load", main);