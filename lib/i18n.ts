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
    eyebrow: string;
    title: string;
    intro: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  home: {
    featuredTitle: string;
    featuredSubtitle: string;
    latestTitle: string;
    latestSubtitle: string;
    allPosts: string;
    categoriesTitle: string;
    categoriesSubtitle: string;
    authorEyebrow: string;
    authorTitle: string;
    authorText: string;
    authorCta: string;
    newsletterTitle: string;
    newsletterSubtitle: string;
    newsletterPlaceholder: string;
    newsletterButton: string;
  };
  blog: {
    eyebrow: string;
    title: string;
    subtitle: string;
    readArticle: string;
    minRead: string;
    empty: string;
  };
  article: {
    by: string;
    published: string;
    share: string;
    backToBlog: string;
    shareCopied: string;
    copyLink: string;
    moreTitle: string;
  };
  categoriesPage: {
    eyebrow: string;
    title: string;
    subtitle: string;
    empty: string;
    posts: string;
  };
  aboutPage: {
    eyebrow: string;
    title: string;
    description: string;
    body: string[];
    stats: {
      skills: string;
      occupations: string;
      languages: string;
    };
    cta: string;
  };
  contactPage: {
    eyebrow: string;
    title: string;
    description: string;
    emailLabel: string;
    locationLabel: string;
    collaborationLabel: string;
    emailValue: string;
    locationValue: string;
    collaborationValue: string;
    cta: string;
  };
  notFound: {
    title: string;
    text: string;
    cta: string;
  };
  footer: {
    tagline: string;
    rights: string;
    product: string;
  };
};

export const dictionaries: Record<Locale, Dictionary> = {
  en: {
    meta: {
      title: "VOON IQ Blog | Cenk Yakinlar",
      description:
        "Cenk Yakinlar writes about AI, skills and the future of work, and about building VOON IQ in Jyväskylä, Finland."
    },
    nav: {
      home: "Home",
      blog: "Articles",
      categories: "Topics",
      about: "About",
      contact: "Contact"
    },
    hero: {
      eyebrow: "VOON IQ Blog",
      title: "Thoughts on AI, skills and the future of work.",
      intro:
        "I'm Cenk Yakinlar, founder of VOON IQ. I write about intelligent systems, learning and what it takes to build products that make skills visible.",
      ctaPrimary: "Read the latest",
      ctaSecondary: "Browse topics"
    },
    home: {
      featuredTitle: "Featured.",
      featuredSubtitle: "Selected essays worth your time.",
      latestTitle: "Latest articles.",
      latestSubtitle: "Fresh writing on AI, learning and building VOON IQ.",
      allPosts: "All articles",
      categoriesTitle: "Explore by topic.",
      categoriesSubtitle: "Find the writing that matters to you.",
      authorEyebrow: "About the author",
      authorTitle: "Skills made visible.",
      authorText:
        "VOON IQ is an AI startup from Jyväskylä. This blog is where I think out loud about the products we build — SkillPath, Talent Factory and BizPulse — and the ideas behind them.",
      authorCta: "Read more",
      newsletterTitle: "New articles, straight to your inbox.",
      newsletterSubtitle: "One short email when something new is published. No spam.",
      newsletterPlaceholder: "Your email address",
      newsletterButton: "Subscribe"
    },
    blog: {
      eyebrow: "Articles",
      title: "Everything I've written.",
      subtitle: "Essays on artificial intelligence, skills, learning and the future of work.",
      readArticle: "Read article",
      minRead: "min read",
      empty: "No articles yet."
    },
    article: {
      by: "By",
      published: "Published",
      share: "Share this article",
      backToBlog: "All articles",
      shareCopied: "Link copied",
      copyLink: "Copy link",
      moreTitle: "Keep reading."
    },
    categoriesPage: {
      eyebrow: "Topics",
      title: "Explore by topic.",
      subtitle: "The ideas, tools and trends covered across the blog.",
      empty: "No articles in this topic yet.",
      posts: "articles"
    },
    aboutPage: {
      eyebrow: "About",
      title: "Skills made visible.",
      description:
        "This is the blog of Cenk Yakinlar, founder and CEO of VOON IQ — an AI startup from Jyväskylä, Finland.",
      body: [
        "I write about how artificial intelligence changes the way we work, learn and create — and about what I learn while building VOON IQ.",
        "Our products help people and organisations see skills more clearly: SkillPath maps skills to occupations and training paths, Talent Factory turns CVs into real stories, and BizPulse surfaces business signals."
      ],
      stats: {
        skills: "skills",
        occupations: "occupations",
        languages: "languages"
      },
      cta: "Visit voon.fi"
    },
    contactPage: {
      eyebrow: "Contact",
      title: "Let's talk.",
      description: "Open to speaking, consulting and product collaborations.",
      emailLabel: "Email",
      locationLabel: "Location",
      collaborationLabel: "Collaboration",
      emailValue: "cenk.yakinlar@hotmail.com",
      locationValue: "Jyväskylä, Finland",
      collaborationValue: "Product strategy, AI prototyping, keynote speaking",
      cta: "Send an email"
    },
    notFound: {
      title: "Page not found.",
      text: "The content you are looking for does not exist or has moved.",
      cta: "Back to home"
    },
    footer: {
      tagline: "Skills made visible.",
      rights: "All rights reserved.",
      product: "A VOON IQ publication"
    }
  },
  fi: {
    meta: {
      title: "VOON IQ Blogi | Cenk Yakinlar",
      description:
        "Cenk Yakinlar kirjoittaa tekoälystä, osaamisesta ja työn tulevaisuudesta sekä VOON IQ:n rakentamisesta Jyväskylässä."
    },
    nav: {
      home: "Etusivu",
      blog: "Artikkelit",
      categories: "Aiheet",
      about: "Tietoa",
      contact: "Yhteystiedot"
    },
    hero: {
      eyebrow: "VOON IQ Blogi",
      title: "Ajatuksia tekoälystä, osaamisesta ja työn tulevaisuudesta.",
      intro:
        "Olen Cenk Yakinlar, VOON IQ:n perustaja. Kirjoitan älykkäistä järjestelmistä, oppimisesta ja siitä, mitä vaatii rakentaa tuotteita, jotka tuovat osaamisen näkyviin.",
      ctaPrimary: "Lue uusimmat",
      ctaSecondary: "Selaa aiheita"
    },
    home: {
      featuredTitle: "Nostot.",
      featuredSubtitle: "Valitut kirjoitukset, joihin kannattaa käyttää hetki.",
      latestTitle: "Uusimmat artikkelit.",
      latestSubtitle: "Tuoreita kirjoituksia tekoälystä, oppimisesta ja VOON IQ:n rakentamisesta.",
      allPosts: "Kaikki artikkelit",
      categoriesTitle: "Selaa aiheittain.",
      categoriesSubtitle: "Löydä sinua kiinnostavat kirjoitukset.",
      authorEyebrow: "Kirjoittajasta",
      authorTitle: "Osaaminen näkyviin.",
      authorText:
        "VOON IQ on jyväskyläläinen tekoälystartup. Tässä blogissa ajattelen ääneen tuotteista, joita rakennamme – SkillPath, Talent Factory ja BizPulse – ja niiden taustalla olevista ideoista.",
      authorCta: "Lue lisää",
      newsletterTitle: "Uudet artikkelit suoraan sähköpostiisi.",
      newsletterSubtitle: "Yksi lyhyt viesti, kun jotain uutta julkaistaan. Ei roskapostia.",
      newsletterPlaceholder: "Sähköpostiosoitteesi",
      newsletterButton: "Tilaa"
    },
    blog: {
      eyebrow: "Artikkelit",
      title: "Kaikki kirjoitukset.",
      subtitle: "Kirjoituksia tekoälystä, osaamisesta, oppimisesta ja työn tulevaisuudesta.",
      readArticle: "Lue artikkeli",
      minRead: "min lukuaika",
      empty: "Ei vielä artikkeleita."
    },
    article: {
      by: "Kirjoittaja",
      published: "Julkaistu",
      share: "Jaa artikkeli",
      backToBlog: "Kaikki artikkelit",
      shareCopied: "Linkki kopioitu",
      copyLink: "Kopioi linkki",
      moreTitle: "Lue myös."
    },
    categoriesPage: {
      eyebrow: "Aiheet",
      title: "Selaa aiheittain.",
      subtitle: "Blogin teemat, työkalut ja ilmiöt yhdellä silmäyksellä.",
      empty: "Tässä aiheessa ei ole vielä artikkeleita.",
      posts: "artikkelia"
    },
    aboutPage: {
      eyebrow: "Tietoa",
      title: "Osaaminen näkyviin.",
      description:
        "Tämä on Cenk Yakinlarin blogi. Olen VOON IQ:n perustaja ja toimitusjohtaja – VOON IQ on tekoälystartup Jyväskylästä.",
      body: [
        "Kirjoitan siitä, miten tekoäly muuttaa tapaamme tehdä työtä, oppia ja luoda – ja siitä, mitä opin VOON IQ:ta rakentaessani.",
        "Tuotteemme auttavat ihmisiä ja organisaatioita näkemään osaamisen selkeämmin: SkillPath yhdistää taidot ammatteihin ja koulutuspolkuihin, Talent Factory tekee CV:stä todellisen tarinan ja BizPulse nostaa esiin liiketoiminnan signaalit."
      ],
      stats: {
        skills: "taitoa",
        occupations: "ammattia",
        languages: "kieltä"
      },
      cta: "Tutustu voon.fi"
    },
    contactPage: {
      eyebrow: "Yhteystiedot",
      title: "Jutellaan.",
      description: "Avoinna puheenvuoroille, konsultoinnille ja tuoteyhteistyölle.",
      emailLabel: "Sähköposti",
      locationLabel: "Sijainti",
      collaborationLabel: "Yhteistyö",
      emailValue: "cenk.yakinlar@hotmail.com",
      locationValue: "Jyväskylä",
      collaborationValue: "Tuotestrategia, tekoälyprototyypit, keynote-puheenvuorot",
      cta: "Lähetä sähköpostia"
    },
    notFound: {
      title: "Sivua ei löytynyt.",
      text: "Etsimääsi sisältöä ei ole olemassa tai se on siirretty.",
      cta: "Takaisin etusivulle"
    },
    footer: {
      tagline: "Osaaminen näkyviin.",
      rights: "Kaikki oikeudet pidätetään.",
      product: "VOON IQ -julkaisu"
    }
  }
};

export function isValidLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries[defaultLocale];
}
