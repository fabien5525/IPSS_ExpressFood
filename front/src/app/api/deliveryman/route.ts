import Livreur from "@/models/Livreur";

const GET = async (req: Request) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const response = await fetch(`${api_url}/livreur/`, {
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
}

const POST = async (req: Request) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const {
        localisation,
        status,
        user,
    } = await req.json() as Livreur;

    const json_body = JSON.stringify({
        localisation,
        status,
        user,
    })

    const response = await fetch(`${api_url}/livreur/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth,
        },
        body: json_body,
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
}

export { GET, POST };