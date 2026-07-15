// auth.js

// Hardcoded RBAC Configuration (Replace with Firebase Auth later if needed)
const USERS = {
    'admin':  { pass: 'admin@123',  role: 'Super Admin', branch: 'ALL' },
    'strab1': { pass: 'strab1@123', role: 'Branch Staff', branch: 'Mahe' },
    'strab2': { pass: 'strab2@123', role: 'Branch Staff', branch: 'Chokli' },
    'strab3': { pass: 'strab3@123', role: 'Branch Staff', branch: 'Panoor' },
    'strab4': { pass: 'strab4@123', role: 'Branch Staff', branch: 'Kuthuparamba' },
    'strab5': { pass: 'strab5@123', role: 'Branch Staff', branch: 'Nadapuram' },
    'strab6': { pass: 'strab6@123', role: 'Branch Staff', branch: 'Home Care' }
};

// Handle login attempt
function attemptLogin(username, password) {
    if (USERS[username] && USERS[username].pass === password) {
        const userPayload = { username: username, ...USERS[username] };
        sessionStorage.setItem('stra_user', JSON.stringify(userPayload));
        return true;
    }
    return false;
}

// Handle logout
function logout() {
    sessionStorage.removeItem('stra_user');
    window.location.href = 'login.html'; // Redirect back to login page
}

// Get the currently logged-in user
function getCurrentUser() {
    return JSON.parse(sessionStorage.getItem('stra_user')) || null;
}

// Protect a page: Kick user to login.html if they aren't authenticated
function requireAuth() {
    const user = getCurrentUser();
    if (!user) {
        window.location.href = 'login.html';
    }
    return user;
}
