const btn = document.getElementById("generateBtn");
const promptBox = document.getElementById("prompt");
const output = document.getElementById("output");

btn.addEventListener("click", async () => {

    const prompt = promptBox.value.trim();

    if(prompt===""){
        alert("Please enter a prompt.");
        return;
    }

    output.innerHTML = "Generating...";

    try{

        const response = await fetch("http://127.0.0.1:8000/generate",{

            method:"POST",

            headers:{
                "Content-Type":"application/json"
            },

            body:JSON.stringify({
                prompt:prompt
            })

        });

        const data = await response.json();

        if(data.response){

            output.innerHTML=data.response;

        }else{

            output.innerHTML=data.error;

        }

    }catch(error){

        output.innerHTML="Server Error.";

    }

});