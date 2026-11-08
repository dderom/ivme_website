# Beeldbriefing IVME

Deze briefing volgt op de implementatie van de Minimal Mistakes-site. De site gebruikt voorlopig de standaard `sunrise`-skin en een warme oranje homepageheader; er zijn geen ontbrekende beeldlinks. Vier beelden volstaan voor de eerste versie.

## Benodigde beelden

| Bestand | Gebruik | Aanleverformaat | Webexport |
| --- | --- | --- | --- |
| `ivme-hero.webp` | Header van de drie taalhomepages | 2400 × 1000 px | 1600 × 667 px; streef naar maximaal 250 kB |
| `ivme-exchange.webp` | Internationale uitwisseling | 1200 × 800 px | 800 × 533 px; streef naar maximaal 100 kB |
| `ivme-composition.webp` | Compositie | 1200 × 800 px | 800 × 533 px; streef naar maximaal 100 kB |
| `ivme-performance.webp` | Podiumkansen | 1200 × 800 px | 800 × 533 px; streef naar maximaal 100 kB |

Plaats de webexports in `website/assets/images/`. Bewaar de grote originelen buiten de publieke `website/`-map, bijvoorbeeld in `archief/visuals/`.

De beelden zijn hedendaagse, algemene sfeerillustraties. Ze stellen geen gedocumenteerde IVME-evenementen of herkenbare historische personen voor. Gebruik voor echte historische projectbeelden bij voorkeur originele foto's met toestemming en bronvermelding.

Een bestaand IVME-logo kan later afzonderlijk worden toegevoegd. Een nieuw logo, bestuurportretten en fictieve archieffoto’s zijn niet nodig voor deze versie.

## Prompt voor de beeldagent

Kopieer onderstaande briefing in één keer. Laat de agent vier afzonderlijke bestanden leveren, geen collage. De prompts zijn Engelstalig voor eenvoudige overdracht tussen beeldtools.

> Create a coherent set of four separate editorial illustrations for IVME, an association concerned with music education, international musical exchange, composition and performance opportunities. The website uses the warm Minimal Mistakes Sunrise theme. Use a sophisticated hand-painted editorial style: warm ivory, terracotta orange, coral red accents and small touches of deep navy, natural wood colours, subtle paper texture, soft light and clear silhouettes. Keep the work welcoming, culturally grounded and suitable for a music organisation. Avoid glossy advertising, cartoon mascots, flags, text, lettering, logos, watermarks and readable sheet music. These are contemporary conceptual illustrations, not historical documentary images or reconstructions of actual IVME events. Do not portray identifiable real people. Maintain the same visual language and palette across all four files. Deliver each image separately, with a high-resolution original and an optimised WebP export.
>
> **1 — ivme-hero:** Wide horizontal composition, 2400 × 1000 px. A small chamber ensemble of adult musicians rehearsing together in an intimate music room, with a piano, cello and music stands. Suggest attentive collaboration and musical exchange. Keep all essential subjects within the central 40% of the image so a narrow mobile crop remains meaningful. Leave calm, low-detail areas across the image for a website heading added separately in HTML; no text inside the image. Avoid important detail at the edges. The image must remain readable behind a dark overlay.
>
> **2 — ivme-exchange:** Horizontal editorial illustration, 1200 × 800 px. Three adult musicians with different cultural backgrounds exchanging musical ideas around a piano and music stands. Convey conversation, listening and mutual curiosity. No flags or specific identifiable venue. Keep subjects central, with generous crop margins. Use the same palette and brushwork as the hero.
>
> **3 — ivme-composition:** Horizontal editorial illustration, 1200 × 800 px. A close view of an anonymous composer's hands sketching musical ideas with a pencil beside a piano keyboard. Suggest blank or abstract musical notation without legible writing. Focus on the creative process rather than a portrait. Keep the hands and pencil central and anatomically plausible. Match the other illustrations.
>
> **4 — ivme-performance:** Horizontal editorial illustration, 1200 × 800 px. A young adult pianist performing on a small recital stage, viewed from behind and slightly to one side. Suggest attentive audience silhouettes and warm stage lighting. No identifiable concert hall or historical event. Centre the piano and performer for mobile cropping. Match the other illustrations.

## Beelden activeren via standaard frontmatter

### Homepageheader

In `website/_content/index.md`, `website/_content/nl/index.md`, `website/_content/fr/index.md` en `website/_content/en/index.md` vervang je het bestaande `header`-blok door:

```yaml
header:
  overlay_color: "#c95720"
  overlay_image: /assets/images/ivme-hero.webp
  overlay_filter: 0.35
```

Dit gebruikt de standaard headeroverlay van het thema. Controleer de leesbaarheid van de witte titel op het uiteindelijke beeld, zowel op mobiel als desktop. De achtergrondillustratie is decoratief; de inhoud en tekst blijven in HTML.

### Projectkaarten

De projectbestanden staan in `website/_content/{nl,fr,en}/projects/`. Voeg aan de frontmatter van een projectbestand het standaard themaveld toe:

```yaml
header:
  teaser: /assets/images/ivme-exchange.webp
```

Gebruik dezelfde afbeelding voor de drie taalversies van een project. De bestaande projectkaarten tonen de teaser automatisch. De themahelper behandelt teasers als decoratief en gebruikt een leeg alt-attribuut; alle betekenisvolle informatie staat in de titel en samenvatting.

| Project-ID | Teaser |
| --- | --- |
| `flemish-fortnight` | `ivme-exchange.webp` |
| `american-arts-festival` | `ivme-exchange.webp` |
| `compositiewedstrijd` | `ivme-composition.webp` |
| `orgelwandeling` | `ivme-performance.webp` |
| `podijac` | `ivme-performance.webp` |
| `cantabile` | `ivme-performance.webp` |

De derde illustratie verbeeldt algemene podiumkansen; zij is geen afbeelding van de historische orgelwandeling of een specifiek laureatenconcert. Gebruik haar alleen als algemene teaser, niet als documentaire foto bij de projecttekst.

Voor inhoudelijke beelden binnen een projecttekst gebruik je de standaard `figure`-helper met een beschrijvende `alt` en een herkomstvermelding in `caption`. Bijvoorbeeld:

```liquid
{% include figure image_path="/assets/images/ivme-composition.webp" alt="Illustratie van handen die een compositie uitwerken naast een piano" caption="Illustratief beeld, gemaakt met AI; geen historische opname." %}
```

Leg de gekozen beeldtool, maker, aanmaakdatum en eventuele gebruiksvoorwaarden bij de originelen vast. Controleer de uiteindelijke uitsnede op een smal scherm voordat je publiceert.
