"use client";

import { useEffect } from "react";
import { useCart } from "@/components/Cart";

export function ClearCart() {
  const { clear } = useCart();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => clear(), []);
  return null;
}
