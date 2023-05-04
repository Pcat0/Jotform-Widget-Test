class ApiAutoCompleteWidget {
    #selectedValue = "";

    datalistField = document.querySelector("#optionsDatalist");
    inputField = document.querySelector("#apiAutoComplete");
    loadErrMessageElement = document.querySelector("#loadErrMessage");
    config = {};
    
    constructor() {

        //load settings
        this.config.apiurl = JFCustomWidget.getWidgetSetting('apiurl');
        this.config.valueName = JFCustomWidget.getWidgetSetting('valuename');
        
        // Initialize the options for the dropdown
        this.optionsInit();

        //register event listeners 
        this.inputField.addEventListener("change", e => {
            this.selectedValue = this.inputField.value;
            this.sendData();
        });
    }

    //check if the use has selected a valid option 
    get isValid() {
        return this.datalistField.selectedIndex < 1;
    }
    //to solve the edge case where populate is called before the options are loaded
    //and where this field is set to a value that is no longer a valid option,
    //we store our own "selectedValue" inside of relying on the HTML "value" field. 
    set selectedValue(value) {
        this.#selectedValue = value;
        this.inputField.value = value; 
        //this might be a dumb place to call sendData
        //this.sendData();
    }
    get selectedValue() { 
        return this.#selectedValue;
    }

    //Initialize the dropdown
    optionsInit(){
        this.loadErrMessageElement.style.display = "none"; // Make sure the error message is hidden
        this.loadOptionsFromURL(this.config.apiurl);
    }

    // Sends the selected value of the dropdown to JotForm
    sendData() {
        let msg = {
            valid: this.isValid,
            value: this.selectedValue
        }
        JFCustomWidget.sendData(msg);
    }

    // Sends the selected value of the dropdown to JotForm when the form is submitted
    sendSubmit() {
        let msg = {
            valid: this.isValid,
            value: this.selectedValue
        }
        JFCustomWidget.sendSubmit(msg);
    }

    // Function to clear all the options from the dropdown
    clearOptions(){
        this.datalistField.innerHTML = '';
    }

    // Function to load the options from the API and add them to the HTML of the dropdown
    loadOptionsFromURL(url) {
        // Fetch the data from the API
        fetch(url)
            .then(response=>response.json()) //convert response to JSON
            .then(data=>{
                this.clearOptions(); // Clear the options from the dropdown
                // this.addOption("Please Select",""); // Add the default "Please Select" option to the dropdown

                // Loop through the data and add each option to the dropdown
                data.forEach(dataRow=>this.addOption(
                    dataRow[this.config.valueName]
                ));

                this.datalistField.value = this.selectedValue; //visually select current selected option. 
            }).catch(err => {
                // Display the error message if the API call fails
                console.error(err);
                this.loadErrMessageElement.style.display = "initial";
            });
    }
    //Adds an option to the dropdown 
    addOption(optionValue){
        var option = document.createElement('option');
        option.value = optionValue;
        this.datalistField.appendChild(option);
    }
    //Change the currenly selected option without sending data to Jotform 
    //used when Jotform sends a "populate" event
    populate(newValue) {
        this.selectedValue = newValue;
    }
}
let widget;
function ready(){
    widget = new ApiAutoCompleteWidget();

    JFCustomWidget.subscribe("submit", data=>widget.sendSubmit());
    JFCustomWidget.subscribe('populate', data=>widget.populate(data.value));
}
JFCustomWidget.subscribe("ready", ready);
//https://jsonplaceholder.typicode.com/comments