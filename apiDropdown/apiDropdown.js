class ApiDropdown {
    selectionField;
    constructor() {
        this.selectionField = document.querySelector("#apiDropdown");
        this.addOption("test a");
        this.addOption("test b");
        this.addOption("test c");

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
});

