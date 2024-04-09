const ticketmaster = "https://app.ticketmaster.com/discovery/v2"; //base URL for any TicketMaster API requests

async function getEvents(city="toronto") {
  const reqUrl = `${ticketmaster}/events.json?city=${city}&size=10&apikey=${process.env.TICKETMASTER_API_KEY}`;
  let options = {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  };
  let response = await fetch(reqUrl, options);
  return await response.json();
}

async function getEventsDetails(eventId) {
  const reqUrl = `${ticketmaster}/events/${eventId}.json?apikey=${process.env.TICKETMASTER_API_KEY}`;
  let options = {
    method: "get",
    headers: {
      "Content-Type": "application/json"
    }
  };
  let response = await fetch(reqUrl, options);
  return await response.json();
}

module.exports = {
    getEvents,
    getEventsDetails
};