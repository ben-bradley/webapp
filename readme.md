# webapp template


## Components

- Gulp
- Babel
- Hapi
- Browserify
- React
- React Router
- (need some sort of re/flux/dux implementation)
- Material-UI


## Goal

For the moment, my goal is to create a template for webabb development.  Before wiring up a Yeoman template, I want to iterate through a few times with this code to try and get a good, solid base to work from.


## Concepts


### "Back-end"

I'm going to think of "back-end" as referring to server-side code.  Once the code is sent to the browser it becomes "front-end".

#### Routes

Routes should be thought of as response orchestrators.  A route calls on as many `handlers` as are necessary to construct a response

#### Handlers

Handlers are called upon by routes to process and build responses.  A handler that needs data will call on a controller to CRUD the data.  Handlers perform the business logic of the application. __ALL DATA MUTATION HAPPENS HERE!!!__

#### Controllers

Controllers simply do CRUD.  By abstracting this function we are able to swap out databases and data structures with ease.  A controller must NOT mutate the data in any way.


### "Front-end"

This refers to any code executed in the browser.

Admittedly, my experience with front-end related code is limited so this will grow as we go.
