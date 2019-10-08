var gameData = {
    previousMoney: 0,
    money: 1000,
    salary: 1,
    promotionCost: 10,
    lastTick: Date.now(),
    income: 0,
    jobDays: 0,
    propertiesOwned: []
}
var properties = {
    properties: [{
            id: 1,
            name: "shack",
            type: "house",
            structureValue: 20,
            landValue: 80,
            taxrate: 0,
            renters: 0,
            rent: 0,
            capacity: 0,
            upgrades: [
                { name: "Buy Door", Cost: 50, value: .05, complete: 0, max: 1 },
                { name: "Clean", Cost: 150, value: .10, complete: 0, max: 3 },
                { name: "Roof", Cost: 200, value: .20, complete: .1, max: 1 },
                { name: "Fix Plumbing", Cost: 100, value: .20, complete: 0, max: 1 }
            ]
        },
        {
            id: 2,
            name: "crappy shack",
            type: "house",
            structureValue: 20,
            landValue: 80,
            taxrate: 0,
            renters: 0,
            rent: 0,
            capacity: 0,
            upgrades: [
                { name: "door", Cost: 50, value: .05, complete: 0, max: 1 },
                { name: "clean", Cost: 150, value: .10, complete: 0, max: 3 },
                { name: "roof", Cost: 200, value: .20, complete: 0, max: 1 },
                { name: "fix Plumbing", Cost: 100, value: .20, complete: 0, max: 1 }
            ]
        },
        {
            id: 3,
            name: "somehow worse shack",
            type: "house",
            structureValue: 20,
            landValue: 80,
            taxrate: 0,
            renters: 0,
            rent: 0,
            capacity: 0,
            upgrades: [
                { name: "door", Cost: 50, value: .05, complete: 0, max: 1 },
                { name: "clean", Cost: 150, value: .10, complete: 0, max: 3 },
                { name: "roof", Cost: 200, value: .20, complete: 0, max: 1 },
                { name: "Fix Plumbing", Cost: 100, value: .20, complete: 0, max: 1 }
            ]
        },
        {
            id: 4,
            name: "fantastishack",
            type: "house",
            structureValue: 20,
            landValue: 80,
            taxrate: 0,
            renters: 0,
            rent: 0,
            capacity: 0,
            upgrades: [
                { name: "door", Cost: 50, value: .05, complete: 0, max: 1 },
                { name: "clean", Cost: 150, value: .10, complete: 0, max: 3 },
                { name: "roof", Cost: 200, value: .20, complete: 0, max: 1 },
                { name: "fix Plumbing", Cost: 100, value: .20, complete: 0, max: 1 }
            ]
        }
    ]
};




function work() {
    gameData.money += gameData.salary
    gameData.jobDays += 1
    updatePage()
}

function promotion() {
    if (gameData.jobDays >= gameData.promotionCost) {
        gameData.salary += 1
        gameData.promotionCost *= 1.7
        updatePage()
        document.getElementById("experience").innerHTML = "experience: " + gameData.jobDays
        document.getElementById("promotion").innerHTML = "Get a promotion (Currently Level " + gameData.salary + ") XP needed: " + Math.ceil(gameData.promotionCost)
    }
}

function valueProperty() {
    properties.properties.forEach(property => {
        upgrades = 1
        for (const upgrade of property.upgrades) {
            upgrades += (Math.floor(upgrade.complete) * upgrade.value)
        }
        value = Math.ceil((property.landValue + property.structureValue) * upgrades);
        //$("#" + buyID + " > footer > a .price").html("$" + value)
        property.value = value
    });
    gameData.propertiesOwned.forEach(property => {
        upgrades = 1
        for (const upgrade of property.upgrades) {
            upgrades += (Math.floor(upgrade.complete) * upgrade.value)
        }
        value = Math.ceil((property.landValue + property.structureValue) * upgrades);
        //$("#" + buyID + " > footer > a .price").html("$" + value)
        property.value = value
    });

}

function oldvalueProperty() {

    // for each property to buy
    //why am I doing this this way??
    $('.property').each(function(index, value) {
        var buyID = parseInt($(this).attr('id'))
        var propertyToValue = properties.properties.find(prop => prop.id === buyID)
        var upgrades = 1
        for (const upgrade of propertyToValue.upgrades) {
            upgrades += (Math.floor(upgrade.complete) * upgrade.value)
        }
        value = Math.ceil((propertyToValue.landValue + propertyToValue.structureValue) * upgrades);
        //$("#" + buyID + " > footer > a .price").html("$" + value)
        propertyToValue.value = value
    });

}


function buy(buyID) {
    buyID = parseInt(buyID)
    var propertyToBuy = properties.properties.find(prop => prop.id === buyID)
    var buyIDIndex = properties.properties.findIndex(prop => prop.id === buyID)
    console.log(buyIDIndex)
    if (gameData.money >= propertyToBuy.value) {
        gameData.money -= propertyToBuy.value

        gameData.propertiesOwned.push(propertyToBuy)
        properties.properties.splice(buyIDIndex, 1)

        updatePage()
        console.log(gameData)
        console.log(properties.properties)
    }
}

var mainGameLoop = window.setInterval(function() {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now()
    gameData.previousMoney = Math.floor(gameData.money)
    tickIncome = (gameData.income * (diff / 1000)) + ((gameData.salary / 2) * (diff / 1000))
    gameData.money += tickIncome
    updatePage()
}, 1000);


function updatePage() {
    //update Money
    document.getElementById("experience").innerHTML = "experience: " + gameData.jobDays
    if (gameData.previousMoney != Math.floor(gameData.money)) {
        $('#money').html("$" + Math.floor(gameData.money))
    }
    valueProperty();

    //properties to buy
    var template = $('#properties-template').html();
    var templateScript = Handlebars.compile(template);
    var html = templateScript(properties);
    $("#properties").html(html);


    //update property values

}

$(document).ready(function() {
    updatePage()
});