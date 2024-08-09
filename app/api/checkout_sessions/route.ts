import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-06-20", // Ensure compatibility with your Stripe API version
});

export async function POST(request: Request) {
  try {
    const { amount, address, contact } = await request.json();
    console.log("Received data:", { amount, address, contact });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", contact, address],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Cart items",
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL!}success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL!}cancel`,
      metadata: {
        address,
        contact,
      },
    });

    return new Response(JSON.stringify({ sessionId: session.id }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error : any) {
    console.error("Error creating Stripe Checkout Session:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
