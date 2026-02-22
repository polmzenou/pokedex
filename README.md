# Pokédex GameBoy

Un Pokédex avec un style visuel inspiré de la GameBoy, construit avec Next.js 14+, TypeScript et TailwindCSS.

## Fonctionnalités

- **Interface split-screen** : Liste des Pokémon à gauche, détails à droite
- **Style GameBoy authentique** : Palette verte, police pixel, bordures épaisses
- **Données en français** : Noms, descriptions et types traduits
- **Mode Shiny** : Basculer entre sprite normal et shiny
- **Chaîne d'évolution** : Visualisation horizontale des évolutions
- **Recherche en temps réel** : Filtrer par nom ou numéro
- **Filtre par type** : Afficher uniquement certains types
- **Navigation clavier** : Flèches haut/bas pour naviguer
- **Responsive** : Page détail séparée sur mobile
- **Pages Objets & Baies** : Catalogues additionnels

## Technologies

- **Next.js 14+** avec App Router
- **TypeScript** pour le typage
- **TailwindCSS** pour les styles
- **Server Components** pour le chargement initial
- **API Routes** pour le fetching client-side
- **PokéAPI** comme source de données

## Installation

```bash
# Installer les dépendances
npm install

# Lancer en développement
npm run dev

# Build pour production
npm run build

# Lancer en production
npm start
```

## Structure du projet

```
pokedex/
├── app/
│   ├── api/pokemon/        # API routes
│   ├── berries/            # Page baies
│   ├── items/              # Page objets
│   ├── pokemon/[name]/     # Page détail (mobile)
│   ├── globals.css         # Styles globaux
│   ├── layout.tsx          # Layout principal
│   └── page.tsx            # Page d'accueil
├── components/
│   ├── EvolutionChain.tsx
│   ├── PixelButton.tsx
│   ├── PokedexLayout.tsx
│   ├── PokemonDetail.tsx
│   ├── PokemonList.tsx
│   ├── PokemonListItem.tsx
│   ├── SearchBar.tsx
│   ├── StatBar.tsx
│   └── TypeBadge.tsx
├── lib/
│   ├── api.ts              # Fonctions API PokéAPI
│   └── utils.ts            # Utilitaires
└── types/
    └── pokemon.ts          # Types TypeScript
```

## API

Toutes les données proviennent de [PokéAPI](https://pokeapi.co/). Le cache Next.js est configuré avec `revalidate: 86400` (24h).

## Licence

MIT
