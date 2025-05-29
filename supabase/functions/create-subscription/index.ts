import { serve } from "https://deno.land/std/http/server.ts";
import Stripe from "https://esm.sh/stripe@12.6.0?target=denonext";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2023-10-16",
});

const allowedOrigins = [
  "http://localhost:8080",
  "https://commitify.me",
  "commitify.me",
  "https://www.commitify.me",
  "https://www.commitify.me/"
];

serve(async (req) => {
  const origin = req.headers.get("origin") || "";

  const corsHeaders = {
    "Access-Control-Allow-Origin": allowedOrigins.includes(origin) ? origin : "",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400"
  };

  // Handle preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      status: 200,
      headers: corsHeaders
    });
  }

  if (req.method !== "POST") {
    return new Response("Method not allowed", {
      status: 405,
      headers: corsHeaders
    });
  }

  try {
    const { userId, priceId } = await req.json();

    if (!userId || !priceId) {
      return new Response("Missing userId or priceId", {
        status: 400,
        headers: corsHeaders
      });
    }

    const customer = await stripe.customers.create({
      metadata: {
        user_id: userId
      }
    });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      customer: customer.id,
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      subscription_data: {
        metadata: {
          user_id: userId
        }
      },
      allow_promotion_codes: true, // ← ✅ This enables the input field on the checkout page
      success_url: "https://commitify.me/user-environment",
      cancel_url: "https://commitify.me/user-environment"
    });

    return new Response(JSON.stringify({ url: session.url }), {
      status: 200,
      headers: {
        ...corsHeaders,
        "Content-Type": "application/json"
      }
    });
  } catch (err) {
    console.error("❌ Error creating subscription:", err);
    return new Response("Internal server error", {
      status: 500,
      headers: corsHeaders
    });
  }
});