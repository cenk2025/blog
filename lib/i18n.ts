export const locales = ["en", "fi"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export type Dictionary = {
  meta: {
    title: string;
    description: string;
  };
  nav: {
    home: string;
    blog: string;
    categories: string;
    about: string;
    contact: string;
  };
  hero: {
    name: string;
    intro: string;
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  home: {
    featuredTitle: string;
    featuredSubtitle: string;
    latestTitle: string;
    latestSubtitle: string;
    categoriesTitle: string;
    categoriesSubtitle: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
  };
  blog: {
    title: string;
    subtitle: string;
    readArticle: string;
    minRead: string;
  };
  article: {
    by: string;
    published: string;
    share: string;
    backToBlog: string;
    shareCopied: string;
    copyLink: string;
  };
  categoriesPage: {
    title: string;
    subtitle: string;
  };
  aboutPage: {
    title: string;
    description: string;
    stats: {
      years: string;
      essays: string;
      readers: string;
    };
  };
  contactPage: {
    title: string;
    description: string;
    emailLabel: string;
    locationLabel: string;
    collaborationLabel: string;
    emailValue: string;
    locationValue: string;
    collaborationValue: string;
  };
  footer: {
    rights: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "Futureframe | Personal Technology Blog",
      description:
        "A futuristic personal technology blog about AI, software engineering, and future trends."
    },
    nav: {
      home: "Home",
      blog: "Blog",
      categories: "Categories",
      about: "About",
      contact: "Contact"
    },
    hero: {
      name: "Cenk Yakinlar",
      intro:
        "I write about intelligent systems, modern software craft, and the ideas shaping tomorrow.",
      tagline: "Exploring the Future of Technology, AI, and Software.",
      ctaPrimary: "Read Latest Articles",
      ctaSecondary: "Explore Categories"
    },
    home: {
      featuredTitle: "Featured Articles",
      featuredSubtitle: "Selected deep dives into high-impact technologies.",
      latestTitle: "Latest Blog Posts",
      latestSubtitle: "Fresh writing on development, tools, and the AI era.",
      categoriesTitle: "Technology Categories",
      categoriesSubtitle: "Navigate by topic and discover focused insights.",
      newsletterTitle: "Join the Futureframe Newsletter",
      newsletterSubtitle:
        "One curated briefing each week with practical ideas and future-facing trends.",
      newsletterPlaceholder: "Your email address",
      newsletterButton: "Subscribe"
    },
    blog: {
      title: "Technology Blog",
      subtitle:
        "Thoughtful articles on artificial intelligence, software architecture, and future technologies.",
      readArticle: "Read article",
      minRead: "min read"
    },
    article: {
      by: "By",
      published: "Published",
      share: "Share",
      backToBlog: "Back to blog",
      shareCopied: "Link copied",
      copyLink: "Copy link"
    },
    categoriesPage: {
      title: "Categories",
      subtitle:
        "A structured overview of the ideas, tools, and trends covered across the blog."
    },
    aboutPage: {
      title: "About",
      description:
        "Futureframe is a personal publication focused on building better software and understanding how AI changes the way we work, learn, and create.",
      stats: {
        years: "Years in software",
        essays: "Technical essays",
        readers: "Monthly readers"
      }
    },
    contactPage: {
      title: "Contact",
      description:
        "Open to speaking, consulting, and collaborative product experiments.",
      emailLabel: "Email",
      locationLabel: "Location",
      collaborationLabel: "Collaboration",
      emailValue: "hello@futureframe.dev",
      locationValue: "Helsinki, Finland",
      collaborationValue: "Product strategy, AI prototyping, keynote speaking"
    },
    footer: {
      rights: "All rights reserved."
    }
  },
  fi: {
    meta: {
      title: "Futureframe | Henkilokohtainen Teknologiablogi",
      description:
        "Futuristinen teknologiablogi tekoalysta, ohjelmistokehityksesta ja tulevaisuuden trendeista."
    },
    nav: {
      home: "Koti",
      blog: "Blogi",
      categories: "Kategoriat",
      about: "Tietoa",
      contact: "Yhteys"
    },
    hero: {
      name: "Cenk Yakinlar",
      intro:
        "Kirjoitan alykkaista jarjestelmista, modernista ohjelmistokehityksesta ja ideoista, jotka muovaavat huomista.",
      tagline: "Tutkimassa teknologian, tekoalyn ja ohjelmistojen tulevaisuutta.",
      ctaPrimary: "Lue uusimmat artikkelit",
      ctaSecondary: "Tutki kategorioita"
    },
    home: {
      featuredTitle: "Nostetut artikkelit",
      featuredSubtitle: "Valitut syva-analyysit vaikuttavista teknologioista.",
      latestTitle: "Uusimmat julkaisut",
      latestSubtitle: "Tuoreita kirjoituksia kehityksesta, tyokaluista ja tekoalyajasta.",
      categoriesTitle: "Teknologiakategoriat",
      categoriesSubtitle: "Loyda sisallot aiheen mukaan ja syvenna ymmarrysta.",
      newsletterTitle: "Liity Futureframe-uutiskirjeeseen",
      newsletterSubtitle:
        "Yksi kuratoitu viikkokooste kaytannon ideoista ja tulevaisuuden trendeista.",
      newsletterPlaceholder: "Sahkopostiosoitteesi",
      newsletterButton: "Tilaa"
    },
    blog: {
      title: "Teknologiablogi",
      subtitle:
        "Ajatuksellisia artikkeleita tekoalysta, ohjelmistoarkkitehtuurista ja tulevaisuuden teknologiasta.",
      readArticle: "Lue artikkeli",
      minRead: "min lukuaika"
    },
    article: {
      by: "Kirjoittaja",
      published: "Julkaistu",
      share: "Jaa",
      backToBlog: "Takaisin blogiin",
      shareCopied: "Linkki kopioitu",
      copyLink: "Kopioi linkki"
    },
    categoriesPage: {
      title: "Kategoriat",
      subtitle:
        "Rakenteinen nakyma blogin teemoihin, tyokaluihin ja tulevaisuuden ilmiihin."
    },
    aboutPage: {
      title: "Tietoa",
      description:
        "Futureframe on henkilokohtainen julkaisu, joka keskittyy parempien ohjelmistojen rakentamiseen ja siihen, miten tekoaly muuttaa tapaamme tyoskennella, oppia ja luoda.",
      stats: {
        years: "Vuotta ohjelmistoalalla",
        essays: "Teknista esseeta",
        readers: "Kuukausilukijaa"
      }
    },
    contactPage: {
      title: "Yhteys",
      description:
        "Avoinna puhekeikoille, konsultoinnille ja yhteisille tuotekokeiluille.",
      emailLabel: "Sahkoposti",
      locationLabel: "Sijainti",
      collaborationLabel: "Yhteistyo",
      emailValue: "hello@futureframe.dev",
      locationValue: "Helsinki, Suomi",
      collaborationValue: "Tuotestrategia, tekoalyprototyypit, keynote-puheenvuorot"
    },
    footer: {
      rights: "Kaikki oikeudet pidatetaan."
    }
  }
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
