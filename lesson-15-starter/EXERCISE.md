## Student Exercise: Create Your Own Front-End API Project

Now that you've explored how JSON Server works and tested basic REST operations, it's time to apply what you've learned by creating your own API server.

### Objective
Create a small REST API using JSON Server that provides data for a JavaScript-themed project of your choice. Some examples include:
- A **JavaScript frameworks** database (React, Vue, Angular, Svelte)
- A **developer tools** directory (code editors, browsers, build tools)
- A **front-end learning tracker** (topics, progress, resources)

### Requirements

1. **Create a new project folder**
  
1. **Install JSON Server**
  
2. **Create a custom `db.json` file**  
   - Create a data collection (e.g., "frameworks").
   - Each collection should have at least **four entries** with consistent keys such as `id`, `name`, `type`, and `popularity`.

3. **Add a start script** to your `package.json` file to run the api server
   
4. **Start the server**
   
5. **Create a `requests.http` file** and include at least:
   - A `GET` request for all frameworks
   - A `POST` request to add a new tool
   - A `PATCH` or `PUT` request to update an item
   - A `DELETE` request to remove an item

6. **Test your API**  
   Use the **REST Client** extension or browser to send and verify each request.  
   Inspect your changes live in the `db.json` file to confirm updates.