import { useState, useEffect } from "react";
import { createPortal } from "react-dom";

interface CartItem {
  title: string;
  variant: string;
  size: string;
  price: string;
  compareAtPrice: string;
  image: string;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItem: CartItem;
}

export function CartDrawer({ isOpen, onClose, cartItem }: CartDrawerProps) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [mounted, setMounted] = useState(false);
  
  const subtotal = parseFloat(cartItem.price.replace("$", "")) * quantity;
  const freeShippingThreshold = 75;
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const shippingProgress = Math.min(1, subtotal / freeShippingThreshold);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => Math.max(1, q - 1));

  if (!isOpen || !mounted) return null;

  return createPortal(
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[9998] bg-black/30 transition-opacity"
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="fixed top-0 right-0 bottom-0 z-[9999] flex h-screen w-full max-w-[531px] flex-col overflow-hidden bg-white shadow-xl"
        style={{
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Header */}
        <div className="flex flex-col items-center justify-between px-2.5 pt-1.5 pb-2.5">
          <div className="flex w-full items-center justify-between">
            <h2 className="text-xs font-bold uppercase">Cart ({quantity})</h2>
            <p className="m-auto text-center text-sm text-gray-500">
              {amountToFreeShipping > 0
                ? `Spend $${amountToFreeShipping.toFixed(0)} more to earn free shipping!`
                : "You've earned free shipping!"}
            </p>
            <button
              className="cursor-pointer"
              aria-label="Close cart"
              onClick={onClose}
            >
              <svg className="size-8" fill="none" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8.31539 6.89807C8.12013 6.7028 7.80354 6.7028 7.60828 6.89807C7.41302 7.09333 7.41302 7.40991 7.60828 7.60517L11.7104 11.7073L7.31557 16.1021C7.12031 16.2974 7.12031 16.614 7.31557 16.8092C7.51083 17.0045 7.82742 17.0045 8.02268 16.8092L12.4175 12.4144L16.8007 16.7976C16.9959 16.9928 17.3125 16.9928 17.5078 16.7976C17.703 16.6023 17.703 16.2857 17.5078 16.0905L13.1246 11.7073L17.2151 7.61684C17.4103 7.42157 17.4103 7.10499 17.2151 6.90973C17.0198 6.71447 16.7032 6.71447 16.508 6.90973L12.4175 11.0002L8.31539 6.89807Z"
                  fill="currentColor"
                />
              </svg>
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="w-full py-1.5">
            <div className="h-[7px] w-full rounded bg-gray-100">
              <div
                className="h-[7px] rounded bg-black transition-all duration-300"
                style={{ width: `${shippingProgress * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Cart Items - Scrollable */}
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          <ul className="px-2.5">
            {/* Cart Item */}
            <li className="mb-2 flex items-stretch border-b border-gray-200">
              <div className="mb-3 flex w-full items-center justify-between gap-x-3">
                {/* Product Image */}
                <a className="block shrink-0" href="#">
                  <img
                    src={cartItem.image}
                    alt={cartItem.title}
                    className="aspect-square size-[85px] rounded object-contain"
                  />
                </a>

                {/* Product Info */}
                <div className="flex grow flex-col gap-y-2.5 overflow-hidden">
                  <div className="flex flex-col gap-y-1.5">
                    <a
                      className="text-xs font-bold uppercase tracking-wider"
                      href="#"
                    >
                      {cartItem.title}
                    </a>
                    <p className="truncate text-xs text-gray-500">
                      {cartItem.variant}
                    </p>
                    <p className="truncate text-xs text-gray-500">
                      Size: {cartItem.size}
                    </p>
                  </div>
                  <button className="w-fit cursor-pointer text-left text-xs text-gray-500 underline hover:text-black">
                    Remove
                  </button>
                </div>

                {/* Price & Quantity */}
                <div className="flex min-h-full flex-col items-end gap-y-1">
                  <div className="flex gap-x-2 text-sm font-medium">
                    <p className="text-red-600">{cartItem.price}</p>
                    <p className="text-gray-500 line-through">
                      {cartItem.compareAtPrice}
                    </p>
                  </div>

                  {/* Quantity Selector */}
                  <div className="mt-auto flex items-center justify-end">
                    <div className="inline-flex min-h-[32px] min-w-[100px] items-center justify-between rounded-full border border-gray-300 px-3 text-xs font-medium text-black">
                      <button
                        className="cursor-pointer"
                        aria-label="Decrease quantity"
                        onClick={handleDecrement}
                      >
                        <svg className="size-4" viewBox="0 0 24 24" fill="none">
                          <path
                            d="M5 12H19"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </button>
                      <span>{quantity}</span>
                      <button
                        className="cursor-pointer"
                        aria-label="Increase quantity"
                        onClick={handleIncrement}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-white px-2.5 py-3.5">
          <div className="mb-2 flex items-center justify-between font-semibold">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(0)}</p>
          </div>
          <button className="w-full rounded-full border border-black bg-black py-4 text-sm font-medium uppercase tracking-wider text-white hover:bg-gray-800">
            Checkout
          </button>
        </div>
      </div>
    </>,
    document.body
  );
}
