import Image from "next/image";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AnimatedHeadingText,
  AnimateFadeIn,
  AnimateStagger,
  BaseSection,
  ContactCard,
  NewsletterCard,
} from "@/components";

import { supportFaqQuestions, supportContactInfo } from "@/lib";

export default function SupportPage() {
  return (
    <main>
      <BaseSection id="support-section" className="pb-16 xl:pb-20">
        <div className="flex flex-col gap-1 pt-6 md:pt-10 pb-6">
          <AnimatedHeadingText
            disableIsInView
            text="We're Here to Help"
            variant="page-title"
            className="pb-1"
          />
          <p className="text-neutral-10 text-base">
            {
              "Questions? Concerns? Let’s make your shopping experience seamless and enjoyable."
            }
          </p>
        </div>
        <div className="flex flex-col gap-10 md:gap-0 md:flex-row justify-between pt-12 items-center">
          <AnimateFadeIn className="relative w-full md:w-1/3 min-h-100 max-h-125 h-full">
            <Image
              priority
              className="object-cover rounded-sm"
              src="/assets/support-hero.jpg"
              alt="Support Image"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              quality={60}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QCARXhpZgAATU0AKgAAAAgABAEaAAUAAAABAAAAPgEbAAUAAAABAAAARgEoAAMAAAABAAIAAIdpAAQAAAABAAAATgAAAAAAAABIAAAAAQAAAEgAAAABAAOgAQADAAAAAQABAACgAgAEAAAAAQAAABCgAwAEAAAAAQAAAAoAAAAA/+0AOFBob3Rvc2hvcCAzLjAAOEJJTQQEAAAAAAAAOEJJTQQlAAAAAAAQ1B2M2Y8AsgTpgAmY7PhCfv/CABEIAAoAEAMBIgACEQEDEQH/xAAfAAABBQEBAQEBAQAAAAAAAAADAgQBBQAGBwgJCgv/xADDEAABAwMCBAMEBgQHBgQIBnMBAgADEQQSIQUxEyIQBkFRMhRhcSMHgSCRQhWhUjOxJGIwFsFy0UOSNIII4VNAJWMXNfCTc6JQRLKD8SZUNmSUdMJg0oSjGHDiJ0U3ZbNVdaSVw4Xy00Z2gONHVma0CQoZGigpKjg5OkhJSldYWVpnaGlqd3h5eoaHiImKkJaXmJmaoKWmp6ipqrC1tre4ubrAxMXGx8jJytDU1dbX2Nna4OTl5ufo6erz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAECAAMEBQYHCAkKC//EAMMRAAICAQMDAwIDBQIFAgQEhwEAAhEDEBIhBCAxQRMFMCIyURRABjMjYUIVcVI0gVAkkaFDsRYHYjVT8NElYMFE4XLxF4JjNnAmRVSSJ6LSCAkKGBkaKCkqNzg5OkZHSElKVVZXWFlaZGVmZ2hpanN0dXZ3eHl6gIOEhYaHiImKkJOUlZaXmJmaoKOkpaanqKmqsLKztLW2t7i5usDCw8TFxsfIycrQ09TV1tfY2drg4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIDAgIDBQMDAwUGBQUFBQYIBgYGBgYICggICAgICAoKCgoKCgoKDAwMDAwMDg4ODg4PDw8PDw8PDw8P/9sAQwECAgIEBAQHBAQHEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/9oADAMBAAIRAxEAAAEFryjryPS//9oACAEBAAEFApbWH3vbk2aZ5Sf09KtYf//aAAgBAxEBPwHjiL//2gAIAQIRAT8B5oyf/9oACAEBAAY/Alc0k8sZUFeJ8qPk4qMqjHSvHo1dxr+d2xCjoT/AX//EADMQAQADAAICAgICAwEBAAACCwERACExQVFhcYGRobHB8NEQ4fEgMEBQYHCAkKCwwNDg/9oACAEBAAE/IYi5ypOPR5q0ZQw1HDHexZ5Ln+q4AYcPFv/aAAwDAQACEQMRAAAQq//EADMRAQEBAAMAAQIFBQEBAAEBCQEAESExEEFRYSBx8JGBobHRweHxMEBQYHCAkKCwwNDg/9oACAEDEQE/EFShw/r/AFf/2gAIAQIRAT8QHAeT9f7v/9oACAEBAAE/EBh7GMglCShImca3CzeAxS1IeMqnIozLwMPggj4smJAow4k4v//Z%"
              fill
            />
          </AnimateFadeIn>
          <AnimateFadeIn className="w-full md:w-[57%]">
            <Accordion collapsible type="single">
              {supportFaqQuestions.map((faq, index) => (
                <AccordionItem key={index} value={`faq-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </AnimateFadeIn>
        </div>
      </BaseSection>

      <BaseSection
        id="contact-section"
        className="py-16 xl:py-20 flex flex-col gap-8"
      >
        <AnimatedHeadingText text="Contact" />
        <AnimateStagger
          className="flex justify-between flex-col xl:flex-row gap-6 w-full"
          childClassName="flex-1"
        >
          {supportContactInfo.map((contact, index) => (
            <ContactCard className="xl:w-full" key={index} {...contact} />
          ))}
        </AnimateStagger>
      </BaseSection>

      <div className="relative bg-main-01">
        <BaseSection id="support-newsletter-section" className="py-16 xl:py-20">
          <NewsletterCard />
        </BaseSection>
      </div>
    </main>
  );
}
