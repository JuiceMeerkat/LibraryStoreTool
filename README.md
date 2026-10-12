# LibraryStoreTool
This is an application for digitally storing your library, by typing in the ISBNs of the books in the library, so that you can more easily, sort, check and get to know the books in your home libraries. Supports accounts, multiple libraries and other features for each library etc..

Initially, this was a project I developed for the project part of the Arkwright Engineering Scholarship. For me, it solves the problem of me needing to be able to store the ISBNs of the books in my separate 'home libraries', so that I can search and sort them online, because it is much easier to, say, see if I have the third Harry Potter book using a computer than searching by hand.

The backend is an API made with node.js, and a PostgreSQL database. All of the files are JavaScript in fact, apart from the html and CSS files use for the frontend,  and a few others (for instance .env).

Each library can be created, had books added to it or removed from it, have it's name be edited, and be deleted. There is an account system, with hashing in the backend to ensure even the owner of the database cannot view the passwords of users. 
