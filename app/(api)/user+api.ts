import { neon } from '@neondatabase/serverless';

export async function POST(request: Request) {
    console.log("Api user");
    try {
        const sql = neon(`${process.env.DATABASE_URL}`);
        console.log(process.env.DATABASE_URL);
        const { name, email, clerkId} = await request.json();
        console.log(name, email, clerkId);

        if (!name || !email || !clerkId) {
            return new Response('Missing required fields', {status: 400});
        }
        console.log("Aqui", name, email, clerkId);

        const response = await sql`
        INSERT INTO users (
            name, 
            email,
            clerk_id
        )
        VALUES (
            ${name},
            ${email},
            ${clerkId}
            )
            `;
        console.log(response);
        return new Response(JSON.stringify({data: response}), {status: 201});

    
        
    } catch (error) {
        console.log(error);
        return new Response('Internal server error', {status: 500});
    }
}

