/**
 * Grit Fit Club Standards. VERBATIM from "GRIT FIT CLUB STANDARDS" (21-08-2026),
 * which replaced the earlier, shorter policy list wholesale. Section order and
 * wording are exactly as written; the only edits are the house style rules —
 * no Oxford comma, "Grit Fit" rather than "Grit".
 */

export type ClubStandardsSection = {
  title: string;
  items: string[];
};

export const clubStandards = {
  title: "Grit Fit Club Standards",
  intro: [
    "Grit Fit is built around a simple standard: train with intent, respect the space, respect those around you and leave better than you arrived.",
    "These standards help us maintain an environment that is focused, clean, safe and uncompromising on quality.",
  ],
  closing:
    "Thank you for helping us uphold the Grit Fit standard — it is what keeps this a space everyone is glad to train in. If you have any questions, suggestions or concerns, our team is always happy to help. We’d love to hear from you — reach out to us at",
  // Club inbox, rendered as a mailto link after the closing line.
  closingEmail: "fitness@gritfit.club",
  sections: [
    {
      title: "Training Areas",
      items: [
        "Strength Club: Follow your assigned programme and workout card, built around your Performance Assessment, goals and training needs.",
        "RUSH: Arrive on time and be ready when the session begins. Follow the coach-led class structure throughout.",
        "Coaching is part of the experience. Coaches are available to guide, correct and support you. Ask for help when needed.",
        "Speak with a coach before modifying your prescribed exercises, loads or training structure.",
        "Respect the space and those training around you. Do not unnecessarily occupy equipment, benches, racks or training areas.",
        "Return all equipment after use and leave your training area clean and ready for the next member or class.",
        "Load and unload equipment safely and with control. Do not drop equipment unless specifically designed for it and used in a designated area.",
        "Use chalk, straps and other training aids responsibly and keep the area clean.",
        "Follow movement modifications provided by your coach or appropriate to your individual ability.",
        "Push yourself, but train with control. Quality of movement comes before unnecessary intensity.",
        "Do not enter or interrupt an active RUSH class unless instructed by the coach.",
        "If you are new to a format or movement, ask your coach for guidance before beginning.",
        "Outdoor shoes are not permitted in training areas. Clean athletic footwear is required. Bare feet and socks are permitted where appropriate.",
        "Ball slams and other high-impact activities are permitted only in designated areas.",
        "Keep phone use discreet while training. Speakerphone use is not permitted anywhere in the Club.",
      ],
    },
    {
      title: "Essential Recovery",
      items: [
        "Follow all instructions provided by the Grit Fit Team before using any recovery facility.",
        "Arrive on time and respect your allocated recovery session.",
        "Please shower before use. Showers are available within the Recovery Zone.",
        "Follow prescribed towel and hygiene practices for each modality.",
        "Do not use recovery facilities if you are unwell or advised against use by the Grit Fit Team.",
        "Inform the Team of any relevant limitation or concern before using a recovery modality.",
        "Follow all posted safety, time, temperature and usage guidelines for Cold Plunge, Infrared Sauna and Contrast Therapy.",
        "Shoes and electronic devices are not permitted in designated recovery areas. Store devices securely in your locker.",
        "Food and drinks are not permitted unless specifically authorised.",
        "The Recovery Zone does not have toilet facilities. Please use the Club washrooms before your session.",
        "Keep conversations quiet and respect allocated recovery times.",
        "Leave the facility clean and ready for the next member.",
      ],
    },
    {
      title: "Locker Rooms & Washrooms",
      items: [
        "Always secure your locker and take all personal belongings with you when you leave.",
        "Keep changing areas, benches and shared surfaces clean and dry.",
        "Remove used towels, clothing, toiletries, packaging and personal items before leaving.",
        "Photography, filming and audio recording are strictly prohibited.",
        "Phone calls, video calls and speakerphone use are not permitted.",
        "Use lockers, benches and changing areas considerately.",
        "Dispose of waste in designated bins.",
        "Use showers, washrooms and other facilities responsibly.",
        "Report damaged lockers, fixtures, maintenance or hygiene concerns to the Grit Fit Team.",
      ],
    },
    {
      title: "Reception, Lobby & Waiting Areas",
      items: [
        "Follow all check-in and access procedures at reception.",
        "Keep reception and waiting areas clean, calm and organised. Keep walkways and access points clear.",
        "Use seating respectfully and keep conversations and phone calls at a considerate volume.",
        "Do not leave bags, shoes or personal belongings in common areas.",
        "Guests and visitors must follow Grit Fit's check-in and access procedures.",
        "Children may remain in the café or lobby only with required adult supervision and where they do not qualify for Club access.",
        "Do not enter restricted training or recovery areas without appropriate access.",
        "Outdoor shoes are not permitted beyond the reception area and lobby on the second floor. Please change into appropriate indoor or training footwear.",
        "Treat the reception and Grit Fit Team with courtesy and respect.",
        "Direct questions, requests or concerns to the Grit Fit Team.",
      ],
    },
    {
      title: "Minors & Age Requirements",
      items: [
        "Members aged 8–18 require a parent or legal guardian to sign the Club Liability Waiver and Membership Agreement.",
        "An active membership or valid day pass is required for Club access.",
        "Members under 14 must be accompanied and supervised by a parent, legal guardian or approved trainer at all times.",
        "Minors must actively participate in an approved activity with their supervising adult.",
        "Grit Fit does not provide childcare services.",
        "Children who do not meet membership age requirements must remain in the designated lobby under pre-arranged adult supervision.",
        "Children are not permitted beyond designated access points or into training and recovery areas unless they meet the applicable age requirements.",
      ],
    },
    {
      title: "Photos & Filming",
      items: [
        "Respect the privacy and experience of all Grit Fit members and guests.",
        "Do not photograph, film or record another member or guest without consent.",
        "Photography, filming and audio recording are strictly prohibited in locker rooms, washrooms and other privacy-sensitive areas.",
        "Professional photography, videography, camera equipment or tripods require prior management approval.",
        "Contact the Grit Fit Team in advance for professional filming or photography enquiries.",
        "Avoid intentionally capturing other members in personal content without consent.",
        "Grit Fit may ask members or guests to stop filming if it disrupts training, compromises privacy or affects another member's experience.",
      ],
    },
    {
      title: "Personal Training & Commercial Activity",
      items: [
        "Members and guests may not provide personal training or online coaching within the Club unless authorised by Grit Fit.",
        "Third-party businesses, products, services or commercial activities may not be promoted without prior approval.",
        "Grit Fit's training environment is built around its own coaching and programming systems. Please respect the role of Grit Fit coaches and staff.",
      ],
    },
    {
      title: "Parking",
      items: [
        "Park only in designated areas. Do not block entrances, exits, access points or other vehicles.",
        "Do not leave valuables visible or unattended inside vehicles. Grit Fit is not responsible for valuables left in vehicles.",
        "Respect designated areas for staff, service providers and guests.",
        "Keep the parking area clean and drive slowly and carefully within the premises.",
      ],
    },
    {
      title: "Pantry",
      items: [
        "Keep the pantry and shared areas clean after use.",
        "Dispose of cups, packaging and food waste appropriately.",
        "Do not leave food, drinks or personal items unattended.",
        "Follow displayed food, beverage and hygiene guidelines.",
        "Food and beverages are not permitted in training or recovery zones.",
      ],
    },
  ] as ClubStandardsSection[],
};
