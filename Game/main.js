var names = $.getJSON("./names.json", function() {
    names = names.responseJSON
});

var gameData = {
    startup: 0,
    previousMoney: 0,
    money: 100,
    salary: 1,
    promotionCost: 10,
    lastTick: Date.now(),
    income: 0,
    jobDays: 0,
    propertiesOwned: [],

    landRatePrevious: 1,
    landRate: 1,
    landTarget: 1,
    landTargetSpeed: 1.0


}

function startup(){
    if (gameData.startup = 0){
        PropertyGen()
    }else{}
}

function PropertyGen(){
    function weightedRandom(min, max) {
        return Math.round(max / (Math.random() * max + min));
    }
    function getAdjective(name){
        var rand = weightedRandom(1,10)
        var availableAdjs = names[name].adjectives
        var adjs = []
        
        $.each(availableAdjs,function(key,value){
            if (value.Frequency <= rand ){adjs.push(key)}
        });
        return adjs[Math.floor(Math.random()*adjs.length)]    
    }
    function getName(){
        return Object.keys(names)[Math.floor(Math.random()*Object.keys(names).length)]
    }


    var name = getName()
    adj = getAdjective(name)
    name = adj + " " + name
    

}

var properties = {
    properties: [{
        id: 1,
        level: 0,
        name: "shack",
        type: "house",
        structureValue: 20,
        landValue: 80,
        taxrate: 0,
        renters: 0,
        rent: 0,
        capacity: 0,
        upgrades: [
            { name: "Buy Door", Cost: 50, value: .10, complete: 0, max: 1, min: 1 },
            { name: "Clean", Cost: 150, value: .20, complete: 0, max: 3, min: 1 },
            { name: "Roof", Cost: 200, value: .30, complete: .1, max: 1, min: 1 },
            { name: "Fix Plumbing", Cost: 100, value: .20, complete: 0, max: 1, min: 1 }
        ]
    },
    {
        id: 2,
        level: 0,
        name: "crappy shack",
        type: "house",
        structureValue: 20,
        landValue: 80,
        taxrate: 0,
        renters: 0,
        rent: 0,
        capacity: 0,
        upgrades: [
            { name: "door", Cost: 50, value: .05, complete: 0, max: 1, min: 1 },
            { name: "clean", Cost: 150, value: .10, complete: 0, max: 3, min: 1 },
            { name: "roof", Cost: 200, value: .20, complete: 0, max: 1, min: 1 },
            { name: "fix Plumbing", Cost: 100, value: .20, complete: 0, max: 1, min: 1 }
        ]
    },
    {
        id: 3,
        level: 0,
        name: "somehow worse shack",
        type: "house",
        structureValue: 20,
        landValue: 80,
        taxrate: 0,
        renters: 0,
        rent: 0,
        capacity: 0,
        upgrades: [
            { name: "door", Cost: 50, value: .05, complete: 0, max: 1, min: 1 },
            { name: "clean", Cost: 150, value: .10, complete: 0, max: 3, min: 1 },
            { name: "roof", Cost: 200, value: .20, complete: 0, max: 1, min: 1 },
            { name: "Fix Plumbing", Cost: 100, value: .20, complete: 0, max: 1, min: 1 }
        ]
    },
    {
        id: 4,
        level: 0,
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
    },
    {
        id: 51,
        level: 0,
        name: "shackapalooza",
        type: "house",
        structureValue: 20,
        landValue: 80,
        taxrate: 0,
        renters: 0,
        rent: 0,
        capacity: 0,
        upgrades: [
            { name: "Buy Door", Cost: 50, value: .10, complete: 0, max: 1, min: 1 },
            { name: "Clean", Cost: 150, value: .20, complete: 0, max: 3, min: 1 },
            { name: "Roof", Cost: 200, value: .30, complete: .1, max: 1, min: 1 },
            { name: "Fix Plumbing", Cost: 100, value: .20, complete: 0, max: 1, min: 1 }
        ]
    }

    ]
};

function setLandRate() {
    function setLandRateTarget() {
        gameData.landTarget = (Math.random() * 2)
        gameData.landTargetSpeed = Math.random()
        //console.log("changing")
        //console.log("CHANGED landRate: " + gameData.landRate + " LandTarget: " + gameData.landTarget + " landTargetSpeed: " + gameData.landTargetSpeed)
    }
    if (gameData.landRatePrevious < gameData.landTarget && gameData.landRate < gameData.landTarget) {
        //up
        change = (gameData.landTarget - gameData.landRatePrevious) * gameData.landTargetSpeed
        gameData.landRate += change + .01
        //console.log("up")
        //console.log("landRate: " + gameData.landRate + " LandTarget: " + gameData.landTarget + " landTargetSpeed: " + gameData.landTargetSpeed + " change: " + change)
    } else if (gameData.landRatePrevious > gameData.landTarget && gameData.landRate > gameData.landTarget) {
        //down
        change = (gameData.landTarget - gameData.landRatePrevious) * gameData.landTargetSpeed
        gameData.landRate += change - .01
        //console.log("Down")
        //console.log("landRate: " + gameData.landRate + " LandTarget: " + gameData.landTarget + " landTargetSpeed: " + gameData.landTargetSpeed + " change: " + change)
    } else {
        setLandRateTarget()
        setLandRate()
    }
}



// a handlebars helper to add comparison functions.
Handlebars.registerHelper("when", function (operand_1, operator, operand_2, options) {
    var operators = {
        'eq': function (l, r) { return l == r; },
        'noteq': function (l, r) { return l != r; },
        'gt': function (l, r) { return Number(l) > Number(r); },
        'or': function (l, r) { return l || r; },
        'and': function (l, r) { return l && r; },
        '%': function (l, r) { return (l % r) === 0; }
    }
        , result = operators[operator](operand_1, operand_2);

    if (result) return options.fn(this);
    else return options.inverse(this);
});



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
        value = Math.ceil(
            ((property.landValue * gameData.landRate) * ((property.structureValue * upgrades) * .05) + property.structureValue * upgrades) * 1.05);

        property.value = value
    });
    gameData.income = 0
    gameData.propertiesOwned.forEach(property => {
        upgrades = 1
        var max = 0
        var complete = 0
        for (const upgrade of property.upgrades) {
            upgrades += (Math.floor(upgrade.complete) * upgrade.value)
            max += upgrade.max
            complete += upgrade.complete
        }
        value = Math.ceil(
            ((property.landValue * gameData.landRate) * ((property.structureValue * upgrades) * .05) + property.structureValue * upgrades) * .95)
        property.value = value
        if (property.value < 0) {
            property.renters = 0
        }
        // if all upgrades are complete then set renting
        if ((max - complete) === 0) {
            property.capacity = property.level + 1
        } else {
            property.capacity = 0
        }
        property.rent = (Math.round((value * .01) * 10) / 10)
        gameData.income += property.rent * property.renters
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
        //console.log(gameData)
        //console.log(properties.properties)
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


function upgrade(upgradeButton) {
    var propertyID = parseInt($($(upgradeButton).parents()[6]).attr('id'))
    var property = gameData.propertiesOwned.find(prop => prop.id === propertyID)
    var upgradeIndex = $(upgradeButton).data("upgrade-index")
    var upgrade = property.upgrades[upgradeIndex]

    if (gameData.money >= upgrade.Cost) {
        if (upgrade.complete < upgrade.max) {
            gameData.money -= upgrade.Cost
            upgrade.complete++
            if (upgrade.complete > upgrade.max) {
                upgrade.complete = upgrade.max;
            }
            updatePage()
        }
    }
}

function rent(rentButton) {
    var propertyID = parseInt($($(rentButton).parents()[1]).attr('id'))

    var property = gameData.propertiesOwned.find(prop => prop.id === propertyID)

    if (property.renters < property.capacity) {
        property.renters++
        updatePage()
    }
}

var mainGameLoop = window.setInterval(function () {
    diff = Date.now() - gameData.lastTick;
    gameData.lastTick = Date.now()
    gameData.previousMoney = Math.floor(gameData.money)

    income = (gameData.income * (diff / 1000))
    salary = (((gameData.salary - 1) / 2) * (diff / 1000))
    tickIncome = salary + income
    gameData.money += tickIncome
    setLandRate()
    updatePage()
}, 1000);



function updatePage() {
    startup()
    //update Money
    document.getElementById("experience").innerHTML = "experience: " + gameData.jobDays
    if (gameData.previousMoney != Math.floor(gameData.money)) {
        $('#money').html("$" + Math.floor(gameData.money))
        gameData.previousMoney = gameData.money
    }
    $('#income').html("$" + (Math.round(gameData.income * 10) / 10))

    //update property values
    valueProperty();


    //properties to buy
    var template = $('#buy-properties-template').html();
    var templateScript = Handlebars.compile(template);
    var html = templateScript(properties);
    $("#properties-forSale").html(html);

    //update owned properties

    //$("#properties-owned").show()
    html = templateScript({ properties: gameData.propertiesOwned });
    $("#properties-owned").html(html)

    startup()
}








$(document).ready(function () {
    updatePage()
});