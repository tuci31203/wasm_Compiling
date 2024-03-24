import express from 'express';
import bodyParser from 'body-parser';
import { writeFile, unlink, readFileSync } from 'fs';
import { exec } from 'child_process';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.text());

// Serve the HTML page and the compiled WebAssembly module
app.use(express.static('public'));

// Endpoint to compile and execute C++ code
app.post('/api/compile', (req, res) => {
    const cppCode = req.body;

    // Write C++ code to a temporary file
    const tempCppFile = 'temp.cpp';
    writeFile(tempCppFile, cppCode, (err) => {
        if (err) {
            console.error('Error writing temporary C++ file:', err);
            res.status(500).send('Error writing temporary C++ file');
            return;
        }

        // Compile C++ code using emcc
        // exec(`emcc ${tempCppFile} -o public/output.js -s EXIT_RUNTIME=1`, (error, stdout, stderr) => {
        exec(`emcc ${tempCppFile} -o client/public/output.js -s EXIT_RUNTIME=1`, (error, stdout, stderr) => {
            // exec(`emcc ${tempCppFile} -o public/output.wasm -s WASM=1 -s SIDE_MODULE=1 -std=c++17 -O3`, (error, stdout, stderr) => {
            // exec(`emcc ${tempCppFile} -o public/output.wasm -s WASM=1 -s SIDE_MODULE=1 -std=c++17 -O3 -s EXPORTED_FUNCTIONS="['_main']" -s ERROR_ON_UNDEFINED_SYMBOLS=0 -s ENVIRONMENT=web`, (error, stdout, stderr) => {
            // Delete the temporary C++ file
            unlink(tempCppFile, (err) => {
                if (err) {
                    console.error('Error deleting temporary C++ file:', err);
                }
            });

            if (stderr) {
                const message = stderr.substring(0, stderr.indexOf("emcc: error:"))
                console.log(message)
                return res.status(400).json({
                    EM: 'stderr',
                    EC: 1,
                    DT: message,
                })
            }

            if (error) {
                console.error(`Compilation error: ${error}`);
                // res.status(500).send(error)
                return res.status(400).json({
                    EM: 'Compilation error',
                    EC: 1,
                    DT: error,
                })
            }

            console.log(`Compilation successful: ${stdout}`);
            return res.status(200).json({
                EM: 'Compiled successfully',
                EC: 0,
                DT: ''
            })

        });
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
