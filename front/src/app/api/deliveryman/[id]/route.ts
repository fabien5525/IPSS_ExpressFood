import Livreur from "@/models/Livreur";

const PATCH = async (req: Request, { params }: { params: { id: string } }) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const id = params.id;

    const livreur = await req.json() as Livreur;

    if (!livreur || !livreur.user || livreur.user === 0) {
        return new Response(null, {
            status: 400,
        })
    }

    const json_body = JSON.stringify({
        localisation: livreur.localisation,
        status: livreur.status,
        user: livreur.user,
    })

    const response = await fetch(`${api_url}/livreur/${id}/`, {
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

const DELETE = async (req: Request, { params }: { params: { id: string } }) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const id = params.id;

    const response = await fetch(`${api_url}/livreur/${id}/`, {
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