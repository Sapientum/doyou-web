import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');

        const response = await fetch('https://doyou-e5p3.onrender.com/api/support', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { 'Authorization': authHeader } : {}),
            },
            cache: 'no-store'
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || data.message || 'Failed to fetch support messages' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Fetch support messages error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
