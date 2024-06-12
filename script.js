// Define schemas for restaurants and reviews using Mongoose.js.

// Implement CRUD operations for restaurants:
   
//    GET /restaurants
//    - Retrieve a list of restaurants from the database.
   
//    GET /restaurants/:id
//    - Retrieve details about a specific restaurant by its ID.
   
//    POST /restaurants
//    - Create a new restaurant entry in the database.
   
//    PUT /restaurants/:id
//    - Update an existing restaurant's information.
   
//    DELETE /restaurants/:id
//    - Delete a restaurant entry from the database.

// Implement CRUD operations for reviews:

//    GET /restaurants/:id/reviews
//    - Retrieve all reviews for a specific restaurant.
   
//    POST /restaurants/:id/reviews
//    - Add a new review for a restaurant.
   
//    PUT /restaurants/:id/reviews/:reviewId
//    - Update an existing review for a restaurant.
   
//    DELETE /restaurants/:id/reviews/:reviewId
//    - Delete a review for a restaurant.

// Implement user authentication routes:

//    POST /register
//    - Register a new user account.
   
//    POST /login
//    - Log in an existing user.
   
//    GET /logout
//    - Log out the currently authenticated user.

// Implement search functionality

// Set up error handling to handle any errors

// Connect to MongoDB database and start the Express.js server to listen for incoming requests.

// ---------------------------------------------------------------

// Relationships entitties
// Each Review belongs to a single User and a single Restaurant.
// Each Restaurant can have multiple Reviews.
// Each User can leave multiple Reviews.

// Test to check if axios is connected and running (status 200 Network in Dev tools) 
axios.get('http://localhost:3001')
    .then(response => {
        console.log('Axios is working:', response.data);
    })
    .catch(error => {
        console.error('Axios test error:', error.message);
    });

// Function to display restaurant names
const displayRestaurantNames = (restaurants) => {
    const restaurantsContainer = document.querySelector('.restaurants');
    restaurantsContainer.innerHTML = ''; // Clear previous restaurants
    restaurants.forEach(restaurant => {
        const restaurantElement = document.createElement('div');
        restaurantElement.className = 'restaurant';
        restaurantElement.innerHTML = `
            <h2 class="restaurant-name" data-id="${restaurant._id}">${restaurant.name}</h2>
        `;
        restaurantsContainer.appendChild(restaurantElement);
    });

    // Click event listener for restaurant names
    document.querySelectorAll('.restaurant-name').forEach(element => {
        element.addEventListener('click', handleRestaurantClick);
    });
};

// Function to display details of a restaurant
const displayRestaurantDetails = (restaurant) => {
    const restaurantsContainer = document.querySelector('.restaurants');
    restaurantsContainer.innerHTML = ''; // Clear previous content
    const restaurantElement = document.createElement('div');
    restaurantElement.className = 'restaurant-details';
    restaurantElement.innerHTML = `
        <h2>${restaurant.name}</h2>
        <p class="cuisineType">Cuisine Type: ${restaurant.cuisineType}</p>
        <p class="location">Location: ${restaurant.location}</p>
        <p class="address">Address: ${restaurant.address}</p>
        <p class="contactInfo">Contact Info: ${restaurant.contactInfo}</p>
        <p class="openingHours">Opening Hours: ${restaurant.openingHours}</p>
        <p class="description">Description: ${restaurant.description}</p>
    `;
    restaurantsContainer.appendChild(restaurantElement);
};

// Get and display restaurant details
const getRestaurantDetails = async (id) => {
    try {
        const response = await axios.get(`http://localhost:3001/restaurants/${id}`);
        displayRestaurantDetails(response.data);
    } catch (error) {
        console.error('Error geting restaurant details:', error.message);
    }
};

// Get and display restaurant names
const getRestaurantNames = async () => {
    try {
        const response = await axios.get('http://localhost:3001/restaurants');
        displayRestaurantNames(response.data);
    } catch (error) {
        console.error('Error geting restaurant names:', error.message);
    }
};

getRestaurantNames();

// Event listener for search functionality
document.getElementById('search').addEventListener('click', async () => {
    try {
        const searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();
        const response = await axios.get('http://localhost:3001/restaurants');
        const filteredRestaurants = response.data.filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm));
        displayRestaurantNames(filteredRestaurants);
    } catch (error) {
        console.error('Error searching restaurants:', error.message);
    }
});

// Sort functionality
document.getElementById('sortButtonUp').addEventListener('click', async () => {
    try {
        const response = await axios.get('http://localhost:3001/restaurants');
        const sorted = response.data.sort((a, b) => a.name.localeCompare(b.name));
        displayRestaurantNames(sorted);
    } catch (error) {
        console.error('Error sorting restaurants:', error.message);
    }
});

document.getElementById('sortButtonDown').addEventListener('click', async () => {
    try {
        const response = await axios.get('http://localhost:3001/restaurants');
        const sorted = response.data.sort((a, b) => b.name.localeCompare(a.name));
        displayRestaurantNames(sorted);
    } catch (error) {
        console.error('Error sorting restaurants:', error.message);
    }
});

// Handle Enter key press in search bar
document.getElementById('searchBar').addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
        try {
            const searchTerm = document.getElementById('searchBar').value.trim().toLowerCase();
            const response = await axios.get('http://localhost:3001/restaurants');
            const filteredRestaurants = response.data.filter(restaurant => restaurant.name.toLowerCase().includes(searchTerm));
            displayRestaurantNames(filteredRestaurants);
        } catch (error) {
            console.error('Error searching restaurants:', error.message);
        }
    }
});

// Click event handler for restaurant names
const handleRestaurantClick = async (event) => {
    const restaurantId = event.target.getAttribute('data-id');
    await getRestaurantDetails(restaurantId);
};
