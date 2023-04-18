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

    // Ajouter les points de départ et d'arrivée à la liste d'adjacence
    if (!adjacencyList[startPoint]) {
        adjacencyList[startPoint] = [];
    }
    if (!adjacencyList[endPoint]) {
        adjacencyList[endPoint] = [];
    }

    // Ajouter une arête entre les points de départ et d'arrivée
    adjacencyList[startPoint].push({ point: endPoint, distance: parseInt(distance) });
    adjacencyList[endPoint].push({ point: startPoint, distance: parseInt(distance) });
}

// Afficher la liste d'adjacence avec les distances
//console.log(adjacencyList);
module.exports = adjacencyList;
