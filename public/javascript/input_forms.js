function addTeachCourse(){

    var formGroup = document.createElement("div");    
    var einput = document.createElement("input");    
    console.log('get to hbs');
    einput.name = "courses";
    einput.className="form__field";
    einput.type="text";
    formGroup.appendChild(einput);                                                              
    document.getElementById("teachCourses").appendChild(formGroup); 

  };

  function addVactions(){

    addDate("Start Date","Vacations","instructorvacationsStart");
    addDate("End Date","Vacations","instructorvacationsEnd");

  }

  function addOfficeDays(){
    addDate("Start Date","OfficeDays","instructorOfficeDaysStart");
    addDate("End Date","OfficeDays","instructorOfficeDaysEnd");
  }

  function addLeaveDays(){
    addDate("Start Date","instructorLeaves","instructorLeavesStart");
    addDate("End Date","instructorLeaves","instructorLeavesEnd");
  }

  function removetag(idiv){
    idiv.removeChild(idiv.lastElementChild);
    idiv.removeChild(idiv.lastElementChild);
  };

  function removeDate(idiv){
    idiv.parentNode.removeChild(idiv.previousElementSibling);
    idiv.parentNode.removeChild(idiv.previousElementSibling);
    idiv.parentNode.removeChild(idiv.previousElementSibling);
  };



  function addDate(ilabel,idiv,iname){
    var warpper = document.createElement("div");
    var Startdiv = document.createElement("div");    
    var sinput = document.createElement("input");
    var slabel = document.createElement("LABEL");
    var del = document.createElement("a");    
       
    Startdiv.style.position = "relative";
    Startdiv.style.display = "inline-block";

    sinput.setAttribute("class","form__field");
    sinput.setAttribute("type","date");
    sinput.setAttribute("name",iname);
    sinput.type="date";


    slabel.setAttribute("class","form__label");
    slabel.innerHTML = ilabel;
    slabel.style.position = 'relative';
    slabel.style.marginTop = '20px';


    Startdiv.appendChild(slabel);  
    Startdiv.appendChild(sinput);                                               
    document.getElementById(idiv).appendChild(Startdiv);
    
    
  }