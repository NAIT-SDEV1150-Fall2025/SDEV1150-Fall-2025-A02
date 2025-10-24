## Lesson 16 Student Exercise: Update Existing Books

Now that you've worked with the `fetch` API for fetching and adding books, it's time to apply what you've learned by extending the functionality of the app.

### Objective
Update the example so that you can load the details for an existing book and update it.

### Requirements

1. Add a read-only field to the existing form for book ids (new books won't have an id). 
   
2. Add a link or button to the rendered list of books that, when clicked, will send a request for the individual book and load its data into the form.
3. If an existing book has been selected and loaded into the form, submitting the form should update (`PATCH`) the book using the API server.
4. **Test and troubleshoot your solution**