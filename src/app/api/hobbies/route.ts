import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');

        const response = await fetch('https://doyou-e5p3.onrender.com/api/hobbies', {
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
                { error: data.error || data.message || 'Failed to fetch hobbies' },
                { status: response.status }
            );
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Fetch hobbies error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const authHeader = request.headers.get('Authorization');
        const body = await request.json();

        const response = await fetch('https://doyou-e5p3.onrender.com/api/hobbies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(authHeader ? { 'Authorization': authHeader } : {}),
            },
            body: JSON.stringify(body)
        });

        const data = await response.json().catch(() => ({}));

        if (!response.ok) {
            return NextResponse.json(
                { error: data.error || data.message || 'Failed to create hobby' },
                { status: response.status }
            );
        }

        return NextResponse.json(data, { status: 201 });
    } catch (error) {
        console.error('Create hobby error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
