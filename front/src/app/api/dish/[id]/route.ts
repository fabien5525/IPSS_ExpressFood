const PATCH = async (req: Request, { params }: { params: { id: string }}) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const id = params.id;

    const {
        nom,
        prix,
        ingredients,
        dujour,
        dessert,
    } = await req.json();

    const json_body = JSON.stringify({
        nom,
        prix,
        ingredient: ingredients,
        dujour,
        dessert,
    })

    const response = await fetch(`${api_url}/plat/${id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth,
        },
        body: json_body,
    });

    console.log(response)
    const data = await response.json();
    console.log(data)

    if (response.ok) {
        console.log(data)
        return new Response(data, {
            status: 200,
        })
    } else {
        return new Response(null, {
            status: 401,
        })
    }
}

const DELETE = async (req: Request, { params }: { params: { id: string }}) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const id = params.id;

    const response = await fetch(`${api_url}/plat/${id}/`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth,
        },
    });

    if (response.ok) {
        return new Response(null, {
            status: 200,
        })
    } else {
        return new Response(null, {
            status: 401,
        })
    }
}

export { PATCH, DELETE };