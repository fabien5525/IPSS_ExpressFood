const GET = async (req: Request, { params }: { params: { id: string } }) => {
    const id = params.id;
    const auth = req.headers.get("Authorization") ?? "";

    const api_url = process.env.NEXT_PUBLIC_API_URL; 
    const response = await fetch(`${api_url}/user/${id}/`, {
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
        const json_data = JSON.stringify({
            data: data,
        });
        return new Response(json_data, {
            status: 200,
        })
    } else {
        return new Response(null, {
            status: 400,
        })
    }
};

export { GET };