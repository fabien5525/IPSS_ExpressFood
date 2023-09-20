import { NextResponse } from 'next/server'

const POST = async (req: Request) => {

    const { mail, password } = req.body as any;

    const api_url = process.env.NEXT_PUBLIC_API_URL;

    const response = await fetch(`${api_url}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({ mail, password }),
    });

    const data = await response.json();

    if (response.ok) {
        return new Response(data, {
            status: 200,
        })
    } else {
        return new Response(data, {
            status: 401,
        })
    }

};

export { POST };