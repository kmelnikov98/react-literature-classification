const { spawn } = require("child_process");

  
  const runMusicClassifyScript = (videoId) => {
    //  JSON.stringify(myList) can use this to pass json objects to pythob
    //const subProcess = spawn('python', ["./test.py"]);
    //let classifiedGenre = ""

    // try {
    //     if(subProcess.stdout) {
    //         console.log("yes")
    //     }
    //     subProcess.stdout.on('data', (data) => {
    //         classifiedGenre += data.toString();
    //       });
    //       subProcess.on('close',  () => {
    //         console.log(classifiedGenre)
    //       });
    // }
    // catch(error) {
    //     console.log(error)
    // }

    // console.log('hello')
 
    // return classifiedGenre

    const subProcess = spawn('python', ["./test.py"]);
    return new Promise((resolve, reject) => {
        let result = ""
        subProcess.stdout.on('data', (data) => {
            result += data
        });
        subProcess.on('close', () => {
            console.log(result)
            resolve("retard")
        });
        subProcess.on('error', (err) => {
            reject(err)
        });
    })

  };

  
  module.exports = {
    runMusicClassifyScript,
  };