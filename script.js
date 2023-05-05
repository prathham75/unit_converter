var property = new Array();
var unit = new Array();
var factor = new Array();

property[0] = "Area";
unit[0] = new Array(
	"Square meter (m^2)",
    "Square centimeter",
    "Square kilometer",
    "Square foot (ft^2)",
    "Square inch (in^2)",
    
    
);
factor[0] = new Array(1, 0.0001, 1000000, 9.290304e-2, 6.4516e-4);

property[1] = "Length";
unit[1] = new Array(
    "Meter (m)",
    "Centimeter (cm)",
    "Kilometer (km)",
    "Foot (ft)",
    "Inch (in)",
    "Millimeter (mm)",
    "Nanometer (nm)",
    "Yard (yd)"
);
factor[1] = new Array(1, 0.01, 1000, 0.3048, 0.0254, 0.001, 1e-9, 0.9144);


property[2] = "Temperature";
unit[2] = new Array(
    "Degrees Celsius ('C)",
    "Degrees Fahrenheit ('F)",
    "Degrees Kelvin ('K)",
);
factor[2] = new Array(1, 0.555555555555, 1);
tempIncrement = new Array(0, -32, -273.15, -491.67);



function UpdateUnitMenu(propMenu, unitMenu) {
    var i;
    i = propMenu.selectedIndex;
    FillMenuWithArray(unitMenu, unit[i]);
}

function FillMenuWithArray(myMenu, myArray) {
    var i;
    myMenu.length = myArray.length;
    for (i = 0; i < myArray.length; i++) {
        myMenu.options[i].text = myArray[i];
    }
}

function CalculateUnit(sourceForm, targetForm) {
    var sourceValue = sourceForm.unit_input.value;

    sourceValue = parseFloat(sourceValue);
    if (!isNaN(sourceValue) || sourceValue == 0) {
      
        ConvertFromTo(sourceForm, targetForm);
    }
}

function ConvertFromTo(sourceForm, targetForm) {
    var propIndex;
    var sourceIndex;
    var sourceFactor;
    var targetIndex;
    var targetFactor;
    var result;

    propIndex = document.property_form.the_menu.selectedIndex;

    sourceIndex = sourceForm.unit_menu.selectedIndex;
    sourceFactor = factor[propIndex][sourceIndex];

    targetIndex = targetForm.unit_menu.selectedIndex;
    targetFactor = factor[propIndex][targetIndex];

    result = sourceForm.unit_input.value;
    // Handle Temperature increments!
    if (property[propIndex] == "Temperature") {
        result = parseFloat(result) + tempIncrement[sourceIndex];
    }
    result = result * sourceFactor;

    result = result / targetFactor;
    if (property[propIndex] == "Temperature") {
        result = parseFloat(result) - tempIncrement[targetIndex];
    }

    targetForm.unit_input.value = result;
}

window.onload = function (e) {
    FillMenuWithArray(document.property_form.the_menu, property);
    UpdateUnitMenu(document.property_form.the_menu, document.form_A.unit_menu);
    UpdateUnitMenu(document.property_form.the_menu, document.form_B.unit_menu);
};

document
    .getElementByClass("numbersonly")
    .addEventListener("keydown", function (e) {
        var key = e.keyCode ? e.keyCode : e.which;

        if (
            !(
                (
                    [8, 9, 13, 27, 46, 110, 190].indexOf(key) !== -1 ||
                    (key == 65 && (e.ctrlKey || e.metaKey)) || // Select All
                    (key == 67 && (e.ctrlKey || e.metaKey)) || // Copy
                    (key == 86 && (e.ctrlKey || e.metaKey)) || // Paste
                    (key >= 35 && key <= 40) || // End, Home, Arrows
                    (key >= 48 && key <= 57 && !(e.shiftKey || e.altKey)) || // Numeric Keys
                    (key >= 96 && key <= 105)(
                        key == 190
                    )
                ) 
            )
        )
            e.preventDefault();
    });