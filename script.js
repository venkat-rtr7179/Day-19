async function getData(no){

    var myHeaders = new Headers();
    myHeaders.append("apikey", "TDmRnXnMOcOrjfNcI0vHflGnz7WYNIkc");
    
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
      headers: myHeaders
    };
    
    const apiUrl = `https://api.apilayer.com/number_verification/validate?number=${no}`;

    try {
      const response = await fetch(apiUrl, requestOptions);
      const result = await response.json();
    //   console.log(result);
      var data = [];

      if(result['valid']==true){
        data.push("valid number",result['location'],result['carrier'],result['line_type'])
        console.log(data)
      const label =["validity :-","location :-","Service Provider :-","Line Type :-"]


      for(i=0;i<4;i++){
        var p = document.createElement("p");
        if(data[i]==""){
            p.textContent = label[i] + "Not available"
        }
        else {
            p.textContent = label[i] + data[i]
        }
       
       p.className ="text-primary"
        document.getElementById("numberapi").append(p)
      }

      }
      else {
        var p = document.createElement("p");
        p.textContent ="Invalid contact number entered"
       
       p.className ="text-primary"
        document.getElementById("numberapi").append(p)

      }

    } catch (error) {
      console.log("Error:", error);
    }
    
}



function createInput(){
var div = document.createElement("div");
div.style.width = "100%";
div.style.display ="flex";
div.style.flexDirection="column";
div.style.justifyContent ="center";
div.style.alignItems ="center"
div.id="numberapi"

var h1 = document.createElement("h1");
h1.textContent = "Contact Number verification";

var input = document.createElement("input");

input.placeholder ="Enter a  number"

input.type="text";
input.id ="number"

var span = document.createElement("span");
span.textContent = "Enter number with 91 before. eg. 919898989898";
span.style.minWidth = "30%";



var button = document.createElement("button");
button.className = "btn btn-primary"
button.textContent ="Search";


button.addEventListener("click",()=>{
    let para = document.querySelectorAll("p");
    if(para.length>0){
        para.forEach((p)=>{
            p.remove();
        })
    }

    let no = document.getElementById("number").value;
    // console.log(no.length)
    // console.log(typeof no.slice(0,2))
    // console.log(typeof no)
    if(no.length<12){
        alert("please enter a valid number")
    }
    else if(no.slice(0,2)!=="91"){
        alert("please enter 91 before the number")
    }
    else {
        getData(no);
    }

})

div.append(h1,input,span,button);
document.body.append(div)
}

createInput()

console.log(window.innerWidth)