
 
function MenuCreator(itemType) {
  this.itemType = itemType;
}

MenuCreator.prototype.getType = function () {
  return this.itemType;
};

MenuCreator.prototype.getName = function () {
  return this.itemType.name;
};
MenuCreator.prototype.calculatePrice = function () {
  return this.itemType.price;
};
MenuCreator.prototype.calculateCalories = function () {
  return this.itemType.calories;
};

function Hamburger(size, stuffing) {
  MenuCreator.call(this, size);
  this.stuffing = stuffing;
}
Hamburger.prototype = Object.create(MenuCreator.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.SIZE_SMALL = {
  name: "Small_Humburger",
  price: 50,
  calories: 20,
};
Hamburger.SIZE_BIG = {
  name: "Big_Humburger",
  price: 100,
  calories: 40,
};
Hamburger.STUFFING_CHEESE = {
  name: "cheese",
  price: 10,
  calories: 20,
};
Hamburger.STUFFING_SALAD = {
  name: "salad",
  price: 20,
  calories: 5,
};
Hamburger.STUFFING_POTATO = {
  name: "potato",
  price: 15,
  calories: 10,
};

Hamburger.prototype.getType = function () {
  return this.itemType;
};
Hamburger.prototype.getStuffing = function () {
  return this.stuffing;
};
Hamburger.prototype.getName = function () {
  if (this.getStuffing() !== undefined) {
    return (
      this.getType().name + " " + "plus stuffing: " + this.getStuffing().name
    );
  } else {
    return this.getType().name;
  }
};

Hamburger.prototype.calculatePrice = function () {
  return this.getType().price + this.getStuffing().price;
};
Hamburger.prototype.calculateCalories = function () {
  return this.getType().calories + this.getStuffing().calories;
};

function Salad(type, weight) {
  MenuCreator.call(this, type);
  this.weight = weight;
}
Salad.prototype = Object.create(MenuCreator.prototype);
Salad.prototype.constructor = Salad;

Salad.CAESAR = {
  name: "Caesar",
  price: 100,
  calories: 20,
};
Salad.OLIVIE = {
  name: "Olivie",
  price: 50,
  calories: 80,
};

Salad.prototype.getWeight = function () {
  return this.weight;
};

Salad.prototype.calculatePrice = function () {
  var thisType = this.getType();
  var pricePerGram = thisType.price / 100;
  return pricePerGram * this.getWeight();
};

Salad.prototype.calculateCalories = function () {
  var thisType = this.getType();
  var caloriesPerGram = thisType.calories / 100;
  return caloriesPerGram * this.getWeight();
};

function Drink(type) {
  MenuCreator.call(this, type);
}

Drink.prototype = Object.create(MenuCreator.prototype);
Drink.prototype.constructor = Drink;

Drink.COLA = {
  name: "Cola",
  price: 50,
  calories: 40,
};
Drink.COFFEE = {
  name: "Coffee",
  price: 80,
  calories: 20,
};

Drink.prototype.calculatePrice = function () {
  return this.getType().price;
};

Drink.prototype.calculateCalories = function () {
  return this.getType().calories;
};

function Order() {
  this.dishes = Array.prototype.slice.call(arguments, 0);
  this.isPaid = false;
}
Order.prototype.getPaid = function () {
  return this.isPaid;
};

Order.prototype.getDishes = function () {
  var order = [];
  this.dishes.forEach(function (item) {
    order.push(item.getName());
  });
  return order;
};

Order.prototype.addPositionToOrder = function (item) {
  if (!this.getPaid()) {
    if (item !== undefined) {
      this.dishes.push(item);
      console.log("Position is added.");
    } else {
      console.log("There is no item for adding!")
    }
  } else {
    console.log("Сhanges are not possible. The order has been paid.");
  }
};
Order.prototype.deletePositionFromOrder = function (item) {
  if (!this.getPaid()) {
    if (this.dishes.indexOf(item) !== -1) {
      this.dishes.splice(this.dishes.indexOf(item), 1);
      console.log(item.name + " removed from the order!");
    }
  } else {
    console.log("Сhanges are not possible. The order has been paid.");
  }
};

Order.prototype.calculateTotalPrice = function () {
  var thisOrder = this.getDishes();
  var totalPrice = 0;
  if ((thisOrder.length = 0)) {
    console.log("The order is empty.");
  } else {
    this.dishes.forEach(function (item) {
      totalPrice += item.calculatePrice();
    });
  }
  console.log("Total price: " + totalPrice + " " + "tugricks");
  return totalPrice;
};

Order.prototype.calculateTotalCalories = function () {
  var thisOrder = this.getDishes();
  var totalCalories = 0;
  if ((thisOrder.length = 0)) {
    console.log("The order is empty.");
  } else {
    this.dishes.forEach(function (item) {
      totalCalories += item.calculateCalories();
    });
    return totalCalories;
  }
};

Order.prototype.pay = function () {
  this.isPaid = true;
  Object.freeze(this.dishes);
};

var someHamburger = new Hamburger(
  Hamburger.SIZE_SMALL,
  Hamburger.STUFFING_SALAD
);
var someSalad = new Salad(Salad.CAESAR, 150);
var someDrink = new Drink(Drink.COFFEE);
var someOrder = new Order(someHamburger, someSalad, someDrink);
someHamburger.getType();
someHamburger.getStuffing();
someHamburger.calculatePrice();
someSalad.getWeight();
someSalad.calculatePrice();
someSalad.calculateCalories();
someDrink.calculateCalories();
someOrder.addPositionToOrder();
someOrder.getDishes();
someOrder.calculateTotalPrice();
someOrder.calculateTotalCalories();
someOrder.addPositionToOrder(someDrink);
someOrder.pay();
someOrder.deletePositionFromOrder(someHamburger);
