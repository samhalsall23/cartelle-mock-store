import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  AnimatedHeadingText,
  AnimateFadeIn,
  BaseSection,
} from "@/components";
import Image from "next/image";

const faqQuestions = [
  {
    question: "How can I track my order?",
    answer:
      "You can track your order using the tracking link sent to your email after shipping.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy. Items must be in original condition with tags attached.",
  },
  {
    question: "Do you offer international shipping?",
    answer:
      "Yes, we ship to over 50 countries worldwide. Shipping fees and times vary by location.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept major credit and debit cards, PayPal, Apple Pay, and Google Pay. All payments are processed securely, and we do not store your card details on our servers.",
  },
  {
    question: "How do I contact customer support?",
    answer:
      "You can contact our customer support team via email or live chat. Our support hours are Monday through Friday, 9 AM to 6 PM. We aim to respond to all inquiries within 24 hours, excluding weekends and holidays. For faster assistance, please include your order number when reaching out.",
  },
];

export default function SupportPage() {
  return (
    <main>
      <BaseSection id="support-section" className="pb-16">
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
        <div className="flex flex-col gap-10 md:gap-0 md:flex-row justify-between pt-8 items-center">
          <AnimateFadeIn className="relative w-full md:w-1/3 min-h-100 max-h-125 h-full">
            <Image
              className="object-cover rounded-sm"
              src="/assets/clothes-model.jpg"
              alt="Support Image"
              fill
            />
          </AnimateFadeIn>
          <Accordion className="w-full md:w-[57%]" collapsible type="single">
            {faqQuestions.map((faq, index) => (
              <AccordionItem key={index} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </BaseSection>

      <BaseSection id="contact-section" className="pb-16">
        <AnimatedHeadingText text="Contact" />
      </BaseSection>
    </main>
  );
}
