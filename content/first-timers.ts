/**
 * First Timers content.
 *
 * Copy is VERBATIM from the updated source doc "First Timers Write up" →
 * "FIRST TIMERS / YOUR FIRST STEP STARTS HERE" and "PT TERMS & EXPECTATIONS".
 * The hero + opening statement stay open on the page; every remaining section
 * is a single-open accordion item (opening one collapses the others).
 */

export type SectionBlock = {
  /** Optional small label above the block (e.g. "What to wear"). */
  label?: string;
  /** Paragraph lines. */
  text?: string[];
  /** Bulleted list items. */
  items?: string[];
};

export type CollapsibleSection = {
  title: string;
  blocks: SectionBlock[];
};

export const firstTimers = {
  eyebrow: "First Timers",
  heading: "Your first step starts here",

  // Lead = opening intro lines (used in the hero).
  lead: [
    "Everyone starts somewhere.",
    "Whether you’re stepping into a RUSH class, training on the Strength Club floor, or entering The Recovery Zone for the first time—your journey begins the same way.",
    "Show up.",
  ],

  // Opening statement — stays open below the hero.
  intro: [
    "Grit Club is built for people who want more from themselves. More strength. More confidence. More capability.",
  ],

  // Group 1 — the first-visit walkthrough (single-open accordion).
  visit: {
    eyebrow: "Your first visit",
    heading: "Everything you need to know before you walk in.",
    sections: [
      {
        title: "Book your intro session",
        blocks: [
          {
            text: [
              "Every first-timer begins with a complimentary assessment.",
              "We don’t guess your starting point. We understand it—your goals, training history, movement, and experience—so we can guide you into the right path from day one.",
              "No pressure. No expectations. Just a clear starting line.",
            ],
          },
        ],
      },
      {
        title: "Arrive ready",
        blocks: [
          {
            text: [
              "Arrive 10–15 minutes early.",
              "Meet your coach. Get familiar with the space. Store your belongings. Step in prepared.",
              "Showing up early is part of showing up ready.",
            ],
          },
        ],
      },
      {
        title: "Your first RUSH class",
        blocks: [
          {
            text: [
              "New to group training?",
              "Start with a complimentary assessment so we can place you at the right level and help you train with confidence from day one.",
              "Learn the movements. Match the effort. Focus on intent.",
              "Progress comes over time.",
            ],
          },
        ],
      },
      {
        title: "Your first Strength Club visit",
        blocks: [
          {
            text: [
              "Strength Club is not an open gym.",
              "Every member begins with an assessment before training begins. From there, you follow a structured Training Plan with coaches available on the floor to guide, correct, and support your progress.",
              "You will always know what to do when you walk in.",
              "Train with intent. Respect the space. Return equipment when finished.",
              "Simple standards. Better training.",
            ],
          },
        ],
      },
      {
        title: "Your first Recovery session",
        blocks: [
          {
            text: [
              "Recovery is training.",
              "For sauna, cold plunge, contrast therapy, or manual therapy, arrive 10 minutes early.",
            ],
          },
          {
            label: "What to wear",
            items: [
              "Appropriate swimwear or athletic shorts/sports bra",
              "Flip flops or slip-on shoes",
              "Dry change of clothes for after your session",
              "Please avoid thongs or speedos",
            ],
          },
          {
            label: "What to bring",
            items: [
              "Water bottle",
              "Large towel",
              "An open mind",
              "A playlist or hype song for your plunge",
            ],
          },
          {
            label: "What to do",
            text: [
              "Keep it simple.",
              "You’ll be guided through the experience so you can move through heat, cold, or manual therapy safely and confidently.",
              "Leave feeling clear, reset, and ready.",
            ],
          },
        ],
      },
      {
        title: "Club etiquette",
        blocks: [
          { text: ["Help us maintain the standards that define Grit."] },
          {
            items: [
              "Respect coaches, members, and staff",
              "Return equipment after use",
              "Wipe down equipment when finished",
              "Keep phone use minimal during training",
              "Be present",
              "Train with intent",
              "Support the community around you",
            ],
          },
          { text: ["Simple standards. High expectations."] },
        ],
      },
      {
        title: "What happens next",
        blocks: [
          {
            text: [
              "One session won’t change your life. Consistency will.",
              "Your first visit is not a test—it’s an introduction to what you’re capable of becoming.",
              "Show up. Trust the process. Do the work.",
              "We’ll guide you from there.",
            ],
          },
        ],
      },
    ] as CollapsibleSection[],
  },

  // Group 2 — PT terms & expectations (single-open accordion).
  ptTerms: {
    eyebrow: "PT Terms & Expectations",
    intro:
      "Personal training at Grit operates on a structured coaching agreement to ensure consistency, quality, and progress.",
    sections: [
      {
        title: "Membership requirement",
        blocks: [
          {
            text: [
              "All personal training clients must hold an active Grit Club membership.",
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
              "Coaches are assigned based on availability, goals, and suitability.",
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
};
