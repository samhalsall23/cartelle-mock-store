"use client";

import { UseFormReturn } from "react-hook-form";

import { CheckoutFormData } from "./schema";
import { Input } from "@/components/ui";
import { Button } from "@/components/ui/Button/Button";

type DeliveryDetailsStepProps = {
  form: UseFormReturn<CheckoutFormData>;
  onContinue: () => void;
};

export function DeliveryDetailsStep(props: DeliveryDetailsStepProps) {
  const { form, onContinue } = props;

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-medium text-neutral-12 mb-6">
        Delivery Details
      </h2>

      {/* Full Name */}
      <div>
        <label
          htmlFor="fullName"
          className="block text-sm font-medium text-neutral-11 mb-2"
        >
          Full Name
        </label>
        <Input
          id="fullName"
          variant="light"
          placeholder="John Doe"
          isError={!!errors.fullName}
          {...register("fullName")}
        />
        {errors.fullName && (
          <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
        )}
      </div>

      {/* Email */}
      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-neutral-11 mb-2"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          variant="light"
          placeholder="john@example.com"
          isError={!!errors.email}
          {...register("email")}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
        )}
      </div>

      {/* Phone */}
      <div>
        <label
          htmlFor="phone"
          className="block text-sm font-medium text-neutral-11 mb-2"
        >
          Phone Number
        </label>
        <Input
          id="phone"
          type="tel"
          variant="light"
          placeholder="(555) 123-4567"
          isError={!!errors.phone}
          {...register("phone")}
        />
        {errors.phone && (
          <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>
        )}
      </div>

      {/* Address */}
      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-neutral-11 mb-2"
        >
          Street Address
        </label>
        <Input
          id="address"
          variant="light"
          placeholder="123 Main Street"
          isError={!!errors.address}
          {...register("address")}
        />
        {errors.address && (
          <p className="mt-1 text-sm text-red-600">{errors.address.message}</p>
        )}
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="city"
            className="block text-sm font-medium text-neutral-11 mb-2"
          >
            City
          </label>
          <Input
            id="city"
            variant="light"
            placeholder="New York"
            isError={!!errors.city}
            {...register("city")}
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="state"
            className="block text-sm font-medium text-neutral-11 mb-2"
          >
            State
          </label>
          <Input
            id="state"
            variant="light"
            placeholder="NY"
            isError={!!errors.state}
            {...register("state")}
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state.message}</p>
          )}
        </div>
      </div>

      {/* ZIP Code and Country */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label
            htmlFor="zipCode"
            className="block text-sm font-medium text-neutral-11 mb-2"
          >
            ZIP Code
          </label>
          <Input
            id="zipCode"
            variant="light"
            placeholder="10001"
            isError={!!errors.zipCode}
            {...register("zipCode")}
          />
          {errors.zipCode && (
            <p className="mt-1 text-sm text-red-600">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="country"
            className="block text-sm font-medium text-neutral-11 mb-2"
          >
            Country
          </label>
          <Input
            id="country"
            variant="light"
            placeholder="United States"
            isError={!!errors.country}
            {...register("country")}
          />
          {errors.country && (
            <p className="mt-1 text-sm text-red-600">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      {/* Continue Button */}
      <div className="pt-4">
        <Button
          onClick={onContinue}
          variant="dark"
          text="Continue to Payment"
          className="w-full"
        />
      </div>
    </div>
  );
}
