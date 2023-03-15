const http = require('http');
const fs = require('fs'); 
const { url } = require('inspector');

const signed = []; 

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
                let htmlReturn = fs.readFileSync('./page2.html', 'utf-8'); 
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'text/html'); 
                
                let guestList = ''; 
                console.log(signed); 
                for (let element of signed) {
                    guestList += `<li>First Name: ${element.first_name}     Last Name: ${element.last_name} <ul> <li>Some Text: ${element.description}</li></ul></li>`
                }
                htmlReturn = htmlReturn.replace('#{signee}', guestList); 
                response.write(htmlReturn); 
                return response.end(); 
            }

            if (request.url === '/page3.html') {
                const htmlReturn = fs.readFileSync('./page3.html', 'utf-8'); 
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'text/html'); 
                response.write(htmlReturn); 
                return response.end(); 
            }

            if (request.url === '/page4.html') {
                const htmlReturn = fs.readFileSync('./page4.html', 'utf-8'); 
                response.statusCode = 200; 
                response.setHeader('Content-Type', 'text/html'); 
                response.write(htmlReturn); 
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

        if (request.method === 'POST') {
            if (request.url === '/signBook') {
                signed.push(request.body); 
                response.statusCode = 302; 
                response.setHeader('Location', '/page2.html'); 
                return response.end(); 
            }
        }

        response.statusCode = 404; 
        response.setHeader('Content-Type', 'text/html'); 
        response.end(fs.readFileSync('./index.html', 'utf-8'));
    }); 
});


const port = 5000;

server.listen(port, () => console.log(`Server is listening on port ${port}...`))