const GET = async (req: Request, { params }: { params: { mail: string } }) => {
    const mail = params.mail;
    const auth = req.headers.get("Authorization") ?? "";

    const api_url = process.env.NEXT_PUBLIC_API_URL; 
    const response = await fetch(`${api_url}/utilisateur/${mail}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization" : auth,
        },
    });

    console.log(response)
    
    if (response.ok) {
        const data = await response.json();
        return new Response(data, {
            status: 200,
        })
    } else {
        return new Response(null, {
            status: 401,
        })
    }
};

export { GET };