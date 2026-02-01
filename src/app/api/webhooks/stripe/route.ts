import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

import { prisma } from "@/lib/prisma";
import { OrderStatus, PaymentStatus, CartStatus } from "@prisma/client";

// === SETUP ====
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!process.env.STRIPE_SECRET_KEY || !webhookSecret) {
    console.error("Stripe webhook misconfigured: missing secrets");
    return NextResponse.json(
      { error: "Server misconfigured" },
      { status: 500 },
    );
  }

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 },
    );
  }

  let event: Stripe.Event;

  // Verify webhook signature
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "payment_intent.succeeded": {
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Get orderId from metadata (set when creating PaymentIntent)
      const orderId = paymentIntent.metadata.orderId;

      if (!orderId) {
        console.error("No orderId in payment intent metadata");
        break;
      }

      try {
        // Fetch the existing order
        const existingOrder = await prisma.order.findUnique({
          where: { id: orderId },
        });

        if (!existingOrder) {
          console.error(`Order ${orderId} not found`);
          break;
        }

        if (
          existingOrder.status === OrderStatus.PAID &&
          existingOrder.paymentStatus === PaymentStatus.PAID
        ) {
          console.log(`Order ${orderId} already marked as PAID`);
          break;
        }

        // Update order status to PAID
        await prisma.order.update({
          where: { id: orderId },
          data: {
            status: OrderStatus.PAID,
            paymentStatus: PaymentStatus.PAID,
            updatedAt: new Date(),
          },
        });

        // Update cart status to ORDERED
        await prisma.cart.update({
          where: { id: existingOrder.cartId },
          data: {
            status: CartStatus.ORDERED,
            checkoutAt: new Date(),
          },
        });

        console.log(`Order ${orderId} marked as PAID`);
      } catch (error) {
        console.error(`Error updating order ${orderId}:`, error);
      }
      break;
    }

    // Handle failed payment intent
    case "payment_intent.payment_failed": {
      const failedPayment = event.data.object as Stripe.PaymentIntent;
      const failedOrderId = failedPayment.metadata.orderId;

      if (failedOrderId) {
        try {
          const existingOrder = await prisma.order.findUnique({
            where: { id: failedOrderId },
          });

          if (!existingOrder) {
            console.error(`Order ${failedOrderId} not found`);
            break;
          }

          if (existingOrder.paymentStatus === PaymentStatus.FAILED) {
            console.log(`Order ${failedOrderId} already marked as FAILED`);
            break;
          }

          await prisma.order.update({
            where: { id: failedOrderId },
            data: {
              paymentStatus: PaymentStatus.FAILED,
              updatedAt: new Date(),
            },
          });
          console.log(`Order ${failedOrderId} payment failed`);
        } catch (error) {
          console.error(`Error updating failed order ${failedOrderId}:`, error);
        }
      }
      break;
    }

    case "charge.refunded": {
      const refundedCharge = event.data.object as Stripe.Charge;
      const refundedOrderId = refundedCharge.metadata?.orderId;

      if (refundedOrderId) {
        try {
          await prisma.order.update({
            where: { id: refundedOrderId },
            data: {
              status: OrderStatus.REFUNDED,
              paymentStatus: PaymentStatus.REFUNDED,
              updatedAt: new Date(),
            },
          });
          console.log(`Order ${refundedOrderId} refunded`);
        } catch (error) {
          console.error(`Error refunding order ${refundedOrderId}:`, error);
        }
      }
      break;
    }

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}
