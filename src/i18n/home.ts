import type { Lang } from './ui';
import type { ServiceKey } from '../lib/quote';

export const PHONE = '+45 91 46 79 78';
export const PHONE_HREF = 'tel:+4591467978';
export const EMAIL = 'info@theboatguy.dk';
export const ADDRESS = { street: 'Bella Center', postalCode: '2300', city: 'København S', country: 'DK' };
export const HOURS = { days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '16:00' };
export const INSTAGRAM_URL = 'https://www.instagram.com/theboatguy.dk/';
export const FACEBOOK_URL = 'https://www.facebook.com/theboatguy.dk/';
// Trustpilot: paste the client's profile URL here once it exists; until then the section shows a "coming soon" card.
// Never type reviews in by hand: show real ones from Trustpilot (their TrustBox widget or exported reviews with permission).
export const TRUSTPILOT_URL = '';
// Registered company number: client supplies it in January 2027. While empty, the footer says so.
export const CVR = '';

type Copy = {
  meta: { title: string; description: string };
  nav: { services: string; process: string; work: string; about: string; faq: string; contact: string };
  cta: string;
  hero: { eyebrow: string; lines: [string, string, string]; intro: string; card: { title: string; model: string; length: string; postcode: string; go: string; hint: string }; facts: [string, string][]; photo: string };
  services: { label: string; h2: string; lead: string; items: { key: ServiceKey; title: string; text: string }[] };
  process: { label: string; h2: string; steps: [string, string][]; priceTitle: string; price: string; priceCta: string };
  work: { label: string; h2: string; lead: string; before: string; after: string; compare: string; projects: string[]; placeholderAlt: [string, string] };
  reviews: { label: string; h2: string; title: string; text: string; open: string };
  about: { label: string; h2: string; text: string; areas: string[]; photo: string };
  faq: { label: string; h2: string; items: [string, string][] };
  quote: {
    label: string;
    h2: string;
    lead: string;
    fields: Record<'name' | 'email' | 'phone' | 'model' | 'length' | 'location' | 'message', string>;
    services: string;
    condition: string;
    conditions: Record<'good' | 'average' | 'poor', string>;
    submit: string;
    subject: string;
    photos: string;
    photosHint: string;
    remove: string;
    sending: string;
    success: string;
    successLead: string;
    fail: string;
    fallback: string;
    errors: Record<'required' | 'email' | 'length' | 'services' | 'files' | 'fileType' | 'fileSize', string>;
    side: { title: string; address: string; hours: string };
  };
  footer: { tagline: string; contact: string; menu: string; social: string; rights: string; cvr: string; top: string; hours: string; area: string };
  skip: string;
  menu: string;
  menuClose: string;
  mainNav: string;
  required: string;
};

export const home: Record<Lang, Copy> = {
  da: {
    meta: {
      title: 'Bådpleje, polering og bundmaling | TheBoatGuy.dk',
      description: 'Bådpleje i Danmark, Sydsverige og Nordtyskland: gelcoat-slibning og polering, bundbehandling, bundmaling samt rengøring af båd og teak. Udført af to stiftere. Garanti på arbejdet.',
    },
    nav: { services: 'Ydelser', process: 'Sådan foregår det', work: 'Arbejde', about: 'Om os', faq: 'FAQ', contact: 'Kontakt' },
    cta: 'Få et tilbud',
    hero: {
      eyebrow: 'Danmark · Sydsverige · Nordtyskland',
      lines: ['Vi passer på din båd,', 'fra bund til dæk,', 'så du bare kan sejle.'],
      intro: 'Polering, bundbehandling og rengøring udført af os to stiftere selv. Send dine bådoplysninger, så vender vi tilbage med et forslag til arbejdet og et foreløbigt overslag.',
      card: { title: 'Få et tilbud på 1 minut', model: 'Båd, mærke og model', length: 'Længde (m)', postcode: 'Postnummer', go: 'Fortsæt', hint: 'Næste trin: kontaktformularen' },
      facts: [['11+ år', 'erfaring med bådpleje'], ['3 lande', 'Danmark, Sydsverige, Nordtyskland'], ['Garanti', 'på arbejdet'], ['Man–fre', '08:00–16:00']],
      photo: 'Foto: grundlæggerne',
    },
    services: {
      label: 'Ydelser',
      h2: 'Seks ydelser, udført af os selv',
      lead: 'Du får de samme to personer fra første henvendelse til færdig båd.',
      items: [
        { key: 'polish', title: 'Gelcoat-slibning og polering', text: 'Restaurering, overfladekorrektion, polering og højglansfinish med keramisk beskyttelse.' },
        { key: 'fullBottom', title: 'Komplet bundbehandling', text: 'Slibning ned til gelcoat, fjernelse af gammel bundmaling og primer samt påføring af nye primerlag og bundmaling.' },
        { key: 'antifouling', title: 'Bundmaling (antifouling)', text: 'Let slibning og klargøring af bunden efterfulgt af påføring af nyt lag bundmaling.' },
        { key: 'interior', title: 'Indvendig rengøring', text: 'Grundig og professionel rengøring af bådens indre.' },
        { key: 'exterior', title: 'Udvendig rengøring og vask', text: 'Komplet udvendig vask og pleje, inklusive vinduespolering og aftørring af hele båden.' },
        { key: 'teak', title: 'Teakrengøring', text: 'Dybderens af teak i to til tre trin.' },
      ],
    },
    process: {
      label: 'Sådan foregår det',
      h2: 'Fra første besked til færdig båd',
      steps: [
        ['Send dine oplysninger', 'Fortæl os om båden og dens nuværende stand.'],
        ['Du får et forslag', 'Vi udarbejder et foreslået arbejdsomfang og et foreløbigt overslag.'],
        ['Vi udfører arbejdet', 'Vi to stiftere står selv for arbejdet på din båd.'],
        ['Afsluttende gennemgang', 'Vi gennemgår resultatet sammen med dig, før vi afleverer.'],
      ],
      priceTitle: 'Sådan prissætter vi',
      price: 'Når du har givet os bådens oplysninger og nuværende stand, udarbejder vi et forslag til arbejdsomfang og et foreløbigt overslag.',
      priceCta: 'Send detaljer',
    },
    work: {
      label: 'Arbejde',
      h2: 'Før og efter',
      lead: 'Eksempler kommer, når vi har billederne klar.',
      before: 'Før',
      after: 'Efter',
      compare: 'Sammenlign før og efter',
      projects: ['Gelcoat-slibning og polering', 'Komplet bundbehandling'],
      placeholderAlt: ['Billede før arbejdet (pladsholder)', 'Billede efter arbejdet (pladsholder)'],
    },
    reviews: {
      label: 'Anmeldelser',
      h2: 'Hvad vores kunder siger',
      title: 'Anmeldelser kommer snart',
      text: 'Vi samler vores første anmeldelser på Trustpilot. Kom tilbage snart.',
      open: 'Se os på Trustpilot',
    },
    about: {
      label: 'Om os',
      h2: 'To stiftere, ingen mellemled',
      text: 'TheBoatGuy.dk drives af to stiftere, som selv udfører alt arbejdet. Du taler med de samme to personer fra første henvendelse til din båd er færdig. Vi arbejder i Danmark, Sydsverige og Nordtyskland.',
      areas: ['Danmark', 'Sydsverige', 'Nordtyskland'],
      photo: 'Foto: stifter',
    },
    faq: {
      label: 'FAQ',
      h2: 'Ofte stillede spørgsmål',
      items: [
        ['Hvordan får jeg en pris?', 'Når du har givet os bådens oplysninger og nuværende stand, udarbejder vi et forslag til arbejdsomfang og et foreløbigt overslag. Send formularen, så vender vi tilbage.'],
        ['Hvilke ydelser tilbyder I?', 'Gelcoat-slibning og polering, komplet bundbehandling, bundmaling, indvendig og udvendig rengøring samt teakrengøring.'],
        ['Hvad er forskellen på bundmaling og komplet bundbehandling?', 'Bundmaling er let slibning og klargøring af bunden efterfulgt af et nyt lag bundmaling. Komplet bundbehandling er slibning ned til gelcoat, fjernelse af gammel bundmaling og primer samt nye primerlag og bundmaling.'],
        ['Hvad skal I bruge at vide om min båd?', 'Mærke og model, længde, havn og bådens nuværende stand. Billeder hjælper.'],
        ['Hvor og hvornår kan jeg få fat i jer?', 'Bella Center, 2300 København S. Mandag til fredag kl. 08:00 til 16:00. Vi arbejder i Danmark, Sydsverige og Nordtyskland.'],
        ['Er der garanti på arbejdet?', 'Ja. Vi står inde for vores arbejde og giver garanti på det, vi har udført.'],
      ],
    },
    quote: {
      label: 'Kontakt',
      h2: 'Fortæl os om din båd',
      lead: 'Vi vender tilbage med et forslag til arbejdet. Du kan også ringe eller skrive direkte.',
      fields: { name: 'Navn', email: 'E-mail', phone: 'Telefon', model: 'Båd, mærke og model', length: 'Længde (m)', location: 'Havn eller sted', message: 'Besked' },
      services: 'Hvad skal laves?',
      condition: 'Bådens nuværende stand',
      conditions: { good: 'God', average: 'Middel', poor: 'Slidt' },
      submit: 'Send forespørgslen',
      subject: 'Tilbud på bådpleje',
      photos: 'Billeder af båden',
      photosHint: 'Valgfrit. Op til 5 billeder, højst 5 MB hver.',
      remove: 'Fjern',
      sending: 'Sender …',
      success: 'Tak, vi har modtaget din forespørgsel',
      successLead: 'Vi vender tilbage med et forslag til arbejdet. Du får en bekræftelse på e-mail.',
      fail: 'Forespørgslen kunne ikke sendes. Prøv igen, eller skriv til info@theboatguy.dk.',
      fallback: 'Formularen er ikke koblet til e-mail endnu, så din mailapp åbner med beskeden udfyldt. Vedhæft billederne der.',
      errors: {
        required: 'Udfyld feltet',
        email: 'Skriv en gyldig e-mailadresse',
        length: 'Angiv en længde mellem 2 og 40 meter',
        services: 'Vælg mindst én ydelse',
        files: 'Højst 5 billeder',
        fileType: 'Kun billeder: JPG, PNG, WebP eller HEIC',
        fileSize: 'Hvert billede må højst fylde 5 MB',
      },
      side: { title: 'Direkte kontakt', address: 'Adresse', hours: 'Åbningstider' },
    },
    footer: {
      tagline: 'Bådpleje udført af to stiftere.',
      contact: 'Kontakt',
      menu: 'Menu',
      social: 'Følg os',
      rights: 'Alle rettigheder forbeholdes.',
      cvr: 'CVR: kommer januar 2027',
      top: 'Til toppen',
      hours: 'Man–fre 08:00–16:00',
      area: 'Danmark · Sydsverige · Nordtyskland',
    },
    skip: 'Spring til indhold',
    menu: 'Menu',
    menuClose: 'Luk menu',
    mainNav: 'Hovedmenu',
    required: 'obligatorisk',
  },
  en: {
    meta: {
      title: 'Boat care, polishing and antifouling | TheBoatGuy.dk',
      description: 'Boat care in Denmark, South Sweden and North Germany: gelcoat sanding and polishing, bottom treatment, antifouling and boat and teak cleaning. Done by two co-founders. Work guaranteed.',
    },
    nav: { services: 'Services', process: 'How it works', work: 'Work', about: 'About', faq: 'FAQ', contact: 'Contact' },
    cta: 'Get a quote',
    hero: {
      eyebrow: 'Denmark · South Sweden · North Germany',
      lines: ['We look after your boat,', 'from hull to deck,', 'so you can just sail.'],
      intro: "Polishing, bottom treatment and cleaning, done by the two of us who founded the company. Send your boat's details and we will come back with a proposed scope and a preliminary estimate.",
      card: { title: 'Get a quote in 1 minute', model: 'Boat make and model', length: 'Length (m)', postcode: 'Postcode', go: 'Continue', hint: 'Next: the contact form' },
      facts: [['11+ years', 'of boat care experience'], ['3 countries', 'Denmark, South Sweden, North Germany'], ['Guarantee', 'on the work'], ['Mon–Fri', '08:00–16:00']],
      photo: 'Photo: the founders',
    },
    services: {
      label: 'Services',
      h2: 'Six services, done by us',
      lead: 'You deal with the same two people from first message to finished boat.',
      items: [
        { key: 'polish', title: 'Gelcoat sanding & polishing', text: 'Restoration, surface correction, polishing and high-gloss finishing with ceramic protection.' },
        { key: 'fullBottom', title: 'Full bottom treatment', text: 'Sanding down to gelcoat, removing old antifouling and primer, and applying new primer layers and antifouling.' },
        { key: 'antifouling', title: 'Bottom painting (antifouling)', text: 'Light sanding and preparation of the bottom, followed by the application of a new antifouling coat.' },
        { key: 'interior', title: 'Interior cleaning', text: 'Thorough and professional cleaning of the boat’s interior.' },
        { key: 'exterior', title: 'Exterior cleaning & washing', text: 'Complete exterior wash and care, including window cleaning and drying of the entire boat.' },
        { key: 'teak', title: 'Teak cleaning', text: 'Deep cleaning of teak in two to three steps.' },
      ],
    },
    process: {
      label: 'How it works',
      h2: 'From first message to finished boat',
      steps: [
        ['Send your details', 'Tell us about the boat and its current condition.'],
        ['You get a proposal', 'We prepare a proposed scope of work and a preliminary estimate.'],
        ['We do the work', 'The two of us do the work on your boat ourselves.'],
        ['Final inspection', 'We go through the result with you before handover.'],
      ],
      priceTitle: 'How we price',
      price: 'Once you have provided the vessel’s details and current condition, we will prepare a proposed scope of work and a preliminary estimate.',
      priceCta: 'Send details',
    },
    work: {
      label: 'Work',
      h2: 'Before and after',
      lead: 'Examples will appear as soon as the photos are ready.',
      before: 'Before',
      after: 'After',
      compare: 'Compare before and after',
      projects: ['Gelcoat sanding & polishing', 'Full bottom treatment'],
      placeholderAlt: ['Image before the work (placeholder)', 'Image after the work (placeholder)'],
    },
    reviews: {
      label: 'Reviews',
      h2: 'What our customers say',
      title: 'Reviews coming soon',
      text: 'We are collecting our first reviews on Trustpilot. Check back soon.',
      open: 'See us on Trustpilot',
    },
    about: {
      label: 'About us',
      h2: 'Two founders, no middlemen',
      text: 'TheBoatGuy.dk is run by two co-founders who do all the work themselves. You deal with the same two people from your first message until your boat is finished. We work in Denmark, South Sweden and North Germany.',
      areas: ['Denmark', 'South Sweden', 'North Germany'],
      photo: 'Photo: co-founder',
    },
    faq: {
      label: 'FAQ',
      h2: 'Frequently asked questions',
      items: [
        ['How do I get a price?', 'Once you have provided the vessel’s details and current condition, we will prepare a proposed scope of work and a preliminary estimate. Send the form and we will get back to you.'],
        ['Which services do you offer?', 'Gelcoat sanding and polishing, full bottom treatment, bottom painting, interior and exterior cleaning and teak cleaning.'],
        ['What is the difference between bottom painting and full bottom treatment?', 'Bottom painting is light sanding and preparation of the bottom followed by a new antifouling coat. Full bottom treatment is sanding down to gelcoat, removing old antifouling and primer, and applying new primer layers and antifouling.'],
        ['What do you need to know about my boat?', 'Make and model, length, harbour and current condition. Photos help.'],
        ['Where and when can I reach you?', 'Bella Center, 2300 Copenhagen S. Monday to Friday 08:00 to 16:00. We work in Denmark, South Sweden and North Germany.'],
        ['Is the work guaranteed?', 'Yes. We stand behind our work and guarantee what we have done.'],
      ],
    },
    quote: {
      label: 'Contact',
      h2: 'Tell us about your boat',
      lead: 'We will come back with a proposal for the work. You can also call or write directly.',
      fields: { name: 'Name', email: 'Email', phone: 'Phone', model: 'Boat make and model', length: 'Length (m)', location: 'Harbour or location', message: 'Message' },
      services: 'What needs doing?',
      condition: 'Current condition',
      conditions: { good: 'Good', average: 'Average', poor: 'Worn' },
      submit: 'Send request',
      subject: 'Boat care quote',
      photos: 'Photos of the boat',
      photosHint: 'Optional. Up to 5 photos, 5 MB each at most.',
      remove: 'Remove',
      sending: 'Sending …',
      success: 'Thank you, we have received your request',
      successLead: 'We will come back with a proposal for the work. You will get a confirmation by email.',
      fail: 'The request could not be sent. Try again, or write to info@theboatguy.dk.',
      fallback: 'The form is not connected to email yet, so your mail app opens with the message filled in. Attach the photos there.',
      errors: {
        required: 'Fill in this field',
        email: 'Enter a valid email address',
        length: 'Enter a length between 2 and 40 metres',
        services: 'Choose at least one service',
        files: 'At most 5 photos',
        fileType: 'Images only: JPG, PNG, WebP or HEIC',
        fileSize: 'Each photo can be 5 MB at most',
      },
      side: { title: 'Direct contact', address: 'Address', hours: 'Opening hours' },
    },
    footer: {
      tagline: 'Boat care by two co-founders.',
      contact: 'Contact',
      menu: 'Menu',
      social: 'Follow us',
      rights: 'All rights reserved.',
      cvr: 'CVR: coming January 2027',
      top: 'Back to top',
      hours: 'Mon–Fri 08:00–16:00',
      area: 'Denmark · South Sweden · North Germany',
    },
    skip: 'Skip to content',
    menu: 'Menu',
    menuClose: 'Close menu',
    mainNav: 'Main',
    required: 'required',
  },
};
