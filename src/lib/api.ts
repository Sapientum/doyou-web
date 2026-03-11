export async function fetchWithAuth(input: RequestInfo | URL, init?: RequestInit): Promise<Response> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('adminAccessToken') : null;

    const headers = new Headers(init?.headers);
    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const modifiedInit: RequestInit = {
        ...init,
        headers,
    };

    const response = await fetch(input, modifiedInit);

    if (response.status === 401 || response.status === 403) {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('adminAccessToken');
            localStorage.removeItem('adminRefreshToken');
            localStorage.removeItem('adminUser');
            window.location.href = '/login';
        }
    }

    return response;
}
