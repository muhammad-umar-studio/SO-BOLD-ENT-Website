'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Printer, ArrowRight, Package } from 'lucide-react';
import { OrderRecord } from '@/types/store';
import Button from '@/components/ui/Button';
import FadeIn from '@/components/motion/FadeIn';

function OrderSuccessContent() {
  const searchParams = useSearchParams();
  const orderIdParam = searchParams.get('orderId');

  const [order, setOrder] = useState<OrderRecord | null>(null);

  useEffect(() => {
    const saved = sessionStorage.getItem('sbe_last_order');
    if (saved) {
      try {
        setOrder(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse last order:', e);
      }
    }
  }, []);

  const displayOrderId = order?.orderId || orderIdParam || 'ORD-SBE-CONFIRMED';

  return (
    <div className="w-full pt-32 pb-section-gap px-margin-mobile md:px-margin-desktop min-h-screen">
      <div className="max-w-3xl mx-auto">
        {/* Order Header Badge */}
        <FadeIn direction="down">
          <div className="border border-primary/40 bg-surface-container-low p-8 md:p-12 mb-12 relative text-center flex flex-col items-center">
            <div className="w-16 h-16 rounded-full border border-primary flex items-center justify-center bg-primary/10 text-primary mb-6">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="font-body text-label-caps text-primary uppercase tracking-[0.25em] block mb-2 font-bold">
              PAYMENT VERIFIED &amp; CONFIRMED
            </span>
            <h1 className="font-display text-display-md md:text-display-xl text-primary uppercase leading-tight mb-4">
              THANK YOU FOR YOUR ORDER
            </h1>
            <p className="font-body text-body-lg text-silver-leaf max-w-lg">
              Your transaction has been processed securely. A formal confirmation receipt has been issued to{' '}
              <span className="text-primary font-semibold">{order?.payerEmail || 'your email'}</span>.
            </p>
          </div>
        </FadeIn>

        {/* Receipt Box */}
        <div className="border border-surface-variant bg-onyx-black p-8 md:p-12 mb-12 shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-8 border-b border-surface-variant gap-4 mb-8">
            <div>
              <span className="font-body text-[11px] text-silver-leaf/60 uppercase tracking-widest block mb-1">
                Official Agency Order ID
              </span>
              <span className="font-display text-headline-md text-primary tracking-wider uppercase">
                {displayOrderId}
              </span>
            </div>
            {order?.paypalOrderId && (
              <div className="text-left md:text-right">
                <span className="font-body text-[11px] text-silver-leaf/60 uppercase tracking-widest block mb-1">
                  PayPal Transaction Reference
                </span>
                <span className="font-body text-body-md text-silver-leaf font-mono">
                  {order.paypalOrderId}
                </span>
              </div>
            )}
          </div>

          {/* Line Items */}
          {order?.items && order.items.length > 0 && (
            <div className="mb-8 border-b border-surface-variant pb-8">
              <h3 className="font-display text-headline-md text-primary uppercase mb-6">
                Purchased Equipment
              </h3>
              <div className="space-y-4">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center font-body text-body-md">
                    <div>
                      <span className="text-primary uppercase font-bold block">{item.productTitle}</span>
                      {item.variantName && (
                        <span className="text-silver-leaf/70 text-body-md block">{item.variantName}</span>
                      )}
                      <span className="text-silver-leaf/50 text-[12px]">Qty: {item.quantity}</span>
                    </div>
                    <span className="font-display text-headline-md text-primary">
                      ${item.totalPrice.toFixed(2)} USD
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Financial Summary */}
          <div className="space-y-3 font-body text-body-md border-b border-surface-variant pb-8 mb-8">
            <div className="flex justify-between text-silver-leaf">
              <span>Subtotal</span>
              <span className="text-primary">${(order?.subtotalPaid || 0).toFixed(2)} USD</span>
            </div>
            <div className="flex justify-between text-silver-leaf">
              <span>Shipping Fee</span>
              <span>
                {order?.shippingPaid === 0 ? 'FREE' : `$${(order?.shippingPaid || 0).toFixed(2)} USD`}
              </span>
            </div>
            <div className="flex justify-between font-display text-headline-md text-primary pt-3 border-t border-surface-variant/40 uppercase">
              <span>Total Paid</span>
              <span>${(order?.totalPaid || 0).toFixed(2)} USD</span>
            </div>
          </div>

          {/* Shipping Address */}
          {order?.shippingAddress && (
            <div className="mb-8">
              <span className="font-body text-[11px] text-silver-leaf/60 uppercase tracking-widest block mb-2">
                Fulfillment Shipping Address
              </span>
              <div className="font-body text-body-md text-silver-leaf/90 space-y-1">
                <p className="font-bold text-primary">{order.payerName}</p>
                <p>{order.shippingAddress.addressLine1}</p>
                {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                <p>
                  {order.shippingAddress.adminArea2}, {order.shippingAddress.adminArea1}{' '}
                  {order.shippingAddress.postalCode} {order.shippingAddress.countryCode}
                </p>
              </div>
            </div>
          )}

          {/* Fulfillment Timeline Notice */}
          <div className="bg-surface-container-low border border-surface-variant p-6 flex items-start gap-4">
            <Package className="w-6 h-6 text-primary shrink-0 mt-1" />
            <div className="font-body text-body-md text-silver-leaf/90">
              <span className="font-bold text-primary block uppercase mb-1">
                Fulfillment &amp; Dispatch Timeline
              </span>
              Studio hardware is tested, packaged in wooden/flight cases, and dispatched within 24-48 business hours from our Los Angeles or London hubs with full transit insurance.
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <Button
            variant="outline"
            onClick={() => window.print()}
            icon={<Printer className="w-4 h-4" />}
          >
            PRINT OFFICIAL RECEIPT
          </Button>

          <Link href="/store">
            <Button variant="primary" icon={<ArrowRight className="w-4 h-4" />}>
              CONTINUE SHOPPING
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function OrderSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full pt-40 pb-20 flex justify-center items-center font-display text-headline-md text-primary uppercase">
          LOADING ORDER RECEIPT...
        </div>
      }
    >
      <OrderSuccessContent />
    </Suspense>
  );
}
