import { CommandeSimple } from "@/models/Commande";

const GET = async (req: Request) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const url = new URL(req.url);
    const user = url.searchParams.get("user");

    const response = await fetch(`${api_url}/commande/${user !== null ? `?user=${user}` : ''}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth,
        },
    });

    console.log(response)

    if (response.ok) {
        const data = await response.json();
        console.log(data)

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
}

const POST = async (req: Request) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const order = await req.json() as CommandeSimple;

    const json_body = JSON.stringify(order)

    const response = await fetch(`${api_url}/commande/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth,
        },
        body: json_body,
    });

    const data = await response.json();

    if (response.ok) {
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