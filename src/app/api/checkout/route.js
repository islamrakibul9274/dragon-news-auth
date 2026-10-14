import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

export async function POST(req) {
  try {
    if (!stripe) {
      return NextResponse.json(
        { error: "Stripe is not configured." },
        { status: 500 }
      );
    }

    const { plan = "pro_monthly" } = await req.json();

    const planConfig = {
      pro_monthly: {
        name: "Dragon Dispatch Pro Membership (Monthly)",
        amount: 900, // $9.00
        description: "Unlimited AI Executive Briefings, Ad-free experience, Weekly deep dives",
      },
      founding_yearly: {
        name: "Dragon Dispatch Founding Member (Annual)",
        amount: 8900, // $89.00
        description: "All Pro benefits + Founding badge, Direct editor access, Annual gift book",
      },
    }[plan] || {
      name: "Dragon Dispatch Pro Membership",
      amount: 900,
      description: "Full access to The Dragon Dispatch",
    };

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: planConfig.name,
              description: planConfig.description,
              images: ["https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=400"],
            },
            unit_amount: planConfig.amount,
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${origin}/pricing?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing?canceled=true`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
