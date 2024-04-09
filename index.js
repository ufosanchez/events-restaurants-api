//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const ticketmaster = require("./modules/ticketmaster/api");
const yelp = require("./modules/yelp/api");

//set up Express app
const app = express();
const port = process.env.PORT || 8888;

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES
app.get("/", async (request, response) => {
  let eventList;
  if(request.query.citySearch === undefined || request.query.citySearch === ""){
    eventList = await ticketmaster.getEvents();
  } else{
    eventList = await ticketmaster.getEvents(request.query.citySearch);
  }
  if(eventList.page.totalElements === 0){
    response.render("error", { title: "Not valid city", cityNotFound:request.query.citySearch });
  } else{
    console.log("*** Events - TicketMaster ***");
    //console.log(eventList._embedded.events);

    let restaurantList;
    if(request.query.citySearch === undefined || request.query.citySearch === ""){
      restaurantList = await yelp.getRestaurants();
    } else{
      restaurantList = await yelp.getRestaurants(request.query.citySearch);
    }
    console.log("*** Restaurants - Yelp ***");
    //console.log(restaurantList);

    response.render("index", { title: "API Project", events: eventList._embedded.events, restaurants:restaurantList.businesses});
  }
  
});

app.get("/event/:eventDetails", async (request, response) => {
  console.log(request.params.eventDetails);
  let event = await ticketmaster.getEventsDetails(request.params.eventDetails);

  console.log("*** Events Details - TicketMaster ***");
  console.log(event);

  let restaurantsNear = await yelp.getRestaurantsNear(event._embedded.venues[0].location.latitude, event._embedded.venues[0].location.longitude);

  console.log("*** Restaurants Near - Yelp ***");
  console.log(restaurantsNear);

  response.render("event-details", { title: "Event Details", eventDetails: event, restaurantsAround: restaurantsNear.businesses });
});

app.get("/restaurant/:restaurantDetails", async (request, response) => {
  console.log("ID:", request.params.restaurantDetails);
  let restaurantDetails = await yelp.getRestaurantDetails(request.params.restaurantDetails);
  
  console.log("*** Restaurants Details - Yelp ***");
  console.log(restaurantDetails);

  let restaurantReviews = await yelp.getRestaurantReviews(request.params.restaurantDetails);

  console.log("*** Restaurants Reviews - Yelp ***");
  console.log(restaurantReviews);

  response.render("restaurant-details", { title: "Restaurant Details", restaurantDetails: restaurantDetails, restaurantReviews: restaurantReviews.reviews });
});


//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});


