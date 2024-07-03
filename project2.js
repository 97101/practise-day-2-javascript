const loadmeal = () => {
    const searchInput = document.getElementById('search-input').value;
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`;

    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
       if (data.meals) {
           displayProduct(data.meals); 
       } else {
           console.log('Meal not found');
           
       }
    })
    .catch((error) => {
        console.error('Error fetching data:', error);
    });
}

const displayProduct = (meals) => {
    const productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ''; 

    meals.forEach(meal => {
        const div = document.createElement("div");
        div.classList.add("card");
        div.innerHTML = `
            <img class="card-img" src="${meal.strMealThumb}" /> <!-- Meal thumbnail -->
            <h5>${meal.strMeal}</h5> <!-- Meal name -->
            <p>${meal.strInstructions.slice(0, 100)}...</p> <!-- Instructions or description -->
            <button class="details-btn" data-meal-id="${meal.idMeal}">Details</button>
        `;
        productContainer.appendChild(div);
    });

    
    productContainer.addEventListener('click', (event) => {
        if (event.target.classList.contains('details-btn')) {
            const mealId = event.target.getAttribute('data-meal-id');
            fetchMealDetailsAndDisplay(mealId);
        }
    });
}

const fetchMealDetailsAndDisplay = (mealId) => {
    const apiUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;

    fetch(apiUrl)
    .then((res) => res.json())
    .then((data) => {
        if (data.meals) {
            displayMealDetails(data.meals[0]); 
        } else {
            console.log('Meal details not found');
            
        }
    })
    .catch((error) => {
        console.error('Error fetching meal details:', error);
    });
}

const displayMealDetails = (meal) => {
    const mealDetailsContainer = document.getElementById("meal-details-container");
    mealDetailsContainer.innerHTML = ''; 

    const div = document.createElement("div");
    div.classList.add("meal-details");
    div.innerHTML = `
        <h2>${meal.strMeal}</h2>
        <img src="${meal.strMealThumb}" class="meal-img" />
        <p>${meal.strInstructions}</p>
        <button id="close-details-btn">Close</button>
    `;
    mealDetailsContainer.appendChild(div);

   
    const closeButton = div.querySelector('#close-details-btn');
    closeButton.addEventListener('click', () => {
        mealDetailsContainer.innerHTML = ''; 
    });

    
    mealDetailsContainer.scrollIntoView({ behavior: 'smooth' });
}


const searchButton = document.getElementById('search-btn');
searchButton.addEventListener('click', loadmeal);
