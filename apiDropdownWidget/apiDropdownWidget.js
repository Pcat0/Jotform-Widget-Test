class ApiDropdownWidget {
    selectionField = document.querySelector("#apiDropdown");
    config = {};

    constructor() {

        //load settings
        this.config.apiurl = JFCustomWidget.getWidgetSetting('apiurl');


        this.loadOptionsFromURL(this.config.apiurl);

    }
    clearOptions(){
        this.selectionField.innerHTML = '';
    }
    loadOptionsFromURL(url){
        fetch(url)
            .then(response=>response.json())
            .then(data=>{
                this.clearOptions();
                this.addOption("Please Select","");

                data.forEach(comment => {
                    this.addOption(comment.name, comment.id);
                });
            });
    }
    addOption(optionText, optionValue = optionText){
        var option = document.createElement('option');
        option.value = optionValue;
        option.innerHTML = optionText;
        this.selectionField.appendChild(option);
    }
}
let widget;
function ready(){
    widget = new ApiDropdownWidget();

}
JFCustomWidget.subscribe("ready", ready);
  