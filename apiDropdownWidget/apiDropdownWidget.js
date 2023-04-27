class ApiDropdownWidget {
    #selectedValue = "";

    selectionField = document.querySelector("#apiDropdown");
    config = {};

    
    constructor() {

        //load settings
        this.config.apiurl = JFCustomWidget.getWidgetSetting('apiurl');
        
        //setup html
        this.loadOptionsFromURL(this.config.apiurl);

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

                this.selectionField.value = this.selectedValue; //visually select current selected option. 
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