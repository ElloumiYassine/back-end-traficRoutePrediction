const express = require('express')
const Route = require('../Models/Route')
const router = express.Router();
const csv = require('csv-parser');


/**********************************Functions Call**************************************/

const adjacencyList = require('./fonction/adjancencyList')
const findAllPaths = require('./fonction/findAllPaths')
const addLNGLAT = require("./fonction/addLNGLAT")
//const predictionSystem=require('./fonction/predictionSystem')

/*************************************************************************************/


/*************************************************************************************/
router.post('/start&endPoint', async (req, res) => {
    try {
        paths = []
        data = req.body
        const rte = new Route(data)
        rte.sysTime = new Date()
        console.log(rte);
        const adjacencyList = require('./fonction/adjancencyList')
        // console.log(adjacencyList);
        startPoint = String(rte.startPoint)
        endPoint = String(rte.endPoint)
        console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");
        const paths_link = findAllPaths(adjacencyList, startPoint, endPoint)
        const paths_link_lng_lat=addLNGLAT(paths_link)
        console.log("alooooooooooooooooo************************************************************************");
      //  console.log(paths_link);
        res.status(200).send(paths_link);

    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router