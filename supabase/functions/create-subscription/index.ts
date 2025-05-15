import { serve } from "https://deno.land/std/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.6.0?target=denonext";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  try {
    const { userId, priceId } = await req.json();

    if (!userId || !priceId) {
      return new Response("Missing userId or priceId", { status: 400 });
    }

    // Create a Stripe customer
    const customer = await stripe.customers.create({
      metadata: { user_id: userId },
    });

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      subscription_data: {
        metadata: {
          user_id: userId,
        },
      },
      success_url: "https://commitify.me/user/environment",
      cancel_url: "https://commitify.me/user/environment",
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("❌ Error creating subscription:", err);
    return new Response("Internal server error", { status: 500 });
  }
});