const { exec, spawn } = require("child_process");

  
  const runMusicClassifyScript =  async (videoId) => {
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
    // console.log("Hello")
    // exec('python ./test.py', (error, stdout, stderr) => {
    //     if (error) {
    //       console.error(`exec error: ${error}`);
    //       return;
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     console.error(`stderr: ${stderr}`);
    //   });
    //path STARTS from ./backend
    //therefore, must go into src, music, etc..
    const subProcess = spawn('python', ["./src/music/classify-music-genre-lambda.py"]);

    subProcess.on('error', (err) => {
        console.error('Failed to start subprocess.');
        return
      });

    console.log("Spawned subprocess correctly!");
    return new Promise((resolve, reject) => {
        let result = ""
        subProcess.stdout.on('data', (data) => {
            result += data.toString()
        });
        subProcess.on('close', (code) => {
            if(code !== 0) {
                const msg = `failed with code ${code}`
                return reject(new Error(msg))
            }
            resolve(result)
        });
        subProcess.on('error', (err) => {
            reject(err)
        });
    })

  };

  
  module.exports = {
    runMusicClassifyScript,
  };