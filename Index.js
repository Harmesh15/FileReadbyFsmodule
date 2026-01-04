const http = require('http');
const fs = require('fs');
const { isUtf8 } = require('buffer');

const server = http.createServer((req,res)=>{

    const url = req.url;
    const method = req.method;
    
   if(req.url == '/'){
         
        fs.readFile("formData.txt",'utf8',(err,Data)=>{
            let msg = Data ? Data.split("\n") : [];

            const messageList = msg
            .filter(item=>item.trim() !== "")
            .map(item=> `<li>${item}</li>`)
            .join("");

            res.setHeader('Content-type','text/html');

            res.end(
                `
                <ul>${messageList}</ul>

                 <form action="/message" method="POST">
                 <label>Name:</label>
                <input type="text" name="userName" />
               <button type="submit">ADD</button>
               </form>
                `
            );
        })

      }
       
    if(req.url == "/message"  && method === "POST"){
        
        let body = [];

        req.on('data',(chunks)=>{
            body.push(chunks);
        });


        req.on('end', ()=>{

            let buffer = Buffer.concat(body);
            let formData = buffer.toString();
            let formValue = decodeURIComponent(formData.split("=")[1]);

            fs.readFile('formData.txt','utf8',(err,oldData)=>{
                  let updatedValue = formValue + "\n" + (oldData || "");


                  fs.writeFile('formData.txt',updatedValue,()=>{
                     
                    res.statusCode = 302; // redirected;
                    res.setHeader('Location','/');
                    res.end()

                  })  
            });
            
          
        })
 }

})



let PORT = 3000;
server.listen(PORT,()=>console.log("helllo from server"));