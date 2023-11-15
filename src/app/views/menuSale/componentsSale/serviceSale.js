// Function to create a new user
const API_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3001'
const MENU_SALE = 'sales'
const ERROR_MESSAGE = "An error has occurred"


//Create user

export const createApiSale = async (userData) => {
    const response = await fetch(`${API_URL}/${MENU_SALE}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.status !== 201) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};

// Function to update an existing user

export const updateApiSale = async (userId, userData) => {
    const response = await fetch(`${API_URL}/${MENU_SALE}/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};

// Function to delete an existing user
export const deleteApiSale = async (userId) => {
    const response = await fetch(`${API_URL}/${MENU_SALE}/${userId}`, {
        method: 'DELETE'
    });
    
    const data = await response.json();
    if (response.status >= 400 && response.status <= 500) {
        throw new Error(data || ERROR_MESSAGE);
    }
    return data;
};

// Function to retrieve a single user
export const getApiSale = async (userId) => {
    const response = await fetch(`${API_URL}/${MENU_SALE}/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};


// Function to retrieve all user
export const getAllApiSale = async () => {
    const URL = `${API_URL}/${MENU_SALE}`
    const response = await fetch(`${URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    if (response.status !== 200) {
        throw new Error(data || ERROR_MESSAGE);
    }
    return data;
};


