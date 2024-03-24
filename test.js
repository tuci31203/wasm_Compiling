var FS_stdin_getChar = () => {

    if (!FS_stdin_getChar_buffer.length) {
        var result = null;
        if (ENVIRONMENT_IS_NODE) {
            // we will read data by chunks of BUFSIZE
            var BUFSIZE = 256;
            var buf = Buffer.alloc(BUFSIZE);
            var bytesRead = 0;
            /** @suppress {missingProperties} */
            var fd = process.stdin.fd;

            try {
                bytesRead = fs.readSync(fd, buf);
            } catch (e) {
                if (e.toString().includes('EOF')) bytesRead = 0;
                else throw e;
            }

            if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
            } else {
                result = null;
            }
        } else
            if (typeof window != 'undefined' &&
                typeof window.prompt == 'function') {
                // Browser.
                result = window.prompt('Input: ');  // returns null on cancel
                if (result !== null) {
                    result += '\n';
                }
            } else if (typeof readline == 'function') {
                // Command line.
                result = readline();
                if (result !== null) {
                    result += '\n';
                }
            }
        if (!result) {
            return null;
        }
        FS_stdin_getChar_buffer = intArrayFromString(result, true);
    }

    return FS_stdin_getChar_buffer.shift();
};