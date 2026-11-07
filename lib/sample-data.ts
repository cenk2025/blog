// Local preview data, used only when Supabase env vars are missing (e.g. a fresh clone).
// Mirrors the shape of the live posts on blog.voon.fi; production always reads Supabase.
import type { BlogPost, Category } from "@/lib/types";

const supabaseImage = (name: string) =>
  `https://dfrtwkykskerqpzhfdnk.supabase.co/storage/v1/object/public/blog-images/posts/${name}`;

export const sampleCategories: (Category & { id: string })[] = [
  {
    id: "cat-ai",
    key: "tekoaly",
    icon: "Sparkles",
    translations: {
      fi: { name: "Tekoäly", description: "Miten tekoäly muuttaa työtä, oppimista ja päätöksentekoa." },
      en: { name: "AI", description: "How AI changes work, learning and decision-making." }
    }
  },
  {
    id: "cat-skills",
    key: "osaaminen",
    icon: "BookOpenCheck",
    translations: {
      fi: { name: "Osaaminen", description: "Ajatuksia oppimisesta, luovuudesta ja osaamisen näkyvyydestä." },
      en: { name: "Skills", description: "Thoughts on learning, creativity and making skills visible." }
    }
  },
  {
    id: "cat-build",
    key: "rakentaminen",
    icon: "Code2",
    translations: {
      fi: { name: "VOON IQ:n rakentaminen", description: "Tuotteiden taustat: Talent Factory, BizPulse ja SkillPath." },
      en: { name: "Building VOON IQ", description: "Behind the products: Talent Factory, BizPulse and SkillPath." }
    }
  }
];

export const samplePosts: BlogPost[] = [
  {
    slug: "I-Am-a-Genius",
    coverImage: "/images/covers/genius.jpg",
    author: "Cenk Yakinlar",
    publishedAt: "2026-03-15T09:30:15Z",
    readingTime: 5,
    tags: ["Osaaminen", "Identiteetti"],
    featured: true,
    category: "cat-skills",
    translations: {
      fi: {
        title: "”Olen nero” 🧠🤖",
        excerpt:
          "Brittiläinen lääkäri kertoi uudesta trendistä: nuoret tulevat vastaanotolle sanoen uskovansa olevansa neroja ja pyytävät todisteita siitä.",
        content: [
          "Nykyajan neron nälkä",
          "Äskettäin eräässä pitkäikäisyyttä käsittelevässä YouTube-keskustelussa brittiläinen lääkäri mainitsi jotain, joka todella herätti huomioni. Hän kertoi nähneensä viime vuosina epätavallisen uuden trendin: nuoret tulevat hänen luokseen sanoen uskovansa olevansa neroja ja pyytäen todisteita siitä.",
          "Hän lisäsi myös, että yhä useammat vanhemmat väittävät nyt lapsiaan ”lahjakkaiksi” tai ”neron tasoisiksi”.",
          "Se sai minut pohtimaan syvällisesti: miksi niin moni haluaa nykyään tulla nähdyksi nerona?"
        ]
      },
      en: {
        title: "“I Am a Genius” 🧠🤖",
        excerpt:
          "A British doctor described a new trend: young people coming to him saying they believe they are geniuses and asking for proof of it.",
        content: [
          "Recently, in a YouTube conversation about longevity, a British doctor mentioned something that truly caught my attention. He said that in recent years, he has been seeing an unusual new trend — young people coming to him saying they believe they are geniuses and asking for proof of it.",
          "He also added that more and more parents now claim that their children are “gifted” or “genius-level.”",
          "That made me wonder deeply: why do so many people today want to be seen as a genius?"
        ]
      }
    }
  },
  {
    slug: "Talent-Factory",
    coverImage: "/images/covers/talent-factory.jpg",
    author: "Cenk Yakinlar",
    publishedAt: "2026-03-14T12:16:57Z",
    readingTime: 5,
    tags: ["Talent Factory", "Rekrytointi"],
    featured: true,
    category: "cat-build",
    translations: {
      fi: {
        title: "Talent Factory",
        excerpt:
          "Sovellusta rakentaessani kysyin itseltäni yhtä asiaa: kuvaako CV todella ihmistä – vai onko se vain täytetty asiakirja?",
        content: [
          "Olen jo jonkin aikaa kehittänyt alustaa, jonka koen nyt olevan valmis jaettavaksi: **Talent Factory**.",
          "Sovellusta rakentaessani kysyin itseltäni yhtä asiaa:\nKuvaako CV todella ihmistä – vai onko se vain täytetty asiakirja?",
          "Useimmiten vastaus oli jälkimmäinen.\nTalent Factory syntyi juuri tästä havainnosta."
        ]
      },
      en: {
        title: "Talent Factory",
        excerpt:
          "While building this application, I asked myself one question: does a CV truly portray a person – or is it just a filled-out document?",
        content: [
          "While building this application, I asked myself one crucial question:\nDoes a CV truly portray a person – or is it just a filled-out document?",
          "More often than not, the answer was the latter.\nTalent Factory was born from this exact observation."
        ]
      }
    }
  },
  {
    slug: "The-Joy-of-Feeling-St-pid",
    coverImage: "/images/covers/feeling-stupid.jpg",
    author: "Cenk Yakinlar",
    publishedAt: "2026-03-13T06:23:13Z",
    readingTime: 5,
    tags: ["Oppiminen", "Luovuus"],
    featured: false,
    category: "cat-skills",
    translations: {
      fi: {
        title: "The Joy of Feeling St*pid",
        excerpt:
          "“Se hetki, jolloin tunnet itsesi tyhmäksi, on hetki jolloin oppiminen alkaa.” Juuri tältä luova työskentely usein tuntuu.",
        content: [
          "Luin jokin aika sitten lauseen:",
          "“Se hetki, jolloin tunnet itsesi tyhmäksi, on hetki jolloin oppiminen alkaa.”",
          "Pysähdyin sen äärelle.\nSillä juuri tältä luova työskentely usein tuntuu."
        ]
      },
      en: {
        title: "The Joy of Feeling St*pid",
        excerpt:
          "“The moment you feel stupid is the moment learning begins.” This is often exactly what creative work feels like.",
        content: [
          "Some time ago, I came across a sentence:",
          "“The moment you feel stupid is the moment learning begins.”",
          "I paused to reflect on it.\nBecause this is often exactly what creative work feels like."
        ]
      }
    }
  },
  {
    slug: "In-the-Near-Future",
    coverImage: supabaseImage("in-the-near-future-cover.png"),
    author: "Cenk Yakinlar",
    publishedAt: "2026-03-09T18:16:59Z",
    readingTime: 5,
    tags: ["Tekoäly", "Työn tulevaisuus"],
    featured: true,
    category: "cat-ai",
    translations: {
      fi: {
        title: "Lähitulevaisuudessa kaikkien ammattien loppuun lisätään sana \"insinööritiede\". Miksi?",
        excerpt:
          "Perinteiset ammattien määritelmät, sellaisina kuin ne tänään tunnemme, ovat pian historiaa.",
        content: [
          "🚀 Lähitulevaisuudessa kaikkien ammattien loppuun lisätään sana \"insinööritiede\". Miksi?\nKun pohdin viimeaikaisia teknologisia edistysaskelia ja erityisesti sitä, kuinka tekoäly muuttaa perinpohjaisesti tapaamme tehdä työtä, mieleeni piirtyy selkeä futuristinen kuva.",
          "🔬 Jokainen ammattilainen on \"järjestelmäinsinööri\"\nUskon, että ei niin kaukaisessa tulevaisuudessa kaikkien ammattien loppuun lisätään näkymätön (tai ehkä jopa näkyvä) \"insinööritiede\"-pääte."
        ]
      },
      en: {
        title: "In the Near Future, \"Engineering\" Will Be Added to Every Job Title. Here's Why.",
        excerpt:
          "The classic definitions of \"professions\" as we know them today will soon be history.",
        content: [
          "🚀 In the Near Future, \"Engineering\" Will Be Added to Every Job Title. Here's Why.\nAs I reflect on recent technological advancements and how Artificial Intelligence is radically transforming the way we work, a very clear, futuristic picture comes to mind.",
          "🔬 Every Professional Will Become a \"Systems Engineer\"\nI believe that in the not-so-distant future, an invisible (or perhaps visible) \"engineering\" tag will be appended to all professions."
        ]
      }
    }
  },
  {
    slug: "bizpulse-vooniq",
    coverImage: supabaseImage("bizpulse-vooniq-cover.png"),
    author: "Cenk Yakinlar",
    publishedAt: "2026-03-09T16:19:29Z",
    readingTime: 5,
    tags: ["BizPulse", "VOON IQ"],
    featured: false,
    category: "cat-build",
    translations: {
      fi: {
        title: "BizPulse",
        excerpt:
          "VOON IQ ei ole pelkkä idea. Se sisältää kymmeniä käyttövalmiita digitaalisia ratkaisuja, jotka voidaan ottaa käyttöön heti.",
        content: [
          "Tänään on syntymäpäiväni 🎊\nJa vietän sen tietokoneen ääressä työskennellen. 🐝",
          "Sillä olen pitkään rakentanut visiota nimeltä **VOON IQ**.",
          "VOON IQ ei ole pelkkä idea.\nSe sisältää kymmeniä käyttövalmiita digitaalisia ratkaisuja, jotka voidaan ottaa käyttöön heti."
        ]
      },
      en: {
        title: "BizPulse",
        excerpt:
          "VOON IQ is not just an idea. It already includes dozens of digital solutions that are ready to be used.",
        content: [
          "Today is my birthday.",
          "And I’m spending it working in front of my computer.",
          "Because for quite some time I have been building a vision called **VOON IQ**."
        ]
      }
    }
  }
];
