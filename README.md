# IVME-website

Repository voor de meertalige, statische website van IVME met Jekyll.

- [`archief/`](archief/): bestaand archief en historisch bronmateriaal.
- [`website/`](website/): websitebestanden en afbeeldingen; alle Markdown-teksten staan in [`website/_content/`](website/_content/).
- [`documentatie/`](documentatie/README.md): uitleg over de inrichting, lokaal bouwen en deployment.

Alleen de inhoud van `website/` dient als bron voor de website. Het archief en de documentatie horen niet in de gepubliceerde website.

## Lokaal starten

Start Docker Desktop en voer vanuit deze map uit:

```sh
docker compose -f website/compose.yaml up --build
```

Open <http://localhost:4000>. Zie de [beheerinstructies](documentatie/README.md) voor pagina’s, datalijsten, vertalingen en productiebuilds. De site gebruikt Minimal Mistakes met de standaard `sunrise`-skin.

De [beeldbriefing en prompts](documentatie/visuals.md) beschrijven de vier benodigde sfeerbeelden.

## Inhoud bewerken met Pages CMS

De configuratie in [`.pages.yml`](.pages.yml) maakt de bestaande pagina’s in Nederlands, Frans en Engels, projectteksten, gedeelde lijsten en afbeeldingen bewerkbaar met [Pages CMS](https://app.pagescms.org/). De website blijft Jekyll gebruiken en wordt apart gehost.

Zie de [CMS-instructies](documentatie/pages-cms.md) voor de eenmalige GitHub-koppeling en het dagelijks beheer. Opslaan op de branch `main` maakt direct een GitHub-commit; publicatie op de externe website vereist daarnaast een productiebuild en deployment.
