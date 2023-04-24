class ApiDropdown {
    selectionField;
    constructor() {
        this.selectionField = document.querySelector("#apiDropdown");
        //this.addOption("test");
    }
    addOption(option){
        var option = document.createElement('option');
        option.value = option;
        option.innerHTML = option;
        this.selectionField.appendChild(option);
    }
}
let apiDropdown = new ApiDropdown();
