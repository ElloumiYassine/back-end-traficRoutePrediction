// function predictionSystem(scriptPath,args){
//   const { spawn } = require('child_process');

// // chemin du script Python
// const scriptPath = '/chemin/vers/votre/script.py';

// // arguments pour le script Python
// const args = ['arg1', 'arg2', 'arg3'];

// // exécuter le script Python en tant que processus enfant
// const pythonProcess = spawn('python', [scriptPath, ...args]);

// // récupérer la sortie du processus Python
// pythonProcess.stdout.on('data', (data) => {
//   console.log(`Sortie Python : ${data}`);
// });

// // gérer les erreurs de processus Python
// pythonProcess.stderr.on('data', (data) => {
//   console.error(`Erreur Python : ${data}`);
// });

// // gérer la fin du processus Python
// pythonProcess.on('close', (code) => {
//   console.log(`Processus Python terminé avec le code ${code}`);
// });
// }

// module.exports=predictionSystem