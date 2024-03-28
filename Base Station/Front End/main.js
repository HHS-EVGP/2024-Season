let items = []


function updateContent() {
    // Get the selected value from the dropdown
    var school = document.getElementById("schoolSelection").value;
    
    // Now you can use the 'school' variable in your JS file
    console.log('Selected school:', school);
    // ... do something with the 'school' value

    console.log('Selected things:', items);
} 
updateContent()

function getSelectedCheckboxes() {
    // Select all checked checkboxes within the list
    const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
    
    // Iterate over the NodeList of checked checkboxes
    checkedBoxes.forEach(box => {
        // Log the id of each checked checkbox
        console.log(box.id);
    });

    // Optionally, do something with the ids, like storing them in an array or handling their data
    const selectedIds = Array.from(checkedBoxes).map(box => box.id);
    console.log("Selected IDs: ", selectedIds);
    items = selectedIds;
}

function clearSelectedCheckboxes() {
    // Select all checkboxes
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    
    // Iterate over the NodeList of checkboxes and set their 'checked' property to false
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });
}