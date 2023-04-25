class ApiDropdownWidget {
    selectionField = document.querySelector("#apiDropdown");
    constructor() {
        this.loadOptionsFromURL("https://jsonplaceholder.typicode.com/comments");
        
    }
    loadOptionsFromURL(url){
        fetch(url)
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
function ready(){
    widget = new ApiDropdownWidget();

}
JFCustomWidget.subscribe("ready", ready);
  