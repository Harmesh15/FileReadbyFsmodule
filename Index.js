const http = require('http');
const fs = require('fs');

const server = http.createServer((req,res)=>{

    const url = req.url;
    const method = req.method;
    
    if(req.url == '/'){

         res.setHeader('Content-Type','text/html');

      res.end(
        `
        <form action="/message" method="POST">
        <label>Name:</label>
        <input type="text" name="userName" />
        <button type ="submit">ADD</button>
        </form>

        `
    );
    return;

} 
    if(req.url == "/message"  && method === "POST"){
        
        let body = [];

        req.on('data',(chunks)=>{
            body.push(chunks);
        });


        req.on('end', ()=>{

            let buffer = Buffer.concat(body);
            let formData = buffer.toString();
            let formValue = formData.split("=")[1];

            fs.writeFile('formData.txt',formValue,()=>{
                 
                  res.statusCode = 302; // redirected;
                  res.setHeader('Location','/');
                  res.end()  
            });
            
          
        })
}else{
      if(req.url == '/read'){
         
        fs.readFile("formData.txt",(err,data)=>{
            res.end(
                `
                <h1>${data.toString()}</h1>
                `
            );
        })

      }
}
    
})



let PORT = 3000;
server.listen(PORT,()=>console.log("helllo from server"));