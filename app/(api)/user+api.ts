import { clerk } from '@clerk/clerk-expo/dist/provider/singleton';
import { neon } from '@neondatabase/serverless';


export async function Post (request: Request) {
    try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    const { name, email, clerkId} = await request.json();

    if (!name || !email || !clerkId) {
        return new Response('Missing required fields', {status: 400});
    }

    const response = await sql`
    INSERT INTO users (
        name, 
        email,
        clerk_id
    )
    VALUES (
        ${name}
        ${email}
        ${clerkId}
        )
        `;
        return new Response(JSON.stringify({data: response}), {status: 201});

            
        } catch (error) {
            console.log(error);
            return new Response('Internal server error', {status: 500});
        }


}

