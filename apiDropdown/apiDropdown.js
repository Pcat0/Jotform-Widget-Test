class ApiDropdown {
    selectionField;
    constructor() {
        this.selectionField = document.querySelector("#apiDropdown");
        //this.addOption("test");
    }
    addOption(optionText){
        var option = document.createElement('option');
        option.value = optionText;
        option.innerHTML = optionText;
        this.selectionField.appendChild(option);
    }
}


document.addEventListener("DOMContentLoaded", () => {
    let apiDropdown = new ApiDropdown();
});

