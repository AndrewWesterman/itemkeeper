# ItemKeeper

This is a basic item maintenance app allowing the user to create and manage items and their various costs. 

The frontend is built with Typescript, using react as the frontend framework, redux for state management, and jest with react testing libarary for unit testing.

The server is built with ASP.NET Core 3.1 using Entity Framework for the data access layer, and NUnit for unit testing.

The data store is a postgres database (a heroku postgres add-on in particular for this project), but this can be easily configured to any datastore you desire given the use of EF.

## Setup
### Prerequisites
1. Recent version of `nodejs` (and `npm`)
2. `postgres` install premade with a db named 'itemkeeper' (only if you choose to use the out of the box config)
3. `.NET Core 3+` runtime
### Running the app
1. Clone this repository
2. Navigate to the clone dir
3. Modify the `DefaultConnection` property in `appsettings.Development.json` with your desired connection info:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Port=5432;Database=itemkeeper;Username=postgres;Password=password;"
  }
}
```
You just need to change the passowrd if you are using postgres' default settings. If you are using a different database then you will need to change all the values should they differ. To configure for production add and apply the same principles to `appsettings.Production.json`

4. run `$ dotnet run` in a terminal or open `ItemKeeper.sln` in VisualStudio and do a debug run with IIS Express
5. Once the app is running refer to the output url to run the UI in the browser, optionally hit `<hostname>/api/` from the REST client of your choice to interact with the API directly.

## API
Note any uri element item denoted with `:` eg: `/url/:id` is a url parameter
The json `item` schema is as follows:
```json
{
    "id": 1,
    "name": "item name",
    "cost": 10
}
```
All endpoints returning or receiving items will use or expect the above schema.
All endpoints consuming data must have it provided in the body with a `'content=type': 'application/json'` header

### Get all items
``` GET /api/items ```

Retreives a list of all items in the data store

### Get item by id
> GET /api/items/:id

Retreives the item with the given id, if it exists

### Add an item
> POST /api/items

Creates an item with the one provided in the request body. 
`id` is not required, as the database will create it.
Returns the created item.

### Update an item
> PUT /api/items/:id

Updates the item with `id` with the data provided in the request body, should the item with `id` exist. Returns the updated item

### Delete an item
> DELETE /api/items/:id

Deletes the item with `id`, should the item with `id` exist. Returns the updated list of items.

### Get max item costs
> GET /api/items/maxPrices

Returns a list of items representing the max cost for each item `name` in the store.

### Get max item cost by item name
> GET /api/items/:name/maxPrice

Returns the item entry of items with `name` that has the highest cost.

## Testing
### Server
Open a terminal to the clone directory and run `$ dotnet test`

### Client
Open a terminal to `<clonedir>/ClientApp/` and run `$ npm test`
