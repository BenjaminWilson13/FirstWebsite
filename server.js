const http = require('http');
const fs = require('fs'); 
const { url } = require('inspector');

const server = http.createServer((request, response) => {
    console.log(request.method, request.url)
    console.log('linebreak~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~')

    let requestBody = '';
    request.on('data', (data) => {
        console.log(request.method, request.url, 'asdf');
        requestBody += data;
    });
    console.log(requestBody); 
    request.on('end', () => {
        if (requestBody) {
            request.body = requestBody
                .split("&")
                .map((keyValuePair) => keyValuePair.split("="))
                .map(([key, value]) => [key, value.replace(/\+/g, " ")])
                .map(([key, value]) => [key, decodeURIComponent(value)])
                .reduce((acc, [key, value]) => {
                    acc[key] = value;
                    return acc;
                }, {});
        }

        if (request.method === 'GET') {
            if (request.url === '/' || request.url === '/index.html') {
                const htmlReturn = fs.readFileSync('./index.html', 'utf-8'); 
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'text/html'); 
                response.write(htmlReturn); 
                return response.end(); 
            }

            if (request.url === '/styles.css') {
                const cssReturn = fs.readFileSync('./styles.css', 'utf-8'); 
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'text/css'); 
                response.write(cssReturn); 
                return response.end(); 
            }

            if (request.url === '/page2.html') {
                const cssReturn = fs.readFileSync('./page2.html', 'utf-8'); 
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'text/html'); 
                response.write(cssReturn); 
                return response.end(); 
            }

            if (request.url === '/page3.html') {
                const cssReturn = fs.readFileSync('./page3.html', 'utf-8'); 
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'text/html'); 
                response.write(cssReturn); 
                return response.end(); 
                
            }

            if (request.url === '/page4.html') {
                const cssReturn = fs.readFileSync('./page4.html', 'utf-8'); 
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'text/html'); 
                response.write(cssReturn); 
                return response.end(); 
            }

            const urlSplit = request.url.split('/'); 
            urlSplit.splice(0, 1); 
            console.log(urlSplit); 
            
            if (urlSplit[0] === 'images') {
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'image/jpg')
                interpoBoi = urlSplit.join('/')
                console.log(interpoBoi); 
                const imageReturn = fs.readFileSync(`./${interpoBoi}`); 
                response.write(imageReturn); 
                return response.end(); 
            }

        }
        console.log(requestBody);
        response.end();
    }); 
});


const port = 5000;

server.listen(port, () => console.log(`Server is listening on port ${port}...`))