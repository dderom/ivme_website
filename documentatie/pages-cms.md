# Inhoud beheren met Pages CMS

Pages CMS bewerkt de bestaande bestanden in deze GitHub-repository. De Jekyll-website, het Minimal Mistakes-thema, de publieke URL’s, vertalingen en historische bronnen blijven behouden. De configuratie staat in `.pages.yml` in de hoofdmap; paginateksten hoeven niet te worden herschreven.

## Eenmalig verbinden

1. Commit en push de configuratie **samen met de bestaande websitebestanden** naar `dderom/ivme_website`. Bij het voorbereiden van deze configuratie stonden de bestanden onder `website/` nog niet in Git; Pages CMS kan alleen bestanden bewerken die op GitHub staan.
2. Open [app.pagescms.org](https://app.pagescms.org/) en meld je aan met GitHub.
3. Installeer de Pages CMS GitHub App voor het account `dderom`. Selecteer alleen de repository `ivme_website` als toegang tot andere repositories niet nodig is.
4. Open `dderom/ivme_website` en selecteer de branch **`main`**. Pages CMS leest de `.pages.yml` op die branch. De configuratie verschijnt automatisch; maak geen vervangende voorbeeldconfiguratie aan.
5. Geef de gewenste GitHub-gebruikers schrijftoegang tot de repository. Laat hen inloggen bij Pages CMS en dezelfde repository en branch openen.
6. Controleer eerst een Nederlandse, Franse en Engelse pagina en de gedeelde lijsten. Sla een kleine, bedoelde tekstwijziging op en bekijk de GitHub-diff voordat het team verder werkt.

GitHub App-installatie en aanmelden gebeuren in je eigen account. Er hoort geen token of wachtwoord in `.pages.yml`.

De aanbevolen editor draait op de gehoste Pages CMS-dienst, niet op GitHub Pages. De bestanden en wijzigingsgeschiedenis blijven op GitHub. Er is geen Decap-, DecapBridge- of Cloudflare-configuratie nodig. Zelf Pages CMS hosten is ook mogelijk, maar vereist een serveromgeving; GitHub Pages kan deze applicatie niet uitvoeren.

## Wat je kunt aanpassen

| Onderdeel in de editor | Inhoud |
| --- | --- |
| Startpagina (/) | De Nederlandstalige pagina op de domeinhoofdmap |
| Nederlands, Français, English | Per taal een homepage, gewone pagina’s en projectteksten |
| Projectvolgorde en datums | Volgorde, optionele start- en einddatums, datumlabels en historische homepage-selectie |
| Mensen | Namen en functies in drie talen; de bestaande lege lijst is geldig |
| Tijdlijn | Jaren en verwijzingen naar bestaande projecten |
| Menu’s | Titels, links en volgorde per taal |
| Taalkeuze | Vlaggen, taalnamen en links naar taalhomepages |
| Gedeelde teksten | Vaste menulabels en de melding bij een lege personenlijst |
| Media | Afbeeldingen onder `website/assets/images/`, met publieke paden onder `/assets/images/` |

De editor gebruikt Nederlandstalige veldlabels. De groepen Français en English bewerken de oorspronkelijke Franse en Engelse teksten; er wordt niets automatisch vertaald. De startpagina `/` en `/nl/` zijn aparte bestanden: pas beide aan als dezelfde tekst op beide plekken hoort te staan.

Pagina’s en projectteksten kunnen worden bijgewerkt, maar niet via de editor worden aangemaakt, hernoemd of verwijderd. Publieke URL’s en bestaande project-ID’s worden alleen getoond. Taalcodes, vertaalsleutels, layouts en overige technische metadata blijven behouden door `settings.content.merge: true`. Afbeeldingen worden ingevuld via de standaard Jekyll-themavelden `header.overlay_image` en `header.teaser`.

## Markdown en bestaande opmaak

De tekstvelden gebruiken een Markdown-broneditor. Dat bewaart de Liquid-instructies en Kramdown-opmaak die de huidige pagina’s gebruiken; een visuele teksteditor kan zulke instructies veranderen.

Pas de gewone tekst aan, maar laat deze onderdelen staan:

```liquid
{% include people-list.html %}
{% include project-list.html %}
{% include home-projects.html %}
{% include timeline.html %}
{{ '/nl/projecten/' | relative_url }}
```

Bewaar ook Kramdown-attributen zoals `{: .notice}` en `{: .btn .btn--primary}`. Deze zorgen voor meldingen en knopopmaak. Markdown-links en afbeeldingen kunnen in de bron worden ingevoegd, bijvoorbeeld `![Beschrijving](/assets/images/voorbeeld.webp)` na upload via Media.

## Lijsten en projecten

De tijdlijn en talen blijven lijsten op het hoogste niveau; projecten blijven onder `items` staan. De lege personenlijst staat nu ook onder `items`, met een overeenkomstige aanpassing in `people-list.html`. Zo blijft de editor een object verwachten wanneer Pages CMS bij opslaan de lege lijst weglaat. De bestaande inhoud en weergave veranderen hierdoor niet.

Laat in de tijdlijn en taalkeuze minimaal één bestaande regel staan. De huidige Pages CMS-serializer schrijft een lege lijst op het hoogste niveau als een leeg bestand. Als je deze lijsten volledig wilt leegmaken, pas dan eerst samen met een beheerder het gegevensmodel en de bijbehorende Jekyll-includes aan.

Gebruik bij historische projecten zonder bekende dag alleen de datumlabels. Laat start- en einddatum leeg; verzin geen exacte datum. Datums worden opgeslagen als `yyyy-MM-dd`. `homepage` selecteert historische hoogtepunten; aankomende projecten worden door Jekyll op basis van hun datums gekozen.

Het toevoegen van een geheel nieuw project blijft de bestaande beheerstap uit [README.md](README.md#project-toevoegen): maak de vertaalde teksten, koppel dezelfde project-ID, en voeg de gedeelde projectgegevens toe. De formulieren zijn in deze inrichting bedoeld voor onderhoud van de bestaande inhoud. Verwijder een project- of taalregel niet zonder ook de bijbehorende koppelingen na te kijken.

## Opslaan en publiceren

Opslaan schrijft direct naar de geselecteerde GitHub-branch. Kies `main` voor de afgesproken directe publicatiewerkwijze; er is geen aparte concept- of goedkeuringsstap. Eventuele GitHub-branchregels blijven gelden. De UI-beperkingen in `.pages.yml` vervangen geen GitHub-toegangsrechten.

De live website verandert pas na een nieuwe Jekyll-productiebuild en upload naar de externe host. Die host is nog niet gekozen en automatische deployment is nog niet ingericht. Gebruik voorlopig de [bestaande productiebuild](README.md#productiebuild) en publiceer uitsluitend de inhoud van `website/_site/`. Verbind later een push naar `main` met de deployment van de gekozen host.

Afbeeldingspaden gaan voorlopig uit van hosting op de domeinhoofdmap (`baseurl: ""`). Controleer bij toekomstige hosting in een submap zowel `baseurl` als `media.output`. De kalenderselectie op de homepage wordt bij een build opnieuw berekend.

Controleer in de eerste echte bewerksessie de GitHub-diff op behoud van URL’s, taal- en vertaalsleutels, layouts, Liquid-tags, lege lijsten en datumwaarden. YAML-opmaak en commentaar kunnen bij opslaan worden herschreven; de inhoud en structuur moeten gelijk blijven. Herstel een fout via een nieuwe wijziging of een Git-revert.

## Officiële documentatie

- [Pages CMS starten en GitHub verbinden](https://pagescms.org/docs/quick-start/)
- [Configuratie en content](https://pagescms.org/docs/configuration/)
- [Lijsten op het hoogste niveau](https://pagescms.org/docs/configuration/content/list/)
- [Metadata behouden bij opslaan](https://pagescms.org/docs/configuration/settings/)
- [Zelf hosten](https://pagescms.org/docs/guides/installing/self-host/)
