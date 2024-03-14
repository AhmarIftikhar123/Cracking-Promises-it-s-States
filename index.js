// Define variables using destructuring and set initial values
let [checkingResturanInterval] = [null];
let [
  isOrderAccepted,
  isResturnAcceptOrder,
  isValetAssigned,
  isOrderDelivered,
] = [false, false, false, false];

// Function to update the heading based on order status
const updateHeading = () => {
  const heading = document.getElementById("currentStatus");
  if (isOrderAccepted && !isOrderDelivered) {
    heading.innerText = isOrderAccepted
      ? "Order Accepted! Now Preparing Your Food"
      : "Waiting for restaurant acceptance";
  } else if (isOrderAccepted && isOrderDelivered) {
    heading.innerText = "Food Delivered Enjoy!";
  }
};

// Function to check if the restaurant accepts the order
const checkingIsResturanAcceptOrder = () => {
  return new Promise((resolve, reject) => {
    checkingResturanInterval = setInterval(() => {
      console.log("Checking is order accepted...");
      if (isOrderAccepted) {
        resolve(
          "Restaurant accepted your order.Now Waiting for Assing Delivery Patner"
        );
        clearInterval(checkingResturanInterval);
      }
    }, 1000);
  });
};

// Function to confirm if the restaurant should accept the order
const isResturantAccepted = () => {
  return new Promise((resolve, reject) => {
    isResturnAcceptOrder = confirm("Should Restaurant Accept Order?");
    if (isResturnAcceptOrder) {
      isOrderAccepted = true;
      resolve("Order Accepted");
    } else {
      reject("Order Rejected");
    }
  });
};

// Function to find the nearest valet
const findNearestValet = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const nearestValet = Math.random() * 5;
      resolve(`Nearest Delivery Patner: ${nearestValet.toFixed(2)}km`);
    }, 100);
  });
};

// Function to enable map
const enableMap = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      document.getElementById("mapview").style.opacity = "1";
      resolve("Map enabled");
    }, 500);
  });
};

// Function to update delivery partner information
const updateDeliveryPatnerInfo = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const foundDriver = document.getElementById("found-driver");
      const findingDriver = document.getElementById("finding-driver");
      const call = document.getElementById("call");
      findingDriver.classList.add("none");
      foundDriver.classList.remove("none");
      call.classList.remove("none");
      resolve("Delivery partner information updated");
    }, 1000);
  });
};

// Function to update delivery information
const updateDeliveryInfo = () => {
  const deliveryPromises = [enableMap(), updateDeliveryPatnerInfo()];

  Promise.allSettled(deliveryPromises)
    .then((responses) => {
      console.log(responses);
    })
    .catch((error) => {
      console.error(error);
    });
};

// Function to assign valet
const letAssignValet = () => {
  let valetArr = [];
  // Loop to assign valets
  for (let i = 0; i < 5; i++) {
    valetArr.push(findNearestValet());
  }
  Promise.any(valetArr)
    .then((response) => {
      console.log(response);
      isValetAssigned = true;
      updateDeliveryInfo();
    })
    .catch((err) => console.log(err));
};

// Function to check if the order is delivered
const checkingIsOrderDelivered = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      isOrderDelivered = true; // Simulating order delivery
      resolve("Food Delivered! Enjoy!");
    }, 1000);
  });
};

// Attaching event listeners when the window is loaded
window.addEventListener("load", () => {
  // Calling the function to check if the restaurant accepts the order
  checkingIsResturanAcceptOrder()
    .then((message) => {
      console.log(message);
    })
    .catch((error) => {
      console.error(error);
    });

  // Storing the acceptOrder button in a variable
  const acceptOrderBtn = document.getElementById("acceptOrder");

  // Adding a click event to the acceptOrder button
  acceptOrderBtn.addEventListener("click", () => {
    isResturantAccepted()
      .then((message) => {
        console.log(message);
        updateHeading();
      })
      .catch((error) => {
        console.error(error);
      });
  });

  // Storing the findValet button in a variable
  const findValetBtn = document.getElementById("findValet");

  // Adding a click event to the findValet button
  findValetBtn.addEventListener("click", () => {
    if (!isValetAssigned) {
      // Calling the function to assign valets
      letAssignValet();
    } else {
      console.log("Delivery Patner already assigned.");
    }
  });

  // Storing the deliverOrder button in a variable
  const deliverOrderBtn = document.getElementById("deliverOrder");

  // Adding a click event to the deliverOrder button
  deliverOrderBtn.addEventListener("click", () => {
    if (!isOrderAccepted) return;
    checkingIsOrderDelivered()
      .then((message) => {
        console.log(message);
        if (updateHeading() !== null) {
          setTimeout(() => {
            alert(
              "How was Your Food is? Please! rate Food and Delivery Patner"
            );
          }, 5000);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  });
});
