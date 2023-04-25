class ApiDropdownWidget {
    selectionField = document.querySelector("#apiDropdown");
    constructor() {
        //this.selectionField = document.querySelector("#apiDropdown");
        fetch(this.config.apiurl + this.query)
            .then(response=>response.json())
            .then(data=>{
                data.forEach(comment => {
                    addOption(comment.name, comment.id);
                });
            });

    }
    addOption(optionText, optionValue){
        var option = document.createElement('option');
        option.value = optionText;
        option.innerHTML = optionText;
        this.selectionField.appendChild(option);
    }
}

let widget;
document.addEventListener("DOMContentLoaded", () => {
    widget = new ApiDropdownWidget();
    //test
});

