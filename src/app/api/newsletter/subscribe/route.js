import { NextResponse } from "next/server";
import connectToDatabase from "../../../../lib/mongodb";
import Subscriber from "../../../../models/Subscriber";
import { Resend } from "resend";
import { pusherServer } from "../../../../lib/pusher";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(req) {
  try {
    const { email } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Upsert subscriber
    const subscriber = await Subscriber.findOneAndUpdate(
      { email: email.toLowerCase() },
      { $set: { status: "active" } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    // Send Welcome Email via Resend
    let emailSent = false;
    if (resend) {
      try {
        await resend.emails.send({
          from: "The Dragon Dispatch <onboarding@resend.dev>",
          to: email,
          subject: "🐉 Welcome to The Dragon Dispatch — Your Morning Intelligence",
          html: `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 20px; color: #111827; background-color: #ffffff; border: 1px solid #e5e7eb; border-radius: 12px;">
              <div style="text-align: center; border-bottom: 2px solid #f3f4f6; padding-bottom: 24px; margin-bottom: 24px;">
                <span style="font-size: 13px; text-transform: uppercase; letter-spacing: 2px; color: #dc2626; font-weight: 700;">Morning Intelligence</span>
                <h1 style="font-size: 28px; font-weight: 800; margin: 8px 0 4px 0; color: #111827; letter-spacing: -0.5px;">THE DRAGON DISPATCH</h1>
                <p style="margin: 0; color: #6b7280; font-size: 14px;">Journalism Without Fear or Favour</p>
              </div>

              <div style="padding: 10px 0; line-height: 1.6; font-size: 16px; color: #374151;">
                <p>Hello and welcome!</p>
                <p>You are now subscribed to <strong>The Dragon Dispatch</strong>. Every morning, you will receive our curated executive briefings, global geopolitical analysis, breakthrough technology insights, and market pulses directly in your inbox.</p>
                
                <div style="background-color: #f9fafb; border-left: 4px solid #dc2626; padding: 16px; margin: 24px 0; border-radius: 4px;">
                  <h4 style="margin: 0 0 8px 0; color: #111827; font-size: 15px;">What to expect in each edition:</h4>
                  <ul style="margin: 0; padding-left: 20px; color: #4b5563; font-size: 14px;">
                    <li style="margin-bottom: 6px;"><strong>The 30-Second AI Briefing:</strong> Essential takeaways before your first coffee.</li>
                    <li style="margin-bottom: 6px;"><strong>Deep Dive Feature:</strong> Unbiased, investigative journalism on stories that matter.</li>
                    <li style="margin-bottom: 6px;"><strong>Market & Innovation Pulse:</strong> Shifts in tech, finance, and global policy.</li>
                  </ul>
                </div>

                <p>Read today's live interactive edition anytime on our platform:</p>
                <div style="text-align: center; margin: 30px 0;">
                  <a href="http://localhost:3000" style="display: inline-block; background-color: #111827; color: #ffffff; text-decoration: none; padding: 14px 28px; font-weight: 600; border-radius: 8px; font-size: 15px;">Open Today's Dispatch →</a>
                </div>
              </div>

              <div style="border-top: 1px solid #f3f4f6; padding-top: 20px; margin-top: 30px; text-align: center; color: #9ca3af; font-size: 12px;">
                <p style="margin: 0 0 4px 0;">The Dragon Dispatch • Real-Time News & Intelligence Platform</p>
                <p style="margin: 0;">You received this email because you subscribed on our platform.</p>
              </div>
            </div>
          `,
        });
        emailSent = true;
      } catch (emailError) {
        console.warn("Resend email delivery notice:", emailError.message || emailError);
      }
    }

    // Trigger Pusher live subscriber notification
    try {
      if (pusherServer) {
        await pusherServer.trigger("dragon-channel", "new-subscriber", {
          message: "A new reader just joined The Dragon Dispatch!",
          timestamp: new Date().toISOString(),
        });
      }
    } catch (pusherErr) {
      console.warn("Pusher trigger notice:", pusherErr.message || pusherErr);
    }

    const totalCount = await Subscriber.countDocuments({ status: "active" });

    return NextResponse.json({
      success: true,
      message: "You're all set! Check your inbox for your welcome dispatch.",
      subscriberId: subscriber._id,
      totalCount,
      emailSent,
    });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Failed to process subscription. Please try again." },
      { status: 500 }
    );
  }
}
