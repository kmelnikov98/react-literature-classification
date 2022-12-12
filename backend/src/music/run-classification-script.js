const { spawn } = require("child_process");

  const runMusicClassifyScript =  async (videoId) => {
    const subProcess = spawn('python', ["../literature-code/classify-music-genre-lambda.py", videoId]);

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