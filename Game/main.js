var gameData = {
    previousMoney: 0,
    money: 1000,
    salary: 1,
    promotionCost: 10,
    lastTick: Date.now(),
    income: 0,
    jobDays: 0,
    propertiesOwned: [
        
    ]
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

        property.value = value
    });

    gameData.propertiesOwned.forEach(property => {
        upgrades = 1
        for (const upgrade of property.upgrades) {
            upgrades += (Math.floor(upgrade.complete) * upgrade.value)
        }
        value = Math.ceil((property.landValue + property.structureValue) * upgrades);
        property.value = value
    });

}



function buy(buyID) {
    buyID = parseInt(buyID)
    var propertyToBuy = properties.properties.find(prop => prop.id === buyID)
    var buyIDIndex = properties.properties.findIndex(prop => prop.id === buyID)
    if (gameData.money >= propertyToBuy.value) {
        gameData.money -= propertyToBuy.value
        propertyToBuy.owned = true;
        gameData.propertiesOwned.push(propertyToBuy)
        properties.properties.splice(buyIDIndex, 1)

        updatePage()
        console.log(gameData)
        console.log(properties.properties)
    }
}
function sell(sellID) {
    sellID = parseInt(sellID)
    var propertyToSell = gameData.propertiesOwned.find(prop => prop.id === sellID)
    var sellIDIndex = gameData.propertiesOwned.findIndex(prop => prop.id === sellID)
    gameData.money += propertyToSell.value
    propertyToSell.owned = false;
    
    properties.properties.push(propertyToSell)
    gameData.propertiesOwned.splice(sellIDIndex, 1)
    updatePage()
    console.log(gameData)
    console.log(properties.properties)

}
//TODO upgrade()
//TODO rent()

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
    //update property values
    valueProperty();


    //properties to buy
    var template = $('#buy-properties-template').html();
    var templateScript = Handlebars.compile(template);
    var html = templateScript(properties);
    $("#properties-forSale").html(html);
    
    //update owned properties
    
    //$("#properties-owned").show()
    html = templateScript({properties: gameData.propertiesOwned});
    $("#properties-owned").html(html)
}

$(document).ready(function() {
    updatePage()
});