const PriorityQueue = require('priorityqueuejs');

const findAllPaths = (adjacencyList, startPoint, endPoint) => {
  const distances = {};
  const prevNodes = {};
  const pq = new PriorityQueue((a, b) => a.distance - b.distance);
  const paths = [];

  // Initialisation
  for (const node of Object.keys(adjacencyList)) {
    distances[node] = Infinity;
    prevNodes[node] = null;
  }
  distances[startPoint] = 0;

  // Ajout du nœud de départ à la file de priorité
  pq.enq({ node: startPoint, distance: 0 });

  while (!pq.isEmpty()) {
    const { node, distance } = pq.deq();

    // Si on a atteint le nœud d'arrivée, on reconstruit le chemin et on l'ajoute à la liste des chemins
    if (node === endPoint) {
      const path = [];
      let current = node;
      while (current !== null) {
        path.unshift({ point: current, distance: distances[current] });
        current = prevNodes[current];
      }
      paths.push(path);
      continue;
    }

    // Parcours des voisins
    const neighbors = adjacencyList[node];
    for (const neighbor of neighbors) {
      const newDistance = distance + neighbor.distance;
      if (newDistance < distances[neighbor.point]) {
        distances[neighbor.point] = newDistance;
        prevNodes[neighbor.point] = node;
        pq.enq({ node: neighbor.point, distance: newDistance });
      }
    }
  }
  return paths;
};

module.exports=findAllPaths;