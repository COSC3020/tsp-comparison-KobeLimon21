
function tsp_hk(distance_matrix) {
    let n = distance_matrix.length; // variable for total cities 
    if (n <= 1) { // base case for one city or none
        return 0; // 0 as there is no distance to be computed 
    }

    let minTourLength = Infinity; // initialize tour length 

    for (let i = 0; i < n; i++) { // iterate through each city 
        let cache = {};  // reset cache 
        let cities = []; // array to store cities 
        for (let index = 0; index < n; index++) { // populates cities array with indices 
            cities.push(index); // adds indices on
        }
        let tmp = heldkarp(distance_matrix, i, cities, cache); // shortest path calculation 

        if (tmp < minTourLength) { // checks if current path is shorter than shortest found up to than 
            minTourLength = tmp; // swaps if so 
        }
    }

    return minTourLength;
}

function heldkarp(distMatrix, start, cities, cache) {
    let key = JSON.stringify([cities.slice().sort(), start]); // makes a string key for current state

    if (cache[key] !== undefined) { // checks if result for key has been computed 
        return cache[key]; // returns value 
    }

    if (cities.length == 2) { // base case for two cities 
        let remainingCity = cities.find(city => city !== start);  // finds other city that is not starting 
        cache[key] = distMatrix[start][remainingCity]; // gets distance start to remaining city 
        return cache[key]; // returns value 
    }

    let minDistance = Infinity; // intialize distance 

    for (let j = 0; j < cities.length; j++) { // loops through cities 
        if (cities[j] !== start) { // makes sure we skip start city 
            let newCities = []; // cities remaining to visit 
            for (let i = 0; i < cities.length; i++) { // loops through new cities 
                if (cities[i] !== start) { // makes sure start city isnt in 
                    newCities.push(cities[i]); // adds them on 
                }
            }

            let newDistance = distMatrix[start][cities[j]] + heldkarp(distMatrix, cities[j], newCities, cache); // calculates distance 

            if (newDistance < minDistance) { // checks if newest distance calculated is shorter
                minDistance = newDistance; // updates it if true 
            }
        }
    }

    cache[key] = minDistance; 
    return minDistance;
}

// local search 


function tsp_ls(distance_matrix) {
    const len = distance_matrix.length;

    if (len === 0) { // no cities, no distance 
        return 0; 
    }
    if (len === 1) { // only one city, no distance
        return 0;
    }

    let currentRoute = Array.from({ length: len }, (_, i) => i); // creates an array with indices 
    for (let i = currentRoute.length - 1; i > 0; i--) { // iterates through elements 
        const j = Math.floor(Math.random() * (i + 1)); // generates a random number 
        let temp = currentRoute[i]; // stores value at index 
        currentRoute[i] = currentRoute[j]; // changes value  
        currentRoute[j] = temp; // swap 
    }

    function calculateRouteLength(route) { // function to calculate route 
        let totalDistance = 0; // initialize distance to 0 
        for (let i = 0; i < route.length - 1; i++) { // iterates through pairs of cities 
            totalDistance += distance_matrix[route[i]][route[i + 1]]; // adds distance 
        }
        return totalDistance;
    }

    function twoOptSwap(route, i, k) { // 2 opt function 
        while (i < k) { // ensure reversing 
            let temp = route[i]; // temporary variable to hold 
            route[i] = route[k]; // value from i -> k
            route[k] = temp;
            i++;
            k--;
        }
    }

    function copyRoute(route) { // function to ensure best route is not altered
        let newRoute = []; // array intialized 
        for (let i = 0; i < route.length; i++) { // iterates through elements 
            newRoute.push(route[i]); // adds on to array 
        }
        return newRoute;
    }

    const maxIterations = len * len; // max iterations n^2 to stop 
    let min = calculateRouteLength(currentRoute); // calculates route 
    let bestRoute = copyRoute(currentRoute); // makes sure best route is not altered

    for (let iteration = 0; iteration < maxIterations; iteration++) { // iteration loop 
        let i = Math.floor(Math.random() * (len - 1)); // randomly selects index i for start
        let k = Math.floor(Math.random() * (len - i - 1)) + i + 1; // randomly selects index k for end 
 
        const currentLength = calculateRouteLength(currentRoute); // calculates distance for current route
        twoOptSwap(currentRoute, i, k); // reverses segment 
        const newLength = calculateRouteLength(currentRoute); // used to compare the two routes

        if (newLength >= currentLength) { // if its worse, undoes the swap, makes sure worse route isn't here
            twoOptSwap(currentRoute, i, k); // revert back to better
        }

        if (newLength < min) { // if its better, it'll swap for the better one 
            min = newLength; // for new distance 
            bestRoute = copyRoute(currentRoute); // updates route 
        }
    }

    return min;
}
