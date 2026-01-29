"use client";

import { UseFormReturn } from "react-hook-form";

import { CheckoutFormData } from "./schema";
import { Input } from "@/components/ui";

type DeliveryDetailsStepProps = {
  form: UseFormReturn<CheckoutFormData>;
  completed: boolean;
  onEditDelivery: () => void;
};

export function DeliveryDetailsStep(props: DeliveryDetailsStepProps) {
  // === PROPS ===
  const { form, completed, onEditDelivery } = props;

  // === CLASSES ===
  const labelClass = "block text-sm font-medium text-neutral-11 mb-2";

  // === FORM SETUP ===
  const {
    register,
    formState: { errors },
    clearErrors,
  } = form;

  // === WATCHER ===
  const deliveryData = completed ? form.watch() : null;

  return (
    <>
      {/* Delivery Summary */}
      {completed && (
        <div className="bg-neutral-02 flex border border-neutral-5 rounded-md justify-between items-start">
          <div className="space-y-1 text-sm text-neutral-10 p-4">
            <p>{deliveryData?.fullName}</p>
            <p>{deliveryData?.email}</p>
            <p>{deliveryData?.phone}</p>
            <p>{deliveryData?.address}</p>
            <p>
              {deliveryData?.city}, {deliveryData?.state}{" "}
              {deliveryData?.zipCode}
            </p>
            <p>{deliveryData?.country}</p>
          </div>
          <button
            onClick={onEditDelivery}
            className="text-sm p-4 text-neutral-12 cursor-pointer font-medium underline"
          >
            Edit
          </button>
        </div>
      )}

      {!completed && (
        <div className="space-y-6">
          {/* Full Name */}
          <div>
            <label htmlFor="fullName" className={labelClass}>
              Full Name
            </label>
            <Input
              className="w-full"
              id="fullName"
              variant="light"
              placeholder="Amelia Clarke"
              autoComplete="name"
              isError={!!errors.fullName}
              {...register("fullName", {
                onChange: () => clearErrors("fullName"),
              })}
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600">
                {errors.fullName.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>
              Email
            </label>
            <Input
              className="w-full"
              id="email"
              type="email"
              variant="light"
              placeholder="amelia.clarke@cartelle.com"
              autoComplete="email"
              isError={!!errors.email}
              {...register("email", {
                onChange: () => clearErrors("email"),
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className={labelClass}>
              Phone Number
            </label>
            <Input
              className="w-full"
              id="phone"
              type="tel"
              variant="light"
              placeholder="020 7946 0958"
              autoComplete="tel"
              isError={!!errors.phone}
              {...register("phone", {
                onChange: () => clearErrors("phone"),
              })}
            />
            {errors.phone && (
              <p className="mt-1 text-sm text-red-600">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Address */}
          <div>
            <label htmlFor="address" className={labelClass}>
              Street Address
            </label>
            <Input
              className="w-full"
              id="address"
              variant="light"
              placeholder="123 Main Street"
              autoComplete="street-address"
              isError={!!errors.address}
              {...register("address", {
                onChange: () => clearErrors("address"),
              })}
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">
                {errors.address.message}
              </p>
            )}
          </div>

          {/* City and State */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="city" className={labelClass}>
                City
              </label>
              <Input
                className="w-full"
                id="city"
                variant="light"
                placeholder="London"
                autoComplete="address-level2"
                isError={!!errors.city}
                {...register("city", {
                  onChange: () => clearErrors("city"),
                })}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.city.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="state" className={labelClass}>
                State
              </label>
              <Input
                className="w-full"
                id="state"
                variant="light"
                placeholder="England"
                autoComplete="address-level1"
                isError={!!errors.state}
                {...register("state", {
                  onChange: () => clearErrors("state"),
                })}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          {/* ZIP Code and Country */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="zipCode" className={labelClass}>
                ZIP Code
              </label>
              <Input
                className="w-full"
                id="zipCode"
                variant="light"
                placeholder="SW1A 1AA"
                autoComplete="postal-code"
                isError={!!errors.zipCode}
                {...register("zipCode", {
                  onChange: () => clearErrors("zipCode"),
                })}
              />
              {errors.zipCode && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.zipCode.message}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="country" className={labelClass}>
                Country
              </label>
              <Input
                className="w-full"
                id="country"
                variant="light"
                placeholder="United Kingdom"
                autoComplete="country"
                isError={!!errors.country}
                {...register("country", {
                  onChange: () => clearErrors("country"),
                })}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.country.message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
