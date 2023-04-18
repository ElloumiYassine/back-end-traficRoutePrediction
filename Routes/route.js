const express = require('express')
const Route = require('../Models/Route')
const router = express.Router();
const csv = require('csv-parser');


/**********************************Functions Call**************************************/

// const adjacencyList=require('./fonction/adjancencyList')
// const searchRoutes=require('./fonction/searchRoutes')
// const predictionSystem=require('./fonction/predictionSystem')

/*************************************************************************************/

// const allRoutes = [];
// console.log(adjacencyList);
// startPoint='4333'
// endPoint='4337'

// const routes = searchRoutes(adjacencyList,startPoint, endPoint);
// //const predictedVal=predictionSystem('path','fichCSV')
// console.log(routes);


/**************************************************************************** */

router.get('/start&endPoint', async (req, res) => {
    try {
        data = req.body
        const rte = new Route(data)
        rte.sysTime = new Date()
        console.log(rte);
        console.log(adjacencyList);
        searchRoutes(rte.startPoint, [rte.startPoint], allRoutes, rte.endPointn, adjacencyList);
        //console.log(allRoutes);
        console.log(routes);
        // const { startPoint, endPoint } = req.body;
        // const routes = await findRoutes(rte.startPoint, rte.endPointn);
        res.status(200).send(routes);

    } catch (error) {
        res.status(400).send(error)
    }
})



module.exports = router