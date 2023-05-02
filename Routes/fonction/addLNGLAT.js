const fs = require('fs');

const data = fs.readFileSync('./trafficMetaData.json');
const jsonData = JSON.parse(data);
function addLNGLAT(paths_link) {
    for ( i = 0; i < paths_link.length; i++) {
        console.log(`Tableau ${i + 1}:`);
        for ( j = 0; j < paths_link[i].length; j++) {
            console.log(paths_link[i][j].point);
            for (let k = 0; k < jsonData.length; k++) {
                if (jsonData[k].POINT_1_NAME==paths_link[i][j].point) {
                    paths_link[i][j].POINT_1_LNG = jsonData[k].POINT_1_LNG
                    paths_link[i][j].POINT_1_LAT = jsonData[k].POINT_1_LAT
                }
            }
        }
    }
//console.log(paths_link);
}

module.exports = addLNGLAT