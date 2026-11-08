# Beheer van de IVME-website

## Inrichting

De site gebruikt Jekyll 4 met **Minimal Mistakes**, geïnstalleerd als Ruby-gem. De standaard `sunrise`-skin, lettertypes, layouts en responsive raster komen uit het thema. De projecttegels hebben een kleine rand en een datumregel. Alleen de compacte header heeft eigen, afgebakende CSS en een klein script. Op alle schermformaten staan rechts een hamburgerknop en een vlagknop; er is geen zichtbaar horizontaal tekstmenu of sitefooter.

```text
/
├── archief/                 # Historisch bronmateriaal; niet gepubliceerd
├── website/
│   ├── _config.yml          # Standaard Jekyll- en thema-instellingen
│   ├── _data/               # Beheerbare lijsten, volgorde en labels
│   ├── _includes/           # Kleine Liquid-uitbreidingen
│   ├── _content/            # Alle Markdown-teksten als één Jekyll-collectie
│   │   ├── index.md         # Introductie
│   │   └── {nl,fr,en}/      # Pagina’s en een projects/-map per taal
│   ├── assets/              # Thema-imports en beelden
│   ├── Gemfile              # Afhankelijkheden
│   ├── Gemfile.lock         # Vastgelegde versies voor ARM64 en x86-64 Linux
│   ├── Dockerfile           # Ruby- en Jekyll-bouwomgeving
│   └── compose.yaml         # Lokale preview
├── documentatie/
│   ├── README.md
│   └── visuals.md           # Beeldbriefing, prompts en plaatsingsinstructies
└── README.md
```

`archief/` blijft ongewijzigd. Alleen `website/` wordt als bronmap gebouwd. Docker- en afhankelijkheidsbestanden zijn uitgesloten van publicatie via `_config.yml`.

## Bewerken via Pages CMS

De configuratie in `../.pages.yml` biedt formulieren voor de bestaande pagina’s in drie talen, projectteksten, gedeelde datalijsten en afbeeldingen. Zie [pages-cms.md](pages-cms.md) voor de GitHub-koppeling, het gebruik van de editor en de scheiding tussen opslaan en publiceren. De bestaande Jekyll-bronbestanden en het thema blijven behouden.

## Lokaal starten

Installeer en start Docker Desktop met Docker Compose. Ruby en Jekyll draaien in de container. De eerste build vereist internet.

Vanuit de hoofdmap van de repository:

```sh
docker compose -f website/compose.yaml up --build
```

Open <http://localhost:4000>. De server verwerkt wijzigingen automatisch; vernieuw de browser. Stop met `Ctrl+C`. Na wijzigingen aan `_config.yml`:

```sh
docker compose -f website/compose.yaml restart
```

De preview is alleen lokaal bereikbaar. Gebruik deze ontwikkelserver niet voor productie.

## Lijsten beheren via data

| Bestand in `website/_data/` | Functie |
| --- | --- |
| `navigation.yml` | Menuvolgorde, titels en URL’s per taal |
| `languages.yml` | Talen, labels, vlaggen en terugval-URL’s |
| `translations.yml` | Gedeelde labels en meldingen per taal |
| `projects.yml` | Projectvolgorde, datums en historische homepage-selectie |
| `timeline.yml` | Tijdlijnvolgorde en verwijzingen naar projecten |
| `people.yml` | Namen en functies; voorlopig leeg |

De volgorde in `projects.yml` is de volgorde van het projectenoverzicht. Er zijn geen categorieën. De homepage sorteert aankomende projecten op startdatum, met het eerstvolgende bovenaan.

Een menu-item in `navigation.yml`:

```yaml
nl:
  - title: Over IVME
    url: /nl/over-ivme/
```

Een persoon in `people.yml` (voeg alleen bevestigde gegevens toe):

```yaml
items:
  - name: Voornaam Achternaam
    roles:
      nl: Functie
      fr: Fonction
      en: Role
```

## Pagina’s en vertalingen

Alle Markdown-teksten van de website staan samen in `website/_content/`. Per taal staan de gewone pagina’s en projectteksten bij elkaar:

```text
_content/
├── index.md                # Introductie
├── nl/
│   ├── index.md            # Home
│   ├── about.md
│   ├── projects.md         # Projectenoverzicht
│   ├── history.md
│   ├── contact.md
│   └── projects/           # Afzonderlijke projectteksten
│       ├── compositiewedstrijd.md
│       └── ...
├── fr/                     # Dezelfde structuur
└── en/                     # Dezelfde structuur
```

`_content` is één standaard Jekyll-collectie met `output: true`. Elke tekst krijgt een expliciete `permalink`; daardoor bepaalt de mapindeling niet de publieke URL. De gedeelde labels en lijsten blijven in `_data/`. Gebruik standaard Jekyll-frontmatter:

```yaml
---
title: Over IVME
lang: nl
locale: nl
translation_key: about
permalink: /nl/over-ivme/
---
```

De tekst eronder is Markdown. `locale` stuurt de taal van het thema; `lang` wordt gebruikt voor de inhoudsselectie. Houd beide gelijk. Alle vertalingen van één pagina delen dezelfde `translation_key`, maar hebben hun eigen URL. Ontbrekende vertalingen verschijnen niet in de paginataalkiezer.

De hoofdstructuur bestaat uit Home, Over IVME, Projecten, Geschiedenis en Contact. De home gebruikt `splash`, gewone pagina’s `single`, en het projectenoverzicht `archive`. De projecttegels gebruiken het standaard responsive raster (`entries-grid` en `grid__item`) met de kleine include `project-tile.html` voor de datumregel en doorklikbare tegel.

Rechtsboven staat de vlag van de huidige taal. Die knop opent een bescheiden selectie met vlaggen; de volledige taalnamen blijven beschikbaar als toegankelijke labels en tooltips. De taalkeuze verwijst naar de overeenkomstige vertaalde pagina, ook bij projecten. Als een vertaling ontbreekt, verwijst die optie naar de taalhomepage. Er is nergens anders een taalkeuzelijst. In de HTML-head staan bijbehorende `hreflang`-links.

De hamburgerknop blijft altijd zichtbaar, ook op desktop. Beide uitklappers gebruiken native HTML `details`/`summary`, werken met toetsenbord en zonder JavaScript, en hebben tikvlakken van minimaal 44 × 44 px. Het kleine `assets/js/header.js` sluit ze met Escape of een klik buiten de selectie en voorkomt dat beide tegelijk openstaan.

### Project toevoegen

1. Maak een Markdown-bestand per beschikbare taal onder `_content/nl/projects/`, `_content/fr/projects/` en `_content/en/projects/`.
2. Gebruik dezelfde `project_id` en `translation_key` in alle vertalingen.
3. Voeg het project toe aan `items` in `_data/projects.yml`, met datuminformatie zoals hieronder. De homepage toont toekomstige en lopende projecten automatisch. `homepage: true` selecteert een historisch hoogtepunt voor de terugvalweergave.
4. Voeg zo nodig een vermelding toe aan `_data/timeline.yml`.

Voorbeeldfrontmatter:

```yaml
---
title: Projecttitel
excerpt: Korte beschrijving voor de projectkaart.
lang: nl
locale: nl
translation_key: project-voorbeeld
project_id: voorbeeld
year: 2026
permalink: /nl/projecten/voorbeeld/
---
```

De kleine Liquid-includes koppelen de YAML-lijsten aan de collectie; ze bevatten geen vastgelegde projectteksten of volgordes. Alle paginateksten blijven in Markdown onder `_content/`.

### Projectdatums en homepage

Een nieuw project in `_data/projects.yml`:

```yaml
items:
  - id: voorbeeld
    start_date: "2027-05-15"
    # end_date: "2027-05-17"   # Optioneel voor meerdaagse projecten
    date_label:
      nl: 15 mei 2027
      fr: 15 mai 2027
      en: 15 May 2027
    homepage: false
```

Gebruik ISO-datums tussen aanhalingstekens. `date_label` is de zichtbare datum op een tegel; gebruik voor een meerdaags project een periode. Als dit label ontbreekt, wordt de startdatum als `dd/mm/jjjj` getoond. Historische projecten met een onbekende dag krijgen alleen een eerlijk label zoals `2013`, zonder verzonnen `start_date`.

De homepage vergelijkt de start- of einddatum met de **bouwdatum** in `Europe/Brussels`. Een project blijft tot en met de einddatum zichtbaar; zonder einddatum geldt de startdatum. Alleen projecten met een tekst in de huidige taal worden meegenomen.

- Met aankomende of lopende projecten: de sectie **Binnenkort bij IVME** toont die projecten.
- Zonder aankomende projecten: een korte aankondiging en een selectie eerdere projecten met `homepage: true`, plus de link naar het volledige overzicht.

De koppen en terugvaltekst staan in de frontmatter van `_content/{nl,fr,en}/index.md`. `_content/index.md` is ook een Nederlandstalige homepage en bevat dezelfde instellingen voor de domeinhoofdmap.

Dit is een statische website: datums worden opnieuw beoordeeld bij een **nieuwe build**, niet automatisch tijdens het bezoek. Een latere dagelijkse deployment kan dit actueel houden; die is nog niet ingericht. Voeg een toekomstig project pas aan de publieke data toe wanneer het aangekondigd mag worden.

### Historische inhoud

De zes voorbeeldprojecten zijn samenvattingen van `archief/IVME_Historisch_Overzicht.md`, met externe bronlinks en een vermelding van de reconstructiestatus. De oorspronkelijke bronclaims zijn niet opnieuw onafhankelijk gecontroleerd. Laat inhoud en vertalingen vóór publicatie nalezen. Het archief bevat geen bevestigde actuele missie, bestuurssamenstelling of contactgegevens; daarvoor staan korte voorlopige teksten op de site.

## Thema en uitbreidingen

Gebruik eerst de instellingen en helpers van Minimal Mistakes. Kopieer geen volledige layouts of themabestanden om ze vervolgens zelf te onderhouden.

De afwijkingen van het thema zijn beperkt tot:

- `_includes/masthead.html`: compacte header met altijd een hamburger en een vlagselectie. Menu’s en talen komen uit `_data/`.
- `_layouts/default.html`: gebaseerd op Minimal Mistakes 4.28.1; de sitefooter is verwijderd en de header wordt zonder cache ingeladen, zodat vertaallinks per pagina kloppen.
- `_includes/skip-links.html`: de verwijzing naar de verwijderde footer is weggelaten.
- `_includes/head/custom.html`: `hreflang`-links en het kleine headerscript.
- `assets/css/main.scss`: officiële thema-imports, gevolgd door de kleine stijlen voor `.ivme-*`-headeronderdelen en projecttegels.

De overige includes koppelen kleine datalijsten aan de inhoud. Er is geen overschreven `single`-, `archive`- of `splash`-layout. Vergelijk bij een thema-update de lokale basislayout en skip-links met de nieuwe officiële versies.

De huidige thema-Sass geeft deprecationmeldingen bij de build. De build slaagt; deze meldingen komen uit het thema en zijn niet opgelost door eigen CSS of een fork te maken.

## Beelden toevoegen

Zie [visuals.md](visuals.md) voor de concrete briefing en prompts. De site werkt zonder beelden en verwijst nog niet naar ontbrekende bestanden. Gebruik de standaard `header.overlay_image`- en `header.teaser`-velden zodra de beelden klaar zijn.

## Productiebuild

Vul voor publicatie `url` in `_config.yml` in met de definitieve HTTPS-domeinnaam. Laat `baseurl` leeg voor de domeinhoofdmap; gebruik bijvoorbeeld `/ivme` bij hosting in een submap.

```sh
docker compose -f website/compose.yaml build
docker compose -f website/compose.yaml run --rm -e JEKYLL_ENV=production jekyll build --strict_front_matter --trace
```

Publiceer alleen de **inhoud** van `website/_site/`. De hostingserver heeft geen Ruby, Jekyll of Docker nodig. Gegenereerde bestanden en caches staan in `.gitignore`.

## Afhankelijkheden bijwerken

Na een wijziging in `Gemfile`, of voor een bewuste update:

```sh
docker compose -f website/compose.yaml run --rm --entrypoint bundle jekyll update
docker compose -f website/compose.yaml build
```

Neem de gewijzigde `Gemfile.lock` mee in Git. Herbouw na wijzigingen in `Gemfile`, `Gemfile.lock` of `Dockerfile`. Gebruik `build --pull` voor updates van de Ruby-basisimage.

## Deployment

Vimexx of OVH wordt later gekozen. Automatische deployment is nog niet ingericht. De voorziene flow is push naar GitHub → productiebuild in GitHub Actions → upload van de gegenereerde bestanden. De workflow komt in `.github/workflows/` in de hoofdmap. Bewaar toegangsgegevens in GitHub Actions secrets.

## Officiële documentatie

- [Jekyll-structuur](https://jekyllrb.com/docs/structure/)
- [Jekyll-data](https://jekyllrb.com/docs/datafiles/)
- [Jekyll-collecties](https://jekyllrb.com/docs/collections/)
- [Minimal Mistakes installeren](https://mmistakes.github.io/minimal-mistakes/docs/quick-start-guide/)
- [Thema-layouts en beelden](https://mmistakes.github.io/minimal-mistakes/docs/layouts/)
- [Navigatie via data](https://mmistakes.github.io/minimal-mistakes/docs/navigation/)
