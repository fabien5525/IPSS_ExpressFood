const GET = async (req: Request) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const response = await fetch(`${api_url}/plat/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth,
        },
    });

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
            status: 401,
        })
    }
};

export interface PlatToAdd {
    nom: string;
    prix: number;
    ingredients: string;
    dujour: boolean;
    dessert: boolean;
}

const POST = async (req: Request) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const {
        nom,
        prix,
        ingredients,
        dujour,
        dessert,
    } = await req.json() as PlatToAdd;

    const json_body = JSON.stringify({
        nom,
        prix,
        ingredient: ingredients,
        dujour,
        dessert,
    })

    const response = await fetch(`${api_url}/plat/`, {
        method: "POST",
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


export { GET, POST };