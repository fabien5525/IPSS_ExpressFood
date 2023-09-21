const POST = async (req: Request) => {

    const { mail, password } = await req.json();

    const api_url = process.env.NEXT_PUBLIC_API_URL;

    const json_body = JSON.stringify({
        username: mail,
        password: password
    })

    const response = await fetch(`${api_url}/login/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: json_body,
    });

    if (response.ok) {
        const { token } = await response.json();
        return new Response(JSON.stringify({
            "token": token,
        }), {
            status: 200,
        })
    } else {
        return new Response(null, {
            status: 401,
        })
    }
};

export { POST };