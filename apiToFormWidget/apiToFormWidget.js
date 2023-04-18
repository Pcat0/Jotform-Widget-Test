
class ApiToFormWidget {
  apiQueryField;
  apiurl = "";
  
  #query = "";
  constructor() {
    this.apiQueryField = document.querySelector("#apiQuery");
    this.apiQueryField.addEventListener("change", (event)=>{
      this.query = event.target.value;
    }); 
    //get widget settings
    this.apiurl = JFCustomWidget.getWidgetSetting('apiurl');

    //TODO: set query on change of apiQueryField
    
  }
  
  get query() {
    console.log("SET");
    return this.#query;
  }
  set query(query){
    console.log("GET");
    this.apiQueryField = query;
    this.#query = query;
  }
  
  
  //TODOL: sendData()
  
  
  sendSubmit() {
    let msg = {
      valid: true, //TODO: add valid logic
      value: query
    }
    JFCustomWidget.sendSubmit(msg);
  }
  populate(data) {
    this.querry = data.value;
  }
}



let widget;

JFCustomWidget.subscribe("ready", function(){
  widget = new ApiToFormWidget();
  
  JFCustomWidget.subscribe("submit", widget.sendSubmit);
  JFCustomWidget.subscribe('populate', widget.populate);
});
