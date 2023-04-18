
function findAllPaths(adjacencyList, startPoint, endPoint, visited = new Set(), path = [],allPaths={}) {
    visited.add(startPoint);
    path.push(startPoint);
    if (startPoint === endPoint) {
        Object.assign(allPaths,path)
        console.log(allPaths);
       // console.log(path);
    } else {
        const neighbors = adjacencyList[startPoint];
        for (const neighbor of neighbors) {
            if (!visited.has(neighbor.point)) {
                findAllPaths(adjacencyList, neighbor.point, endPoint, visited, path);
            }
        }
    }
    path.pop();
    visited.delete(startPoint);
    return allPaths;
}

module.exports=findAllPaths