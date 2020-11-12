# WHAT AND WHY
I wanted to digitalize my daughter school by having some informations more accurate and faster. On the website you can find, as a parent, all the informations about your child (meals subscriptions, actual results by categories with charts, trimestrial notes and overtaking/catching up depending of the child average result by categories).


# WEBSITE
• There is 3 sides of the website (student, professor, admin/*TODO*/), each of them have a different access and a different status level.
• Each sides have a different layers (student see his results, professor can see/create/update/delete results, admin can create students, professors, ...).

# IMPLEMENTATION
• Creation of an SQL database with SSMS (using views, stored procedure and pre/post hash functions, MTM, OTM, TRIGGERS, ...)
• Connection to the database with ADO.NET and LINQ if needed (i favored to do specified SQL queries instead of too much LINQ usaged).
• implementation of a private backend REST API (ASP.NET CORE) tested with Postman. (separate logics from the controller to implement it inside API services/*TODO*/)
• Implementation of authentication API's (Jwt Token)
• Integration of the front-end with Angular 9 using Materials component library.


## FRONT-END ARCHITECTURE (MVVM):
APP ROUTING
  - MODULES with specified routing
    * COMPONENTS
      - TypeScript
      - HTML
      - CSS
    * MODELS
      - TypeScript
    * SERVICES (connection to my private API)
      - TypeScript
     
## BACK-END ARCHITECTURE:
  - REST API (with API Models) -> Repositories (with POCO Models) -> DB


Second front-end architecture (admin side) will be with ASP.NET (MVC):


/*TODO*/ = still not implemented
