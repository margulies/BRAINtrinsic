/**
 * Created by giorgioconte on 02/02/15.
 */

var connectionMatrixScale;
var groupColor = d3.scale.category10();
var metric = false;
var metricQuantileScale;
var matricValues;
var colorMap = {
    'MOT' :"#4682B4", 
    'SAL': "#C43AFA", 
    'DAN': "#00760E", 
    'FPN': "#EA9422", 
    'DMN': "#CD3E4E", 
    'LIM' :"#DCF8A4", 
    'VIS' :"#781286"
}

scaleColorGroup = function (group, nodeIndex) {
    nodeIndex = (typeof nodeIndex === 'undefined') ? -1 : nodeIndex;

    var color;
    if(group.replace) {
        var filteredGroup = group.replace("left", "");
        filteredGroup = filteredGroup.replace("right", "");
    }else{
        filteredGroup = group;
    }


    color = groupColor(filteredGroup);

    if(typeof (filteredGroup) != 'number' && filteredGroup.indexOf("RichClub") > -1){
        //color = new THREE.Color( "rgb(108, 122, 137)");
        color = "#6C7A89";
    }



    if(colorMap[filteredGroup] != undefined){
        color = colorMap[filteredGroup];
       
    }

    if(activeGroup == 3){
        if(nodeIndex == -1){
            console.log("ERROR!!!!");
            return metricQuantileScale(0);
        }
        color = metricQuantileScale(metricValues[nodeIndex][0]);
    }

    return color;
}



setColorGroupScale = function () {
 if(getActiveGroup().length <= 10){
     groupColor = d3.scale.category10();
 } else {
     groupColor = d3.scale.category20c();
 }

};

getConnectionMatrixScale = function () {
    var connectionMatrix = getConnectionMatrix();
    var allCells = [];
    if(!connectionMatrixScale){
        //This code is optimized for symmetric matrices
        var rows = connectionMatrix.length;
        for(var i=0; i < rows; i++){
            for(var j = 0; j<i; j++){
                allCells[allCells.length] = connectionMatrix[i][j];
            }
        }
        connectionMatrixScale = d3.scale.pow().domain(
            [
                d3.min(allCells, function(element){
                    return element;
                })
                ,
                d3.max(allCells, function(element){
                    return element;
                })
            ]
        ).range(colorbrewer.Greys[6]);

    }

    return connectionMatrixScale;

};


var round = function(number, digits){
    digits = Math.pow(10,digits);
    return Math.round(number*digits)/digits;

}


var foo = function(){
    loadMetricValues();
}

var foo1 = function () {
    metric = true;
    updateScene();
}