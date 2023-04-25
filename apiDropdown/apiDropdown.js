class ApiDropdown {
    selectionField = document.querySelector("#apiDropdown");
    constructor() {
        //this.selectionField = document.querySelector("#apiDropdown");
        this.addOption("Test A");
        this.addOption("Test B");
        this.addOption("Test C");

    }
    addOption(optionText){
        var option = document.createElement('option');
        option.value = optionText;
        option.innerHTML = optionText;
        this.selectionField.appendChild(option);
    }
}

let apiDropdown;
document.addEventListener("DOMContentLoaded", () => {
    apiDropdown = new ApiDropdown();
    //test
});

