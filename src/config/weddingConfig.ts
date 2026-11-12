export interface WeddingEvent {
  id: 'reception' | 'wedding';
  badge: string;
  title: string;
  theme: 'burgundy' | 'ivory';
  dateLabel: string;
  timeLabel: string;
  timeHeading: string;
  venueName: string;
  venueLines: string[];
  fullAddress: string;
  description: string;
  calendarStartIso: string;
  calendarEndIso: string;
  mapEmbedQuery: string;
  directionsUrl: string;
  travelPlaceholder: {
    parking: string;
    travel: string;
  };
}

export const weddingConfig = {
  couple: {
    groomFirst: 'Bharath',
    groomFull: 'Bharath Kumar',
    brideFirst: 'Mounika',
    brideFull: 'Mounika',
    combined: 'BHARATH & MOUNIKA',
    monogram: 'B & M',
  },

  audio: {
    youtubeVideoId: 'LG6PANt6sM8',
    youtubeUrl: 'https://youtu.be/LG6PANt6sM8?si=9IcQkTTUDG5u3LK5',
    title: 'Seetha Kalyanam',
  },

  hero: {
    eyebrow: 'TOGETHER WITH THEIR FAMILIES',
    coupleHeading: 'BHARATH & MOUNIKA',
    tagline: 'A Beautiful Beginning, A Forever Together',
    invitationLine:
      'We joyfully invite you to celebrate our wedding and bless us as we begin a beautiful new chapter of our lives.',
    date: '22 NOVEMBER 2026',
    location: 'TIRUMALA, ANDHRA PRADESH',
    ctaLabel: 'EXPLORE OUR WEDDING',
  },

  countdown: {
    targetIso: '2026-11-22T20:48:00+05:30',
    caption: 'Every moment brings us closer to forever.',
  },

  families: {
    groom: {
      sectionTitle: "The Groom's Family",
      roleLabel: 'The Groom',
      initial: 'B',
      name: 'Bharath Kumar',
      education: 'B.Tech, M.Sc. (London)',
      parentsHeading: 'Beloved Son of',
      parents: ['Kavuturu Subramanyam (Mani)', 'Smt. Venkata Ramanamma'],
    },
    bride: {
      sectionTitle: "The Bride's Family",
      roleLabel: 'The Bride',
      initial: 'M',
      name: 'Mounika',
      education: 'M.Ch. Surgical Oncology',
      parentsHeading: 'Beloved Daughter of',
      parents: ['Sri Kadiyala Satyanarayana', 'Smt. Samrajya Lakshmi'],
      residenceHeading: 'Family Residence',
      residence: 'Sindhanuru, Sindhanuru Mandal, Raichur District.',
    },
  },

  loveStory: {
    heading: 'Two Hearts, One Beautiful Journey',
    subheading:
      'Every milestone has led us gently toward this sacred celebration of love and family.',
    chapters: [
      {
        number: 'Chapter 01',
        title: 'A Beautiful Beginning',
        description:
          'A special beginning that brought two families and two hearts together.',
      },
      {
        number: 'Chapter 02',
        title: 'A Promise of Forever',
        description:
          'A journey filled with beautiful memories, family blessings and the promise of togetherness.',
      },
      {
        number: 'Chapter 03',
        title: 'Forever Starts Here',
        description:
          'Two families, one celebration and a lifetime of happiness.',
      },
    ],
  },

  events: [
    {
      id: 'reception',
      badge: 'EVENT 01 – RECEPTION & DINNER',
      title: 'Reception & Dinner',
      theme: 'burgundy',
      dateLabel: 'Saturday, 21 November 2026',
      timeHeading: 'Time',
      timeLabel: '7:00 PM',
      venueName: 'M Convention Hall',
      venueLines: [
        'M Convention Hall,',
        'Behind Gopal Motors,',
        'Renugunta Road,',
        'Tirupati.',
      ],
      fullAddress: 'M Convention Hall, Behind Gopal Motors, Renugunta Road, Tirupati.',
      description:
        'Join us for an evening of celebration, happiness, family gatherings and dinner.',
      calendarStartIso: '2026-11-21T19:00:00+05:30',
      calendarEndIso: '2026-11-21T22:30:00+05:30',
      mapEmbedQuery: 'M Convention Hall, Renigunta Road, Tirupati, Andhra Pradesh',
      directionsUrl:
        'https://www.google.com/maps/search/?api=1&query=M+Convention+Hall+Behind+Gopal+Motors+Renugunta+Road+Tirupati',
      travelPlaceholder: {
        parking:
          'Venue parking details placeholder — update with exact valet or guest parking guidance prior to the reception.',
        travel:
          'Travel & arrival note placeholder — located along Renugunta Road in Tirupati; add landmark or shuttle notes here.',
      },
    },
    {
      id: 'wedding',
      badge: 'EVENT 02 – WEDDING CEREMONY',
      title: 'Wedding Ceremony',
      theme: 'ivory',
      dateLabel: 'Sunday, 22 November 2026',
      timeHeading: 'Muhurtam',
      timeLabel: '8:48 PM – 9:48 PM',
      venueName: 'Sri Krishnarajendra Wodeyar Kalyana Mandapam',
      venueLines: [
        'Sri Krishnarajendra Wodeyar Kalyana Mandapam,',
        'Karnataka Pravasi Souhda,',
        'M8 PV 5R3, Ring Road,',
        'Opposite Tirumala Museum,',
        'Tirumala.',
      ],
      fullAddress:
        'Sri Krishnarajendra Wodeyar Kalyana Mandapam, Karnataka Pravasi Souhda, M8 PV 5R3, Ring Road, Opposite Tirumala Museum, Tirumala.',
      description:
        'With the blessings of our families, join us as we begin our forever together.',
      calendarStartIso: '2026-11-22T20:48:00+05:30',
      calendarEndIso: '2026-11-22T21:48:00+05:30',
      mapEmbedQuery:
        'Sri Krishnarajendra Wodeyar Kalyana Mandapam, Karnataka Pravasi Soudha, Ring Road, Opposite Tirumala Museum, Tirumala',
      directionsUrl:
        'https://www.google.com/maps/search/?api=1&query=Sri+Krishnarajendra+Wodeyar+Kalyana+Mandapam+Karnataka+Pravasi+Souhda+Ring+Road+Tirumala',
      travelPlaceholder: {
        parking:
          'Venue parking details placeholder — update with Tirumala hill parking and guest arrival guidance.',
        travel:
          'Travel & accommodation note placeholder — situated opposite Tirumala Museum on Ring Road; add guest transit notes here.',
      },
    },
  ] satisfies WeddingEvent[],

  familyClosingInvite: {
    heading: 'With Love and Best Wishes',
    hosts: 'Smt. Alekya – Sri Chetan Sai',
    addressLines: [
      'Bharath Nagar,',
      'Rajampeta,',
      'Rajampeta Mandal,',
      'Kadapa District.',
    ],
  },

  footer: {
    couple: 'BHARATH & MOUNIKA',
    subtitle: 'A New Chapter Begins – 22 November 2026',
    thankYou: 'Thank you for being a part of our celebration.',
    signOff: 'With Love and Gratitude.',
  },
};
