class ApiDropdownWidget {
    selectionField = document.querySelector("#apiDropdown");
    constructor() {
        //this.selectionField = document.querySelector("#apiDropdown");
        fetch("https://jsonplaceholder.typicode.com/comments")
            .then(response=>response.json())
            .then(data=>{
                data.forEach(comment => {
                    this.addOption(comment.name, comment.id);
                });
            });
        
    }
    addOption(optionText, optionValue = optionText){
        var option = document.createElement('option');
        option.value = optionText;
        option.innerHTML = optionValue;
        this.selectionField.appendChild(option);
    }
}

let widget;
document.addEventListener("DOMContentLoaded", () => {
    widget = new ApiDropdownWidget();
    //test
});

