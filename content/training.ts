/**
 * Training content. VERBATIM from "Webiste write up.xlsx" → Training, Explore
 * training, Offerings; and "First Timers Write up.xlsx" → PERSONAL TRAINING
 * (PT) FAQ. Offering descriptions use the verbatim PT-FAQ distinction between
 * 1-on-1 and semi-private.
 */

import type { CollapsibleSection } from "@/content/first-timers";

export const training = {
  eyebrow: "Training",
  signature: "Coaching makes champions",
  subtitle: "Elite coaches. Clear intent. Better performance.",
  membershipNote:
    "Grit Fit membership is required for all personal training clients.",
  explore: [
    "We’re an elite team of trainers from diverse disciplines, united by one mission: helping you achieve more.",
    "Each trainer brings their own expertise, but every programme is built around your goals, pace and potential. Whether it’s 1-on-1 coaching or small group training, we’re here to guide, challenge and elevate you at every step.",
  ],
  // Bold closing statement — carries the animated brand sheen (ShinyText).
  closer: "Push limits. Build discipline. Become stronger.",
  // "Our standard" call-to-action band.
  standard: {
    eyebrow: "Our standard",
    heading: "We don’t sell sessions. We build performance.",
    etiquetteNote:
      "To get the most from your coaching experience, we ask all PT clients to understand and follow our PT Terms & Etiquette.",
    etiquetteLabel: "Learn PT Terms & Etiquette",
    etiquetteHref: "/training/pt-terms",
  },
  offerings: [
    {
      name: "1-on-1 Coaching",
      desc: "1-on-1 coaching is fully personalised attention, programming and correction.",
    },
    {
      name: "Semi-Private Training",
      desc: "Semi-private training gives you the same level of coaching in a small group environment that adds energy, structure and shared momentum.",
    },
  ],
  // Card heading for "How we coach".
  offeringsHeading: "Both are built around you. The environment is what changes.",
  // Closing line under the two coaching types.
  offeringsShared: "Same Coaching, Different Environment.",
  // PT Terms & Expectations — moved here from First Timers; these are terms
  // of the coaching service, so they belong beside the coaching offer.
  // Rendered as a single-open accordion at the foot of /training.
  ptTerms: {
    eyebrow: "PT Terms & Expectations",
    intro:
      "Personal training at Grit Fit operates on a structured coaching agreement to ensure consistency, quality and progress.",
    sections: [
      {
        title: "Membership requirement",
        blocks: [
          {
            text: [
              "All personal training clients must hold an active Grit Fit membership.",
              "Personal training sessions are a separate service and do not replace membership access.",
            ],
          },
        ],
      },
      {
        title: "Session bookings",
        blocks: [
          {
            text: [
              "All sessions must be booked in advance through your coach or the club system.",
              "Sessions are confirmed only upon scheduling.",
              "Late arrivals will result in reduced training time.",
              "No-shows or late cancellations may be charged in full.",
            ],
          },
        ],
      },
      {
        title: "Cancellation policy",
        blocks: [
          {
            text: [
              "A minimum of 24 hours’ notice is required to cancel or reschedule a session.",
              "Cancellations within 24 hours are considered a completed session.",
            ],
          },
        ],
      },
      {
        title: "Session validity",
        blocks: [
          {
            text: [
              "PT sessions are valid only within the agreed package duration.",
              "Unused sessions may expire unless otherwise stated or agreed in writing.",
            ],
          },
        ],
      },
      {
        title: "Coach assignment",
        blocks: [
          {
            text: [
              "Coaches are assigned based on availability, goals and suitability.",
              "While coaching styles may vary, training standards remain consistent across the team.",
            ],
          },
        ],
      },
      {
        title: "Payment terms",
        blocks: [
          {
            text: [
              "All PT sessions or packages must be paid in full prior to commencement unless otherwise agreed.",
              "Training will not begin without confirmed payment.",
            ],
          },
        ],
      },
      {
        title: "Training etiquette",
        blocks: [
          { text: ["To maintain coaching standards and facility experience:"] },
          {
            items: [
              "Arrive on time",
              "Be prepared to train",
              "Follow coach instructions",
              "Respect equipment and space",
              "Maintain focus during sessions",
            ],
          },
        ],
      },
    ] as CollapsibleSection[],
  },
  faqs: [
    {
      q: "How do I know if personal training is right for me?",
      a: [
        "If you want focused attention, faster progression or structured accountability—this is for you.",
      ],
    },
    {
      q: "What’s the difference between 1-on-1 and semi-private training?",
      a: [
        "1-on-1 coaching is fully personalised attention, programming and correction.",
        "Semi-private training gives you the same level of coaching in a small group environment that adds energy, structure and shared momentum.",
        "Both are built around you. The environment is what changes.",
      ],
    },
    {
      q: "Do I need to be experienced to start PT?",
      a: [
        "No.",
        "Many members start personal training with zero background in structured training.",
        "Your coach meets you at your level and builds from there—step by step.",
      ],
    },
    {
      q: "Can PT help with fat loss or strength goals?",
      a: [
        "Yes.",
        "Every program is goal-driven. Whether it’s strength, fat loss, performance or rebuilding movement capacity, your training is designed for measurable progress.",
      ],
    },
    {
      q: "How are trainers assigned?",
      a: [
        "After your Performance Assessment, we match you with a coach based on your goals, experience and needs.",
        "This is intentional coaching alignment, not random assignment.",
      ],
    },
  ],
};
