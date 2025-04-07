/*
    Get JWT token from localStorage and add it to the request headers for authentication purposes
    If unauthorized or forbidden, return user to login page
    Return fetch request so functions that require authentication can handle the rest
*/
export const fetchWithAuth = async (URL, options = {}) => {
    const token = localStorage.getItem('token');

    const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(URL, {
        ...options,
        headers,
    });

    if (response.status === 401 || response.status === 403) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/';
        throw new Error('Session expired. Please login again.');
    }

    return response;
};