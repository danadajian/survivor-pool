import React from "react";

import { Heading } from "../../components/heading";
import { Surface } from "../../components/ui/surface";

export const privacySections = [
  {
    id: "introduction",
    title: "Introduction",
    body: [
      "This Privacy Policy describes how we collect, use, and protect your personal information when you use our Survivor Pool website. By using our service, you agree to the collection and use of information in accordance with this policy.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    body: [
      "We collect information that you provide directly to us, including:",
      "• Email address (used as your username)",
      "• First and last name",
      "• Pool selections and picks",
      "• Pool membership and participation data",
      "We also automatically collect certain information when you use our service, such as your IP address, browser type, and usage patterns.",
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    body: [
      "We use the information we collect to:",
      "• Provide, maintain, and improve our services",
      "• Process and manage your pool participation",
      "• Track your picks and pool standings",
      "• Communicate with you about your account and our services",
      "• Ensure the security and integrity of our platform",
    ],
  },
  {
    id: "authentication",
    title: "Authentication and Account Management",
    body: [
      "We use Clerk for user authentication and account management. Clerk handles the secure storage and management of your authentication credentials. When you sign up or sign in, you are interacting with Clerk's services, and their privacy practices apply to that authentication process.",
      "Your email address and name are used to identify you within the application and to display your information to other pool members in pools you join or create.",
    ],
  },
  {
    id: "data-sharing",
    title: "Data Sharing and Disclosure",
    body: [
      "We do not sell your personal information. We may share your information only in the following circumstances:",
      "• With other members of pools you join or create (your display name and picks)",
      "• With service providers who assist us in operating our platform (such as Clerk for authentication)",
      "• If required by law or to protect our rights and safety",
      "• In connection with a business transfer (merger, acquisition, etc.)",
    ],
  },
  {
    id: "data-retention",
    title: "Data Retention",
    body: [
      "We retain your personal information for as long as your account is active or as needed to provide you services. If you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal purposes.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    body: [
      "You have the right to:",
      "• Access the personal information we hold about you",
      "• Correct inaccurate or incomplete information",
      "• Request deletion of your personal information",
      "• Withdraw consent where processing is based on consent",
      "To exercise these rights, please contact us using the information provided in the Contact section below.",
    ],
  },
  {
    id: "security",
    title: "Security",
    body: [
      "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    body: [
      "Our service is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Privacy Policy",
    body: [
      'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this Privacy Policy periodically for any changes.',
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    body: [
      "If you have any questions about this Privacy Policy, please contact us through your account settings or by using the contact information available in the application.",
    ],
  },
] as const;

export const PrivacyContent = () => {
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="flex flex-col gap-3">
        <Heading>Privacy Policy</Heading>
        <p className="max-w-3xl text-left text-base text-slate-600">
          Your privacy is important to us. This policy explains how we collect,
          use, and protect your personal information.
        </p>
        <p className="text-sm text-slate-500">
          Last Updated:{" "}
          {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
      <article>
        <Surface className="flex flex-col gap-8">
          {privacySections.map(({ id, title, body }) => (
            <section key={id} id={id} className="flex flex-col gap-3 text-left">
              <h2 className="text-xl font-semibold text-slate-800">{title}</h2>
              <div className="flex flex-col gap-3 text-sm leading-relaxed text-slate-600">
                {body.map((paragraph, index) => (
                  <p key={`${id}-paragraph-${index}`}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </Surface>
      </article>
    </div>
  );
};
