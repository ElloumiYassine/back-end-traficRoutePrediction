const { log } = require('console');
const fs = require('fs');
const routes = [];

/*********************************************************************************************************/

// Charger le fichier JSON contenant les données des tronçons de routes
const data = fs.readFileSync('./trafficMetaData.json');
const jsonData = JSON.parse(data);

// Initialiser la liste d'adjacence
const adjacencyList = {};

// Boucler à travers chaque ligne
for (let i = 0; i < jsonData.length; i++) {
    const startPoint = jsonData[i].POINT_1_NAME;
    const endPoint = jsonData[i].POINT_2_NAME;
    const distance = jsonData[i].DISTANCE_IN_METERS;
    const POINT_1_LNG = jsonData[i].POINT_1_LNG;
    const POINT_1_LAT = jsonData[i].POINT_1_LAT;
    const POINT_2_LNG = jsonData[i].POINT_2_LNG;
    const POINT_2_LAT = jsonData[i].POINT_2_LAT;
    
    // Ajouter les points de départ et d'arrivée à la liste d'adjacence
    if (!adjacencyList[startPoint]) {
        adjacencyList[startPoint] = [];
    }
    if (!adjacencyList[endPoint]) {
        adjacencyList[endPoint] = [];
    }

    // Ajouter une arête entre les points de départ et d'arrivée
    adjacencyList[startPoint].push({ point: endPoint, distance: parseInt(distance),POINT_1_LNG:parseFloat(POINT_1_LNG),POINT_1_LAT:parseFloat(POINT_1_LAT) });
    adjacencyList[endPoint].push({ point: startPoint, distance: parseInt(distance),POINT_2_LNG:parseFloat(POINT_2_LNG),POINT_2_LAT:parseFloat(POINT_2_LAT) });
}

// Afficher la liste d'adjacence avec les distances
//console.log(adjacencyList);
module.exports = adjacencyList;
