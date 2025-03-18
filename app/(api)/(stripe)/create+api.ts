import { Stripe } from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST( request: Request) {
    const body = await request.json();
    const { name, email, amount } = body;
    if (!name || !email || !amount) {
        return new Response(JSON.stringify({
            error: 'Missing required fields',
            status: 400
        }))
    }
    let customer;
    const doescostumerExist = await stripe.customers.list({ email: email });
    if (doescostumerExist) {
        customer = doescostumerExist.data[0];
    } else {
        const newCostumer = await stripe.customers.create({
            name, 
            email
        })
        customer = newCostumer;
    }
    const ephemeralKey = await stripe.ephemeralKeys.create(
        {customer: customer.id},
        {apiVersion: '2025-02-24.acacia'}
      );
      const paymentIntent = await stripe.paymentIntents.create({
        amount: parseInt(amount) * 100,
        currency: 'usd',
        customer: customer.id,
        automatic_payment_methods: {
          enabled: true,
          allow_redirects: 'never'
        },
      });
    
      return new Response(
        JSON.stringify({
            paymentIntent: paymentIntent,
            ephemeralKey: ephemeralKey,
            customer: customer.id,
      })
    );
}