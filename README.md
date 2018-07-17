# Pothole Patchers

## About the App

The Pothole Patcher app is a ticket management and dispatch system that can be used by any company that does some service / utility work to customers.
The theme of this app is something that affects everyone, Potholes..
Users can easily report potholes to be scheduled and dispatched on and get it fixed. Even better, the can get rewarded for every successful ticket they create.

## Technologies

This app uses many technologies and APIs:

```
ExpressJS for creating back-end server.
MongoDB database for data storage and users and employees login.
PassportJS for Registration and login authentication.
bcrypt for password encryption and hashing.
other dependencies to make file storage to mongodb possible.
ReactJS for front-end user interface.
MaterializeCSS for layouts and components.
```
APIs used:
```
Google Maps API to show map box in the ticket.
Open Weather API to show forecast weather.
Browser Geolocation API to determine user's location.
```

## App Story
First off, the app uses same login and register components to authenticate users and employees. but they link differently depending on their parant components.
![](githubImages/login.png) ![](githubImages/register.png)

