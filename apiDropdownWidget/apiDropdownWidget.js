class ApiDropdownWidget {
    #selectedValue = "";

    selectionField = document.querySelector("#apiDropdown");
    loadErrMessageElement = document.querySelector("#loadErrMessage");
    config = {};

    
    constructor() {

        //load settings
        this.config.apiurl = JFCustomWidget.getWidgetSetting('apiurl');
        this.config.labelName = JFCustomWidget.getWidgetSetting('labelname');
        this.config.valueName = JFCustomWidget.getWidgetSetting('valuename');
        
        //setup html
        this.optionsInit();

        //register event listeners 
        this.selectionField.addEventListener("change", e=>{
            this.selectedValue = this.selectionField.value;
            this.sendData();
        });
    }
    get isValid() {
        return this.selectionField.selectedIndex < 1;
    }
    //to solve the edge case where populate is called before the options are loaded
    //and where this field is set to a value that is no longer a valid option,
    //we store our own "selectedValue" inside of relying on the HTML "value" field. 
    set selectedValue(value) {
        this.#selectedValue = value;
        this.selectionField.value = value; 
        //this might be a dumb place to call sendData
        //this.sendData();
    }
    get selectedValue() { 
        return this.#selectedValue;
    }
    optionsInit(){
        this.loadErrMessageElement.style.display = "none";
        this.loadOptionsFromURL(this.config.apiurl);
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

                data.forEach(dataRow=>this.addOption(
                    dataRow[this.config.labelName], 
                    dataRow[this.config.valueName]
                ));

                this.selectionField.value = this.selectedValue; //visually select current selected option. 
            }).catch(err => {
                console.log(err);
                this.loadErrMessageElement.style.display = "initial";
            });
    }
    addOption(optionText, optionValue = optionText){
        var option = document.createElement('option');
        option.value = optionValue;
        option.innerHTML = optionText;
        this.selectionField.appendChild(option);
    }
    populate(newValue) {
        this.selectedValue = newValue;

    }
}
let widget;
function ready(){
    widget = new ApiDropdownWidget();

    JFCustomWidget.subscribe("submit", data=>widget.sendSubmit());
    JFCustomWidget.subscribe('populate', data=>widget.populate(data.value));
}
JFCustomWidget.subscribe("ready", ready);
//https://jsonplaceholder.typicode.com/comments