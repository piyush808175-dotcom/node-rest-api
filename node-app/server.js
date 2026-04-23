const express = require('express');
const app = express();
const port = 3000;

// Middleware to automatically parse JSON data
app.use(express.json());

// In-memory array for our database
let users = [
    { id: 1, name: "Alice" },
        { id: 2, name: "Bob" }
        ];

        // Root Route
        app.get('/', (req, res) => {
            res.send('Server is running! Add /users to the URL to test the API.');
            });

            // GET: Fetch all users
            app.get('/users', (req, res) => res.json(users));

            // POST: Create a new user
            app.post('/users', (req, res) => {
                const newUser = { id: users.length + 1, name: req.body.name };
                    users.push(newUser);
                        res.status(201).json({ message: 'User created successfully', user: newUser });
                        });

                        // PUT: Update an existing user
                        app.put('/users/:id', (req, res) => {
                            const userId = parseInt(req.params.id);
                                let user = users.find(u => u.id === userId);
                                    
                                        if (user) {
                                                user.name = req.body.name || user.name;
                                                        res.json({ message: `User ${userId} updated`, user });
                                                            } else {
                                                                    res.status(404).json({ message: 'User not found' });
                                                                        }
                                                                        });

                                                                        // DELETE: Delete a user
                                                                        app.delete('/users/:id', (req, res) => {
                                                                            const userId = parseInt(req.params.id);
                                                                                users = users.filter(u => u.id !== userId);
                                                                                    res.json({ message: `User ${userId} deleted successfully` });
                                                                                    });

                                                                                    // Start the server
                                                                                    app.listen(port, () => console.log(`Server is running on port ${port}`));
                                                                                    