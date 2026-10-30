import Stripe from "stripe";

/** Client Stripe, ou null tant que STRIPE_SECRET_KEY n'est pas configurée (mode démo). */
export const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

export const isStripeReady = () => stripe !== null;
