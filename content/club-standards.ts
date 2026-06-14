/**
 * Club Standards & Policies. VERBATIM source text grouped into sections.
 * (Two source typos corrected: "recvoery"→"recovery zone"; "the" added before
 * "front desk". No other edits.)
 */

export type ClubStandardsSection = {
  title: string;
  items: string[];
};

export const clubStandards = {
  title: "Club Standards & Policies",
  sections: [
    {
      title: "Locker Rooms",
      items: [
        "Limit of 2 towels per visit for the recovery zone.",
        "Always secure your locker and avoid leaving valuables unattended.",
        "Please tidy up after yourself by removing towels, trash, and personal items.",
        "Respect others' privacy: do not take photos that include other members or disrupt their experience. Phone calls, video chats, and speakerphone use are not allowed.",
        "Sauna & steam room: shoes and electronic devices are prohibited. Store all devices in your locker. A towel is required for seating, and full towel coverage must be maintained at all times.",
      ],
    },
    {
      title: "Club",
      items: [
        "Be mindful of the space and equipment you use. Avoid spending extended time on your phone, occupying equipment, or lingering on the turf so others can enjoy the space as well.",
        "Bare feet, socks, and athletic shoes are all welcome. Athletic shoes are recommended for cardio equipment.",
        "Please wipe down and return all equipment after use. Treat equipment with care and respect.",
        "Ball slams are only permitted in designated areas.",
        "Speakerphone use is not allowed anywhere in the Club. Please keep voice levels considerate during calls.",
        "Members and guests may not provide personal training, online coaching, or promote third-party businesses within the Club.",
      ],
    },
    {
      title: "Membership Age Requirements",
      items: [
        "Ages 8–18: A parent or legal guardian must sign both the Club Liability Waiver and Membership Agreement for any minor using the Club. An active membership or valid day pass is required.",
        "Members under 14 must be accompanied and supervised by a parent, legal guardian, or approved trainer at all times while in the Club. The minor must be actively participating in activities with the supervising adult in order to access Club facilities.",
      ],
    },
    {
      title: "Minors",
      items: [
        "We do not currently offer childcare services. If a child is brought to the Club, pre-arranged adult supervision is required, and the child must remain in the café/lobby area unless they meet the Membership Age Requirements above.",
        "Children are not permitted beyond the Open Gym doors unless they qualify under the Membership Age Requirements listed above.",
      ],
    },
    {
      title: "Photos & Filming",
      items: [
        "Photography, videography, and professional camera equipment, including tripods, are permitted only with prior consent from Club management. For professional inquiries, please contact the front desk.",
        "Please respect the privacy of others by avoiding photos, videos, or audio recordings of other members unless participating together.",
        "We appreciate your efforts to help us maintain our elevated standards. If you have any questions, suggestions or concerns, please reach out to your Grit Team.",
      ],
    },
  ] as ClubStandardsSection[],
};
