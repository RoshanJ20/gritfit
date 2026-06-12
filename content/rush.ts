/**
 * RUSH content. All copy is VERBATIM from "Webiste write up.xlsx" (RUSH, Peak,
 * Flow, Skillab sections). Section/format names match the source. Class
 * durations and protocols are as written in the source. Do not paraphrase.
 */

export type ClassFormat = {
  name: string;
  /** Optional one-line summary shown as the format's lead. */
  tagline?: string;
  paras: string[];
};

export type RushModel = {
  key: "peak" | "flow" | "skilllab";
  name: string;
  href: string;
  /** Verbatim lead line from the source. */
  tagline: string;
  /** How many formats sit under this model. */
  count: number;
};

export const rush = {
  eyebrow: "RUSH by Grit Fit",
  signature: "Move with Meaning",
  writeup: [
    "RUSH is our signature training system.",
    "One day you’re chasing pace and fighting fatigue. The next you’re under the bar, building strength.",
    "Then you’re learning a new skill, finding range through movement, or slowing down long enough to recover and come back stronger.",
    "Every class has a purpose. Every session fits the bigger picture.",
    "Push hard. Move freely. Recover well. Come back better.",
  ],
  closer: "This is RUSH.",
  models: [
    {
      key: "peak",
      name: "Peak",
      href: "/rush/peak",
      tagline: "Built for strength. Built for endurance. Built to last.",
      count: 3,
    },
    {
      key: "flow",
      name: "Flow",
      href: "/rush/flow",
      tagline:
        "A space to reset, rebuild, and reconnect through breath, movement, and mindfulness.",
      count: 4,
    },
    {
      key: "skilllab",
      name: "Skillab",
      href: "/rush/skilllab",
      tagline:
        "A performance training system built on combat, calisthenics, movement, foundation, and running.",
      count: 7,
    },
  ] as RushModel[],
};

export const peak = {
  name: "Peak",
  tagline: "Built for strength. Built for endurance. Built to last.",
  formats: [
    {
      name: "Endure",
      paras: [
        "ENDURE is a 45-minute conditioning class built to push your aerobic engine and expand your endurance under real effort.",
        "Every session blends aerobic base work, threshold training, anaerobic intervals, and minimal load strength to create a complete conditioning system—simple, brutal, effective.",
        "Designed for all levels, ENDURE teaches you how to hold pace, handle fatigue, and keep moving when it gets uncomfortable.",
        "Build capacity. Stay composed. Go further.",
      ],
    },
    {
      name: "Strength Build",
      paras: [
        "Strength Build is a 45-minute resistance training session built to make you stronger, move better, and stay resilient.",
        "We focus on compound strength, controlled isolation work, and targeted accessories that build real performance—not just aesthetics.",
        "Every session is part of a 6-week cycle designed with purpose. Structured. Challenging. Progressive. You track the work, you earn the progress.",
        "Train with intent. Build strength that lasts.",
      ],
    },
    {
      name: "Hybrid",
      paras: [
        "HYBRID is a 45-minute session where strength meets conditioning.",
        "Built on strength work and ENDURE conditioning principles, each class blends resistance training with aerobic and anaerobic effort to build power, capacity, and control under fatigue.",
        "Strong. Fast. Unstoppable.",
      ],
    },
  ] as ClassFormat[],
};

export const flow = {
  name: "Flow",
  intro: [
    "FLOW is a space to reset, rebuild, and reconnect through breath, movement, and mindfulness.",
    "A curated mix of yoga, movement, and dance designed to balance your training, restore your body, and sharpen your mind.",
  ],
  formats: [
    {
      name: "Authentic Yoga",
      paras: [
        "Authentic yoga consists of fluid, mindful movement guided by breath—designed to bring you back to yourself.",
        "From foundational postures to creative sequencing, every class offers a different experience of movement, stillness, and awareness.",
        "We begin in stillness. We return to stillness. In between, we move with intention.",
        "Leave grounded. Feel open. Mind clear.",
      ],
    },
    {
      name: "Authentic YogaX",
      paras: [
        "A vigorous vinyasa-style practice designed to take your yoga to the next level—physically and mentally.",
        "Through breath and movement, you’ll lengthen the body, build internal heat, and find balance in motion.",
        "Expect to sweat.",
      ],
    },
    {
      name: "Ground",
      paras: [
        "This practice works deep stabiliser muscles, improves joint space and mobility, and restores connective tissue health through gentle movement, deep stretching, and longer holds. Soft balls and rollers are used to release tension, improve fascial tone, and support full-body recovery.",
        "Sessions move slowly and intentionally, blending breath-led movement with moments of stillness to create a moving meditation that enhances flexibility, balance, and body awareness.",
        "It improves strength and athletic performance by building a more mobile, resilient, and balanced body.",
        "Release tension. Restore balance. Move better, longer.",
      ],
    },
    {
      name: "Move",
      paras: [
        "A high-energy dance class blending freestyle movement with fitness-driven training.",
        "Built on music, rhythm, and expression, this session pushes you to move freely, sweat hard, and train with intensity.",
        "Expect energy. Expect sweat. Move without limits.",
      ],
    },
  ] as ClassFormat[],
};

export const skillab = {
  name: "Skillab",
  intro: [
    "SKILLAB is a performance training system built on combat, calisthenics, movement, foundation, and running.",
  ],
  formats: [
    {
      name: "Fight",
      paras: [
        "A skill-based boxing and MMA class built to sharpen technique, movement, and control. Open to all levels.",
        "We focus on fundamentals, combinations, footwork, and defensive skills, blended with conditioning and pad work to build real fight capability.",
        "Every session is structured, high-energy, and progressive—coaching you through skill, intensity, and precision under pressure.",
        "Expect sweat, focus, and challenge. Leave sharper, stronger, and more confident in how you move and carry yourself.",
      ],
    },
    {
      name: "Barlethics",
      paras: [
        "A skill-based calisthenics class built to develop relative strength, movement control, and skill progression under fatigue using only bodyweight training.",
        "Open to all levels—from beginners building foundations to advanced athletes refining performance.",
      ],
    },
    {
      name: "Foundation",
      paras: [
        "FOUNDATION is a coaching-led class focused on teaching form, technique, and movement fundamentals for complex training and compound lifts. It builds a strong base for long-term performance in a group setting.",
        "It is for anyone who wants to learn, refine, or rebuild their training—beginners to experienced lifters.",
        "We break down key movement patterns with clear coaching cues, progressions, and corrections, focusing on quality over intensity.",
        "Expect learning and detail. Leave moving better, lifting with confidence, and built on strong fundamentals.",
      ],
    },
    {
      name: "Movement",
      paras: [
        "MOVEMENT is a class designed to improve how you move, not just how you train.",
        "Using a variety of equipment and free weights, we work through extended ranges of motion, slow eccentric loading, isometrics, and corrective exercises to build stronger, more resilient tissue and better movement quality.",
        "This class is for all levels—anyone who wants to move better, feel better, and build long-term athletic capacity.",
        "Expect control, time under tension, and deep soreness. Leave feeling stronger, more athletic, and moving with ease.",
      ],
    },
    {
      name: "Forge",
      paras: [
        "FORGE is a strength-focused class built to develop the specific movement patterns needed for calisthenics.",
        "Using a mix of weights and resistance training, we build pushing, pulling, core, and stability strength that carries directly into bodyweight performance.",
        "This class is for all levels.",
        "Expect focused work, progressive overload, and purposeful training.",
      ],
    },
    {
      name: "ForceX",
      paras: [
        "FORCEX is a combat-inspired performance class built to develop endurance, explosive strength, and real-world power.",
        "We combine conditioning, power work, and fight-based movement to build speed, resilience, and control under fatigue.",
        "This class is for all levels.",
        "Expect intensity, focus, and high output. Leave stronger, faster, and built for performance.",
      ],
    },
    {
      name: "Running Division",
      paras: [
        "Whether you’re just starting out or already chasing PBs, the Running Division is built for every level. We train pace. We build endurance. We sharpen on the track and progress through structured sessions that make every run count.",
        "We start together at the club. We warm up as one. But once we hit the road—that’s where work happens.",
        "Run smarter. Run stronger. Run together.",
      ],
    },
  ] as ClassFormat[],
};
