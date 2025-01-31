import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import crypto from "crypto";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import { use } from "react";

export async function POST(req) {
  try {
    const body = await req.text();

    const hmac = crypto.createHmac("sha256", process.env.LS_SIGNING_SECRET);
    const digest = Buffer.from(hmac.update(body).digest("hex"), "utf8");
    const signature = Buffer.from(headers().get("x-signature"), "utf8");

    if (!crypto.timingSafeEqual(digest, signature)) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    const payload = JSON.parse(body);
    const eventName = payload.meta.event_name;

    if (eventName === "order_created") {
      // Handle checkout completed event
      await connectMongo();

      const user = await User.findById(payload.meta.custom_data.user_id);

      user.hasAccess = true;
      user.customerId = payload.data.attributes.customer_id.toString();

      await user.save();
    } else if (
      eventName === "subscription_expired" ||
      eventName === "subscription_payment_failed"
    ) {
      // Handle checkout failed event
      await connectMongo();

      const user = await User.findById(payload.meta.custom_data.user_id);
      user.hasAccess = false;
      await user.save();
    }
  } catch (error) {
    console.error("LemonSqueezy error", error?.message);
  }

  return NextResponse.json({});
}
