import {UtilisateurComplet, utilisateurSimple} from "@/models/Utilisateur";

const GET = async (req: Request) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";

    const response = await fetch(`${api_url}/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth,
        },
    });

    if (response.ok) {
        const data = await response.json();

        const users : utilisateurSimple[] = data.map((user : UtilisateurComplet) => {
            const clean_user : utilisateurSimple = {
                id: user.id,
                nom: user.nom,
                prenom: user.prenom,
                mail: user.mail,
                tel: user.tel,
                adresse: user.adresse,
                photo: user.photo,
            }

            return clean_user;
        });

        const json_data = JSON.stringify({
            data: users,
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

const PATCH = async (req: Request) => {
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const auth = req.headers.get("Authorization") ?? "";
    const body = await req.json();

    const response = await fetch(`${api_url}/user/${body.id}/`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": auth,
        },
        body: JSON.stringify(body),
    });

    if (response.ok) {
        const data = await response.json();

        const user : utilisateurSimple = {
            id: data.id,
            nom: data.nom,
            prenom: data.prenom,
            mail: data.mail,
            tel: data.tel,
            adresse: data.adresse,
            photo: data.photo,
        }

        const json_data = JSON.stringify({
            data: user,
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

export { GET, PATCH };