import { utilisateurSimple } from "@/models/Utilisateur";

const POST = async (req: Request) => {

    const user = await req.json() as utilisateurSimple;

    const api_url = process.env.NEXT_PUBLIC_API_URL;
    
    const response = await fetch(`${api_url}/register/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            nom: user.nom,
            prenom: user.prenom,
            adresse: user.adresse,
            mail: user.mail,
            photo: user.photo,
            tel: user.tel,
        }),
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