class ApiDropdownWidget {
    selectionField = document.querySelector("#apiDropdown");
    config = {};

    constructor() {

        //load settings
        this.config.apiurl = JFCustomWidget.getWidgetSetting('apiurl');
        
        //setup html
        this.loadOptionsFromURL(this.config.apiurl);

        //register event listeners 
        this.selectionField.addEventListener("change", e=>this.sendData());
    }
    get isValid() {
        return this.selectionField.selectedIndex < 1;
    }
    get selectedValue() { 
        return this.selectionField.value;
    }
    sendData() {
        let msg = {
            valid: this.isValid,
            value: this.selectedValue
        }
        JFCustomWidget.sendData(msg);
    }
    sendSubmit() {
        let msg = {
            valid: this.isValid,
            value: this.selectedValue
        }
        JFCustomWidget.sendSubmit(msg);
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

    JFCustomWidget.subscribe("submit", data=>widget.sendSubmit());
}
JFCustomWidget.subscribe("ready", ready);
  