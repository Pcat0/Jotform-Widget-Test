
class ApiToFormWidget {
  apiQueryField = document.querySelector("#apiQuery");;
  runQueryButton = document.querySelector("#runQuery");
  lastQueryRan = null;
  config = {};
  #query = "";

  constructor() {
    //setup event listeners
    this.apiQueryField.addEventListener("change", (event)=>{
      this.populate(event.target.value);
    });
    this.runQueryButton.addEventListener("click", (event)=>{
      this.runAPIQuery();
    });

    //get widget settings
    this.config.apiurl = JFCustomWidget.getWidgetSetting('apiurl');
    this.config.autoRun = JFCustomWidget.getWidgetSetting('autorun') == "Yes";
    this.config.hide = JFCustomWidget.getWidgetSetting('hide') == "Yes";
    this.config.outputFields = JFCustomWidget.getWidgetSetting('outputfields').split("\n");

    
    //hide if widget is set to hidden and we are not in the form builder
    if (!JFCustomWidget.isWidgetOnBuilder() && this.config.hide){
      JFCustomWidget.hideWidgetContainer();
    }

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
  
  // Sends data to JotForm when the form is submitted
  sendSubmit() {
    let msg = {
      valid: true, //TODO: add valid logic
      value: this.query
    }
    JFCustomWidget.sendSubmit(msg);
  }

  //recive data from Jotform
  populate(newQuery) {
    this.query = newQuery;

    if(this.config.autoRun){
      this.runAPIQuery();
    }

  }
  //
  runAPIQuery(){
    //Don't rerun an identical query
    if (this.lastQueryRan == this.query) return;

    this.lastQueryRan = this.query; 

    console.log("Query ran");

    //TODO: handle errors 
    //Fetch data from API
    fetch(this.config.apiurl + this.query)
      .then(response=>response.json())
      .then(data=>{
        //loop over data coventering it to a format Jotform understands 
        let output = this.config.outputFields.map((outputField) => {
          return {
            label: outputField,
            value: data[outputField]
          };
        });
        //Populate fields with data from the API response 
        JFCustomWidget.setFieldsValueByLabel(output);
      });
    
  }
}



let widget;

JFCustomWidget.subscribe("ready", function() {
  widget = new ApiToFormWidget();
  
  //subscribe to jotformn events
  JFCustomWidget.subscribe("submit", data=>widget.sendSubmit(data));
  JFCustomWidget.subscribe('populate', data=>widget.populate(data.value));
  
  
});
