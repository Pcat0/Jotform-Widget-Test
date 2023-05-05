class ApiAutoCompleteWidget {

    datalistField = document.querySelector("#optionsDatalist");
    inputField = document.querySelector("#apiAutoComplete");
    loadErrMessageElement = document.querySelector("#loadErrMessage");
    config = {};

    constructor() {

        //load settings
        this.config.apiurl = JFCustomWidget.getWidgetSetting('apiurl');
        this.config.valueName = JFCustomWidget.getWidgetSetting('valuename');
        this.config.forceUppercase = JFCustomWidget.getWidgetSetting('forceuppercase') == 'on';

        // Initialize the options for the dropdown
        this.optionsInit();

        //register event listeners 
        this.inputField.addEventListener("change", e => {
            //this.inputValue = this.inputField.value;
            this.sendData();
        });
    }

    //check if the use has selected a valid option 
    get isValid() {
        return this.options.includes(this.inputValue);
    }

    //get array of options
    get options() {
        let optionsArr = [...this.datalistField.options];
        return optionsArr.map(option => option.value); 
    }

    set inputValue(value) {
        this.inputField.value = value; 
    }
    get inputValue() { 
        let value = this.inputField.value;
        if(this.config.forceUppercase) value = value.toUpperCase(); //uppercase value if "force uppercase" is turned on 
        return value;
    }

    //Initialize the datalist
    optionsInit(){
        this.loadErrMessageElement.style.display = "none"; // Make sure the error message is hidden
        this.loadOptionsFromURL(this.config.apiurl);
    }

    // Sends the current value of the input to JotForm
    sendData() {
        let msg = {
            valid: this.isValid,
            value: this.inputValue
        }
        JFCustomWidget.sendData(msg);
    }

    // Sends the current value of the input to JotForm when the form is submitted
    sendSubmit() {
        let msg = {
            valid: this.isValid,
            value: this.inputValue
        }
        JFCustomWidget.sendSubmit(msg);
    }

    // Function to clear all the options from the datalist
    clearOptions() {
        this.datalistField.innerHTML = '';
    }

    // Function to load the options from the API and add them to the HTML of the datalist
    loadOptionsFromURL(url) {
        // Fetch the data from the API
        fetch(url)
            .then(response => response.json()) //convert response to JSON
            .then(data => {
                this.clearOptions(); // Clear the options from the datalist

                // Loop through the data and add each option to the datalist
                data.forEach(dataRow => this.addOption(
                    dataRow[this.config.valueName]
                ));
            }).catch(err => {
                // Display the error message if the API call fails
                console.error(err);
                this.loadErrMessageElement.style.display = "initial";
            });
    }
    //Adds an option to the datalist 
    addOption(optionValue) {
        var option = document.createElement('option');
        option.value = optionValue;
        this.datalistField.appendChild(option);

    }
    //Change the currenly selected option without sending data to Jotform 
    //used when Jotform sends a "populate" event
    populate(newValue) {
        this.inputValue = newValue;
    }
}
let widget;
function ready(){
    widget = new ApiAutoCompleteWidget();

    JFCustomWidget.subscribe("submit", data => widget.sendSubmit());
    JFCustomWidget.subscribe('populate', data => widget.populate(data.value));
}
JFCustomWidget.subscribe("ready", ready);
//https://jsonplaceholder.typicode.com/comments