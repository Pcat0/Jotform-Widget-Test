
class ApiToFormWidget {
  apiQueryField;
  apiurl = "";
  
  #query = "";
  constructor() {
    this.apiQueryField = document.querySelector("#apiQuery");
    
    //get widget settings
    this.apiurl = JFCustomWidget.getWidgetSetting('QuestionLabel');

    //TODO: set query on change of apiQueryField
    
  }
  
  get query() {
    return this.#query;
  }
  set query(query){
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
    
  }
}




JFCustomWidget.subscribe("ready", function(){
  widget = new ApiToFormWidget();
  
  JFCustomWidget.subscribe("submit", widget.sendSubmit);
  JFCustomWidget.subscribe('populate', widget.populateWidgetData);
});
