document.getElementById("nameInput").addEventListener("input", () => {
    document.getElementById("nameDisplay").innerText =
        document.getElementById("nameInput").value || "Not Provided";
});

document.getElementById("jobInput").addEventListener("input", () => {
    document.getElementById("jobDisplay").innerText =
        document.getElementById("jobInput").value || "Not Provided";
});

document.getElementById("ageInput").addEventListener("input", () => {
 const age=document.getElementById("ageInput").value;

 if(age>=10 && age<=19){
     document.getElementById("ageDisplay").innerText =
        age  || "Not Provided";

 }else{
    document.getElementById("ageDisplay").innerText="invalid age";
 }
  

    
});

document.getElementById("bioInput").addEventListener("input", () => {
    document.getElementById("bioDisplay").innerText =
        document.getElementById("bioInput").value || "Not Provided";
});