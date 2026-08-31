'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Minus, Trash2, ShoppingBag, Lock } from 'lucide-react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import { useCartStore } from '@/lib/store/cartStore';
import { createPayPalOrder, capturePayPalOrder } from '@/app/actions/store';

export default function CartDrawer() {
  const router = useRouter();
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, clearCart } =
    useCartStore();

  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const subtotal = getSubtotal();
  const shippingFee = subtotal >= 100 || subtotal === 0 ? 0 : 10.0;
  const total = subtotal + shippingFee;

  // Format cart payload for Server Actions
  const getCartPayload = () =>
    items.map((item) => ({
      productId: item.product.id,
      variantId: item.selectedVariant?.id,
      quantity: item.quantity,
    }));

  const handleCreateOrder = async () => {
    setErrorMessage(null);
    const res = await createPayPalOrder(getCartPayload());
    if (!res.success || !res.orderId) {
      setErrorMessage(res.error || 'Failed to initialize order.');
      throw new Error(res.error || 'Failed order creation');
    }
    return res.orderId;
  };

  const handleApproveOrder = async (data: { orderID: string }) => {
    setIsProcessing(true);
    const captureRes = await capturePayPalOrder(data.orderID, getCartPayload());
    setIsProcessing(false);
    if (captureRes.success && captureRes.order) {
      sessionStorage.setItem('sbe_last_order', JSON.stringify(captureRes.order));
      clearCart();
      closeCart();
      router.push(`/store/success?orderId=${captureRes.order.orderId}`);
    } else {
      setErrorMessage(captureRes.error || 'Failed to capture payment.');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="absolute inset-0 bg-onyx-black/80 backdrop-blur-md transition-opacity"
          />

          <div className="fixed inset-y-0 right-0 flex max-w-full pl-4 md:pl-10">
            {/* Sliding Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="w-screen max-w-md h-[100dvh] bg-onyx-black border-l border-surface-variant text-on-surface shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header (Fixed) */}
              <div className="p-6 border-b border-surface-variant flex items-center justify-between shrink-0 bg-onyx-black z-10">
                <div className="flex items-center gap-3">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h2 className="font-display text-headline-md uppercase text-primary tracking-tight">
                    BAG ({items.reduce((acc, item) => acc + item.quantity, 0)})
                  </h2>
                </div>
                <button
                  onClick={closeCart}
                  aria-label="Close cart drawer"
                  className="w-9 h-9 flex items-center justify-center border border-surface-variant hover:border-primary hover:text-primary transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Error Alert Message */}
              {errorMessage && (
                <div className="bg-red-950/80 border-b border-red-500 text-red-200 text-body-md p-4 flex items-center justify-between shrink-0">
                  <span>{errorMessage}</span>
                  <button onClick={() => setErrorMessage(null)} className="text-red-400 font-bold">
                    ✕
                  </button>
                </div>
              )}

              {/* Single Scrollable Content Area (Items + Order Summary + Payment Options) */}
              <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin">
                {items.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center text-center text-silver-leaf/60 py-16">
                    <ShoppingBag className="w-16 h-16 mb-4 opacity-30 stroke-1" />
                    <p className="font-display text-headline-md uppercase text-silver-leaf mb-2">
                      YOUR BAG IS EMPTY
                    </p>
                    <p className="font-body text-body-md max-w-xs mb-8">
                      Explore our studio microphones, reference monitors, and pro audio equipment.
                    </p>
                    <button
                      onClick={closeCart}
                      className="font-body text-label-caps text-primary uppercase border-b border-primary pb-1 font-bold tracking-widest hover:opacity-80"
                    >
                      Browse Studio Equipment →
                    </button>
                  </div>
                ) : (
                  <>
                    {/* Itemized List */}
                    <div className="space-y-4">
                      <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest block font-semibold">
                        Selected Studio Gear
                      </span>
                      {items.map((item) => {
                        const basePrice = item.product.price;
                        const offset = item.selectedVariant?.priceOffset || 0;
                        const itemUnitPrice = basePrice + offset;

                        return (
                          <div
                            key={`${item.product.id}-${item.selectedVariant?.id || 'def'}`}
                            className="flex gap-4 border border-surface-variant/80 bg-surface-container-low p-4 relative group"
                          >
                            {/* Thumbnail */}
                            <div className="relative w-20 h-24 shrink-0 border border-surface-variant bg-black overflow-hidden">
                              <Image
                                src={item.product.images[0]}
                                alt={item.product.title}
                                fill
                                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
                              />
                            </div>

                            {/* Details */}
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <span className="font-body text-[10px] text-silver-leaf/60 uppercase block tracking-wider mb-1">
                                  {item.product.category}
                                </span>
                                <h3 className="font-display text-body-lg text-primary uppercase leading-tight line-clamp-1">
                                  {item.product.title}
                                </h3>
                                {item.selectedVariant && (
                                  <span className="font-body text-body-md text-silver-leaf block mt-0.5 font-semibold">
                                    {item.selectedVariant.name}
                                  </span>
                                )}
                                <span className="font-display text-body-md text-primary block mt-1">
                                  ${itemUnitPrice.toFixed(2)} USD
                                </span>
                              </div>

                              {/* Quantity Controls & Delete */}
                              <div className="flex items-center justify-between mt-3">
                                <div className="flex items-center border border-surface-variant bg-onyx-black">
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.product.id,
                                        item.selectedVariant?.id,
                                        item.quantity - 1
                                      )
                                    }
                                    aria-label="Decrease quantity"
                                    className="w-7 h-7 flex items-center justify-center hover:bg-surface-variant transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>
                                  <span className="w-8 text-center font-body text-label-caps text-primary">
                                    {item.quantity}
                                  </span>
                                  <button
                                    onClick={() =>
                                      updateQuantity(
                                        item.product.id,
                                        item.selectedVariant?.id,
                                        item.quantity + 1
                                      )
                                    }
                                    aria-label="Increase quantity"
                                    className="w-7 h-7 flex items-center justify-center hover:bg-surface-variant transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() =>
                                    removeItem(item.product.id, item.selectedVariant?.id)
                                  }
                                  aria-label="Remove item"
                                  className="text-silver-leaf/50 hover:text-red-500 transition-colors p-1"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    {/* Summary Breakdown Box */}
                    <div className="p-5 border border-surface-variant bg-surface-container-low space-y-3">
                      <div className="flex justify-between text-silver-leaf font-body text-body-md">
                        <span>Subtotal</span>
                        <span className="text-primary font-bold">${subtotal.toFixed(2)} USD</span>
                      </div>
                      <div className="flex justify-between text-silver-leaf font-body text-body-md">
                        <span>Estimated Shipping</span>
                        <span>
                          {shippingFee === 0 ? (
                            <span className="text-primary font-bold">FREE (Over $100)</span>
                          ) : (
                            `$${shippingFee.toFixed(2)} USD`
                          )}
                        </span>
                      </div>
                      <div className="flex justify-between font-display text-headline-md text-primary pt-3 border-t border-surface-variant uppercase">
                        <span>Total</span>
                        <span>${total.toFixed(2)} USD</span>
                      </div>
                    </div>

                    {/* ONLY TWO PAYMENT OPTIONS: PayPal & Debit/Credit Card */}
                    <div className="space-y-4 pt-2">
                      <span className="font-body text-label-caps text-silver-leaf uppercase tracking-widest block font-semibold">
                        Select Payment Method:
                      </span>

                      {/* Option 1: Pay with PayPal */}
                      <div className="border border-surface-variant/80 bg-onyx-black p-3 rounded-none">
                        <PayPalButtons
                          fundingSource="paypal"
                          style={{ layout: 'vertical', color: 'gold', shape: 'rect', label: 'paypal' }}
                          disabled={isProcessing}
                          createOrder={handleCreateOrder}
                          onApprove={handleApproveOrder}
                          onCancel={() => {
                            setIsProcessing(false);
                          }}
                          onError={(err) => {
                            setIsProcessing(false);
                            console.error('PayPal Button Error:', err);
                            setErrorMessage('PayPal payment window closed or notice issued.');
                          }}
                        />
                      </div>

                      {/* Option 2: Pay with Debit or Credit Card */}
                      <div className="border border-surface-variant/80 bg-onyx-black p-3 rounded-none">
                        <PayPalButtons
                          fundingSource="card"
                          style={{ layout: 'vertical', color: 'black', shape: 'rect', label: 'pay' }}
                          disabled={isProcessing}
                          createOrder={handleCreateOrder}
                          onApprove={handleApproveOrder}
                          onCancel={() => {
                            setIsProcessing(false);
                          }}
                          onError={(err) => {
                            setIsProcessing(false);
                            console.error('PayPal Card Error:', err);
                            setErrorMessage('Credit/Debit Card payment window closed.');
                          }}
                        />
                      </div>

                      <div className="flex items-center justify-center gap-2 font-body text-[10px] text-silver-leaf/60 uppercase tracking-widest pt-2">
                        <Lock className="w-3 h-3 text-primary" />
                        <span>Encrypted SSL 256-Bit Payment Gateway</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
