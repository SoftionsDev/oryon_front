const ERROR_MESSAGE = "An error has occurred";


// Generic API handler function
const apiHandler = async (url, method, body = null, contentType = 'application/json') => {
    const headers = {
        'Content-Type': contentType
    };
    const config = {
        method: method,
        headers: headers
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(url, config);

    if (method === 'DELETE' && response.status === 204) {
        return response.status
    }

    const data = await response.json();
    if (response.status < 200 || response.status >= 300) {
        throw new Error(data.body || ERROR_MESSAGE);
    }
    return data;
};

// Use when you need to create an entity
export const createFunction = async (baseUrl, service, data, contentType = 'application/json') => {
    return await apiHandler(`${baseUrl}/${service}/`, 'POST', data, contentType);
};


// Use when you need to update an entity
export const updateFunction = async (baseUrl, service, storeId, data, contentType = 'application/json') => {
    return await apiHandler(`${baseUrl}/${service}/${storeId}/`, 'PUT', data, contentType);
};


// Use when you need to delete an entity
export const deleteFunction = async (baseUrl, service, elementId, contentType = 'application/json') => {
    return await apiHandler(`${baseUrl}/${service}/${elementId}/`, 'DELETE', null, contentType);
};


// Use when you need to get an entity
export const getFunction = async (baseUrl, service, elementId = '', contentType = 'application/json') => {
    const url = elementId ? `${baseUrl}/${service}/${elementId}` : `${baseUrl}/${service}`;
    console.log(url)
    return await apiHandler(url, 'GET', null, contentType);
};

