var strRawContents = "";
var numPlayersBad = 0;
var pointsMissed = 0;
var name = 0;
var might = 1;
var scores = 2;
var effective = 4;
var lines = [];

function LoadFile() {
    var oFrame = document.getElementById("frmFile");
    strRawContents = oFrame.contentWindow.document.body.childNodes[0].innerHTML;
    processData();
    displayOverAllPerformance();
    createTable(lines);

    $(function () {
        $("table").tablesorter({
            debug: true
        })
        //$("a.append").click(appendData);


    });

}

function processData() {
    lines = strRawContents.split("\n");
    //console.log(lines);
    for (var i = 0; i < lines.length; i++) {
        //console.log(lines[i]);
        lines[i] = lines[i].replace(/\t+/g, '|');
        lines[i] = lines[i].replace(/ +/g, '|');
        //console.log(lines[i]);
        lines[i] = lines[i].split("|");
        //console.log(lines[i]);
    }

    // console.log(lines);

    var name = 0;
    var might = 1;
    var scores = 2;
    var effective = 4;
    for (var i = 0; i < lines.length; i++) {
        //console.log("----------------------------")			
        //console.log(res[i][name] + " " + res[i][might] + " " + res[i][scores]);
        if (i != 0) {
            if (lines[i][might] < 80000) {
                lines[i].push("1300");
                lines[i].push(lines[i][scores] - 1300);
            } else if (lines[i][might] > 80000 && lines[i][might] < 100000) {
                lines[i].push("1500");
                lines[i].push(lines[i][scores] - 1500);
            } else if (lines[i][might] > 100000 && lines[i][might] < 120000) {
                lines[i].push("1700");
                lines[i].push(lines[i][scores] - 1700);
            } else if (lines[i][might] > 120000 && lines[i][might] < 140000) {
                lines[i].push("1900");
                lines[i].push(lines[i][scores] - 1900);
            } else if (lines[i][might] > 140000 && lines[i][might] < 160000) {
                lines[i].push("2100");
                lines[i].push(lines[i][scores] - 2100);
            } else if (lines[i][might] > 160000 && lines[i][might] < 180000) {
                lines[i].push("2200");
                lines[i].push(lines[i][scores] - 2200);
            } else if (lines[i][might] > 180000) {
                lines[i].push("2400");
                lines[i].push(lines[i][scores] - 2400);
            }
            if (lines[i][effective] > 0) {
                lines[i][effective] = "+" + lines[i][effective];
            } else {
                numPlayersBad++;
                if (lines[i][effective] != undefined) {
                    //                            alert(lines[i][effective] + "+" + pointsMissed);
                    pointsMissed += lines[i][effective];
                }
            }
        } else {
            lines[i].push("Min");
            lines[i].push("+/-");
        }
    }
    console.log("ProCEssDATA");
    console.log(lines);
}

function createTable(tableData) {
    var table = document.createElement('table');
    table.setAttribute("id", "table");
    var row = {};
    var cell = {};
    for (var i = 1; i < tableData.length - 1; i++) {
        row = table.insertRow(-1);
        for (var j = 0; j < tableData[i].length; j++) {
            cell = row.insertCell();
            cell.textContent = tableData[i][j];
            if (j == tableData[i].length - 1) {
                if (tableData[i][j] < 0) {
                    cell.setAttribute("class", "bad");
                }
                if (tableData[i][1] < 80000) {
                    cell.setAttribute("class", "neutral");
                }
            }
        }
    }
    var header = table.createTHead();
    row = header.insertRow(0);
    document.body.appendChild(table);

    var table = document.getElementById("table")
    var row = table.insertRow(0);

    row.insertCell(0).outerHTML = "<th>Name</th>"; // rather than innerHTML
    row.insertCell(1).outerHTML = "<th>Might</th>"; // rather than innerHTML
    row.insertCell(2).outerHTML = "<th>Score</th>"; // rather than innerHTML
    row.insertCell(3).outerHTML = "<th>Min</th>"; // rather than innerHTML
    row.insertCell(4).outerHTML = "<th>+/-</th>"; // rather than innerHTML

}

function displayOverAllPerformance(){
    var x = document.createElement("P"); // Create a <p> node
    var t = document.createTextNode("# of players not reached min - " + numPlayersBad); // Create a text node
    x.setAttribute("class", "styled");
    x.appendChild(t); // Append the text to <p>            
    document.body.appendChild(x);

    var point = document.createElement("P"); // Create a <p> node
    var points = document.createTextNode("Points Lost: " + pointsMissed); // Create a text node
    point.setAttribute("class", "styled");
    point.appendChild(points); // Append the text to <p>
    document.body.appendChild(point);
}