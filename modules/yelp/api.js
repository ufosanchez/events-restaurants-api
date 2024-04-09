const yelp = "https://api.yelp.com/v3"; //base URL for any Yelp API requests

async function getRestaurants(city="toronto") {
  const reqUrl = `${yelp}/businesses/search?location=${city}&sort_by=best_match&limit=10`;
  let options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.YELP_API_KEY}`
    }
  };
  let response = await fetch(reqUrl, options);
  return await response.json();
}

async function getRestaurantsNear(lat, lng) {
  const reqUrl = `${yelp}/businesses/search?latitude=${lat}&longitude=${lng}&radius=2000&sort_by=best_match&limit=10`;
  let options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.YELP_API_KEY}`
    }
  };
  let response = await fetch(reqUrl, options);
  return await response.json();
}

async function getRestaurantDetails(restaurantId) {
  const reqUrl = `${yelp}/businesses/${restaurantId}`;
  let options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.YELP_API_KEY}`
    }
  };
  let response = await fetch(reqUrl, options);
  return await response.json();
}

async function getRestaurantReviews(restaurantId) {
  const reqUrl = `${yelp}/businesses/${restaurantId}/reviews?limit=3&sort_by=yelp_sort`;
  let options = {
    method: "get",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.YELP_API_KEY}`
    }
  };
  let response = await fetch(reqUrl, options);
  return await response.json();
}

module.exports = {
    getRestaurants,
    getRestaurantsNear,
    getRestaurantDetails,
    getRestaurantReviews
};