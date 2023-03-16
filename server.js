const http = require('http');
const fs = require('fs');
const { url } = require('inspector');

const signed = [];
let visitors = 1; 

const server = http.createServer((request, response) => {
    let requestBody = '';
    request.on('data', (data) => {
        requestBody += data;
    });
    request.on('end', () => {
        if (requestBody) {
            console.log(request.headers['content-type']); 
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
                currentDate = new Date(); 
                console.log(`${currentDate} - Index page visit.`)
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
                currentDate = new Date(); 
                console.log(`${currentDate} - Page2 visit.`)
                let htmlReturn = fs.readFileSync('./page2.html', 'utf-8');
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');

                let guestList = '';
                let firstname = ''; 
                let lastname = ''; 
                let text = ''; 
                for (let element of signed) {
                    firstname = element.first_name; 
                    lastname = element.last_name; 
                    text = element.description; 
                    while (true) {
                        firstname = firstname.replace('<', '');
                        lastname = lastname.replace('<', '');
                        text = text.replace('<', '');
                        firstname = firstname.replace('>', '');
                        lastname = lastname.replace('>', '');
                        text = text.replace('>', '');                      

                        if (firstname.indexOf('<') === -1 && lastname.indexOf('<') === -1 && text.indexOf('<') === -1) {
                            break; 
                        }
                    }
                    guestList += `<li>First Name: ${firstname}     Last Name: ${lastname} <ul> <li>Some Text: ${text}</li></ul></li>`
                }
                htmlReturn = htmlReturn.replace('#{signee}', guestList);
                response.write(htmlReturn);
                return response.end();
            }

            if (request.url === '/page3.html') {
                currentDate = new Date(); 
                console.log(`${currentDate} - Page3 visit.`)
                const htmlReturn = fs.readFileSync('./page3.html', 'utf-8');
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                response.write(htmlReturn);
                return response.end();
            }

            if (request.url === '/page4.html') {
                currentDate = new Date(); 
                console.log(`${currentDate} - Page4 visit.`)
                const htmlReturn = fs.readFileSync('./page4.html', 'utf-8');
                response.statusCode = 200;
                response.setHeader('Content-Type', 'text/html');
                response.write(htmlReturn);
                return response.end();
            }

            if (request.url === '/images' || request.url === '/images.html') {
                response.statusCode = 404; 
                response.setHeader('Content-Type', 'text/html'); 
                htmlReturn = fs.readFileSync('./index.html', 'utf-8'); 
                response.write(htmlReturn); 
                return response.end(); 
            }

            const urlSplit = request.url.split('/');
            urlSplit.splice(0, 1);

            if (urlSplit[0] === 'images') {
                response.statusCode = 200;
                response.setHeader('Content-Type', 'image/jpg')
                interpoBoi = urlSplit.join('/')
                const imageReturn = fs.readFileSync(`./${interpoBoi}`);
                response.write(imageReturn);
                return response.end();
            }
        }

        if (request.method === 'POST') {
            if (request.url === '/signBook') {
                currentDate = new Date(); 
                console.log(`${currentDate} - Signed Book`)
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