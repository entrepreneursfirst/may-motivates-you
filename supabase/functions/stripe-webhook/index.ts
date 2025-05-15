import { serve } from "https://deno.land/std/http/server.ts";
// import Stripe from "npm:stripe"; // This works in Edge Functions
import Stripe from 'https://esm.sh/stripe@18.1.0?target=denonext'
import { createClient } from "https://esm.sh/@supabase/supabase-js";

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') as string, {
  // This is needed to use the Fetch API rather than relying on the Node http
  // package.
  apiVersion: '2023-10-16'
})
// This is needed in order to use the Web Crypto API in Deno.
const cryptoProvider = Stripe.createSubtleCryptoProvider()

console.log('Hello from Stripe Webhook!')

serve(async (request) => {
  // Ensure we get the raw request body before any parsing
  const body = await request.text(); // Get the raw request body as text
  const signature = request.headers.get('Stripe-Signature');

  if (!signature) {
    console.error("❌ No Stripe signature found in the request");
    return new Response("No Stripe signature found", { status: 400 });
  }

  let receivedEvent;

  console.log(`Signature length: ${signature.length}`);
  console.log(`Request body length: ${body.length}`);
  console.log(`body = ${body}`)
  console.log(`signature = ${signature}, \n
      Deno.env.get('STRIPE_WEBHOOK_SECRET') = ${Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')}`)
  
  try {
    receivedEvent = await stripe.webhooks.constructEventAsync(
      body,
      signature,
      Deno.env.get('STRIPE_WEBHOOK_SIGNING_SECRET')!,
      undefined,
      cryptoProvider
    );
  } catch (err) {
    console.error("❌ Invalid signature:", err.message);
    return new Response("Webhook signature verification failed: " + err.message, { status: 400 });
  }
  console.log("Successful received event!")
  console.log(`receivedEvent = ${receivedEvent}`)
  console.log("event type = ", receivedEvent.type)

  // ✅ Handle relevant events
  if (receivedEvent.type === "invoice.payment_succeeded") {
    const invoice = receivedEvent.data.object;
    console.log(`invoice = ${JSON.stringify(invoice)}`)
    console.log(`type of subsription = ${typeof(invoice)}`)
    console.log(`invoice.subscription =${invoice.parent.subscription_details.subscription}`)

    const subscriptionId =
    invoice.subscription ||
    invoice.parent?.subscription_details?.subscription;

    if (!subscriptionId) {
      console.warn("❌ No subscription ID found in invoice.");
      return new Response("No subscription in invoice", { status: 200 });
    }

    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    console.log(`subscription = ${subscription}`)
    console.log(subscription)
    const userId = subscription.metadata.user_id;
    const packageId = subscription.plan.id;
    console.log(`userId = ${userId} \n packageId = ${packageId}`)

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const creditMap: Record<string, number> = {
      "price_1ROh24GIxsF8bStBU1EBfS9Z": 7, // Ride or Die Plan - 7 weekly calls
      "price_1ROh0nGIxsF8bStB1xJw1MrF": 5, // Bestie plan - 5 weekly calls
      "price_1ROgvjGIxsF8bStBvltMVloL": 3, // Acquaintance plan - 3 weekly calls
      "price_1ROr80GIxsF8bStBYpj48Ue0": 3, //  Single package of 3 calls 
      "price_1ROiaZGIxsF8bStBTLbdv0eb": 1 // test_product
    };

    const credits = creditMap[packageId] ?? 0;

    console.log(`awarded credits = ${credits}`)

    const { data, error } = await supabase
      .from('users')
      .select()
      .eq('id', userId)
      
      console.log("the data_user ")
      console.log(data)
      const userBalance = data[0]?.balance
      const updatedUserBalance = userBalance + credits

    if (userId && credits > 0) {
      const { error } = await supabase
        .from("users")
        .update({ 
          balance: updatedUserBalance, 
          active_plan: packageId })
        .eq("id", userId);

      if (error) {
        console.error("❌ Failed to update user balance", error.message);
        return new Response("Database error", { status: 500 });
      }

      console.log(`✅ Added ${credits} credits to user ${userId}`);
    }
  } else {
    console.log(`Unhandled event type: ${receivedEvent.type}`);
  }

  return new Response("OK", { status: 200 });
});