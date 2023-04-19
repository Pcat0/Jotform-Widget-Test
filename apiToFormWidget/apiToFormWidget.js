
class ApiToFormWidget {
  apiQueryField;
  runQueryButton;
  lastQueryRan = null;
  config = {};
  #query = "";
  constructor() {
    this.apiQueryField = document.querySelector("#apiQuery");
    this.apiQueryField.addEventListener("change", (event)=>{
      this.populate(event.target.value);
    });
    this.runQueryButton = document.querySelector("#runQuery");
    this.runQueryButton.addEventListener("click", (event)=>{
      this.runAPIQuery();
    });
    //get widget settings
    this.config.apiurl = JFCustomWidget.getWidgetSetting('apiurl');
    this.config.autoRun = JFCustomWidget.getWidgetSetting('autorun') == "Yes";
    this.config.outputFields = JFCustomWidget.getWidgetSetting('outputFields').split("\n");
    console.log(this.config.autoRun);
    //TODO: set query on change of apiQueryField
    
  }

  get query() {
    console.log("GET");
    return this.#query;
  }
  set query(query){
    console.log("SET");
    this.apiQueryField.value = query;
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
  populate(newQuery) {
    this.query = newQuery;

    if(this.config.autoRun){
      this.runAPIQuery();
    }

  }
  
  runAPIQuery(){
    //Don't rerun an identical query
    if (this.lastQueryRan == this.query) return;

    this.lastQueryRan = this.query;

    console.log("Query ran");

    //TODO: handle errors 
    fetch(this.config.apiurl + this.query)
      .then(response=>response.json())
      .then(data=>{
        console.log(data);
        let ouput = this.config.outputFields.map((outputField) => {
          return {
            label: outputField,
            value: data[outputField]
          };
        });
        JFCustomWidget.setFieldsValueByLabel(ouput);
      });
    
  }
}



let widget;

JFCustomWidget.subscribe("ready", function(){
  widget = new ApiToFormWidget();
  
  JFCustomWidget.subscribe("submit", data=>widget.sendSubmit(data));
  JFCustomWidget.subscribe('populate', data=>widget.populate(data.value));
});
