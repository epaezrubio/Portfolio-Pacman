export type PortfolioLink = {
  label: string;
  url: string;
};

export type PortfolioItem = {
  title: string;
  image: string;
  alt: string;
  pills: string[];
  bullets: string[];
  links: PortfolioLink[];
};

export type PortfolioSection = {
  title: string;
  items: PortfolioItem[];
};

export const portfolioSections: PortfolioSection[] = [
  {
    title: 'Published games',
    items: [
      {
        title: 'Tile Hero',
        image: '/images/portfolio/tile_hero.png',
        alt: 'Tile Hero',
        pills: [
          'Unity',
          'C#',
          'Cross-platform',
          'Google Play Store',
          'App Store',
        ],
        bullets: [
          'Cross-platform: available on Google Play, App Store and web platforms',
        ],
        links: [
          {
            label: 'Google Play',
            url: 'https://play.google.com/store/apps/details?id=com.softgames.tilehero',
          },
          {
            label: 'App Store',
            url: 'https://apps.apple.com/us/app/tile-hero/id6736906443',
          },
        ],
      },
      {
        title: 'Puzzle Blocks Classic',
        image: '/images/portfolio/puzzle_blocks_classic.png',
        alt: 'Puzzle Blocks Classic',
        pills: ['TypeScript', 'PIXI', 'Cross-platform'],
        bullets: [
          'Cross-platform: available on Facebook, Google Play, Samsung Instant Games App Store',
          'Most popular Instant Game on Samsung Game Launcher',
        ],
        links: [
          {
            label: 'Facebook',
            url: 'https://www.facebook.com/gaming/play/356722543312201/',
          },
          {
            label: 'Google Play',
            url: 'https://play.google.com/store/apps/details?id=com.softgames.pbc',
          },
          {
            label: 'App Store',
            url: 'https://apps.apple.com/us/app/puzzle-blocks-classic/id6474034846',
          },
        ],
      },
      {
        title: 'Solitaire Home Story',
        image: '/images/portfolio/solitaire_home_story.png',
        alt: 'Solitaire Home Story',
        pills: ['C#', 'TypeScript', 'Microsoft Store'],
        bullets: [
          'Creation of Univesal Windows Platform wrapper in C#',
          'Integration with Microsoft Store services',
        ],
        links: [
          {
            label: 'Microsoft Store',
            url: 'https://www.microsoft.com/store/apps/9N3RF7WR68QL',
          },
        ],
      },
      {
        title: 'Bubble Shooter Pro',
        image: '/images/portfolio/bubble_shooter_pro.png',
        alt: 'Bubble Shooter Pro',
        pills: ['TypeScript', 'PIXI', 'Facebook Instant Games'],
        bullets: [
          'Over 700.000 daily active players',
          'Social features: tournaments, leaderboards, friend gifts..',
          'Achievements system',
        ],
        links: [
          {
            label: 'Facebook',
            url: 'https://www.facebook.com/gaming/play/399969577438353/',
          },
        ],
      },
      {
        title: 'Snake 360',
        image: '/images/portfolio/snake_360.png',
        alt: 'Snake 360',
        pills: ['Unity', 'C#', 'Google Play Store'],
        bullets: [
          'Rated 4.5 stars on Google Play',
          'Unique gameplay among similar games on Google Play',
        ],
        links: [
          {
            label: 'Google Play',
            url: 'https://play.google.com/store/apps/details?id=com.cuboidgames.snake360',
          },
        ],
      },
      {
        title: 'Alpha Tunnel',
        image: '/images/portfolio/alpha_tunnel.png',
        alt: 'Alpha Tunnel',
        pills: ['Unity', 'C#', 'Google Play Store'],
        bullets: [
          'Weekend project turned into game',
          'Unlimited replayability',
        ],
        links: [
          {
            label: 'Google Play',
            url: 'https://play.google.com/store/apps/details?id=com.cuboidgames.alphatunnel',
          },
        ],
      },
    ],
  },
  {
    title: 'Game Jams',
    items: [
      {
        title: 'Soul Bargain',
        image: '/images/portfolio/soul_bargain.png',
        alt: 'Soul Bargain',
        pills: ['Unity', 'C#', 'Game Jam'],
        bullets: ['Game submission for Brackeys Game Jam 2025.2'],
        links: [
          {
            label: 'itch.io',
            url: 'https://epaezrubio.itch.io/soul-bargain',
          },
        ],
      },
      {
        title: 'Sweets Space Factory',
        image: '/images/portfolio/sweets_space_factory.png',
        alt: 'Sweets Space Factory',
        pills: ['Unity', 'C#', 'Game Jam'],
        bullets: [
          'Game submission for Crazy Web Game Jam 2024',
          'Selected for publishing on CrazyGames',
        ],
        links: [
          {
            label: 'itch.io',
            url: 'https://epaezrubio.itch.io/sweets-space-factory',
          },
        ],
      },
      {
        title: 'Isometric Rush',
        image: '/images/portfolio/isometric_rush.png',
        alt: 'Isometric Rush',
        pills: ['Unity', 'C#', 'Game Jam', 'Open Source'],
        bullets: [
          'Game submission for VimJam 4: Checkpoints',
          'Rank #2 on theme implementation',
        ],
        links: [
          {
            label: 'itch.io',
            url: 'https://epaezrubio.itch.io/isometric-rush',
          },
          {
            label: 'GitHub',
            url: 'https://github.com/epaezrubio/isometric-rush',
          },
        ],
      },
      {
        title: 'The floor is lava',
        image: '/images/portfolio/zero_hour_jam_2022.png',
        alt: 'Zero Hour Jam 2022',
        pills: ['Unity', 'C#', 'Game Jam', 'Open Source'],
        bullets: [
          'Game submission for Zero Hour Jam 2022',
          'Game created in 1 hour',
        ],
        links: [
          {
            label: 'itch.io',
            url: 'https://epaezrubio.itch.io/the-floor-is-lava',
          },
          {
            label: 'GitHub',
            url: 'https://github.com/CuboidGames/Zero-Hour-Jam-2022',
          },
        ],
      },
      {
        title: "Escape the Room 1'",
        image: '/images/portfolio/one_minute_jam_2021.png',
        alt: 'One Minute Jam 2021',
        pills: ['Unity', 'C#', 'Game Jam', 'Open Source'],
        bullets: [
          'Game submission for One Minute Jam 2021',
          'Open source and making-of timelapse',
          'Very positive feedback by other jam participants',
        ],
        links: [
          {
            label: 'itch.io',
            url: 'https://epaezrubio.itch.io/escape-the-room-1',
          },
          {
            label: 'GitHub',
            url: 'https://github.com/CuboidGames/One-Minute-Jam-2021',
          },
          {
            label: 'Devlog',
            url: 'https://www.youtube.com/watch?v=wNoeLW8Qz9I',
          },
        ],
      },
      {
        title: 'Spooky VR Jam 2020',
        image: '/images/portfolio/spooky_vr_jam_2020.png',
        alt: 'Spooky VR Jam 2020',
        pills: ['Unity', 'C#', 'VR', 'Game Jam', 'Open Source'],
        bullets: [
          'Game submission for Spooky VR Jam 2020',
          'Integration of Mixamo characters and animations',
          'Source code available on GitHub',
        ],
        links: [
          {
            label: 'itch.io',
            url: 'https://epaezrubio.itch.io/spooky-vr-jam-2020',
          },
          {
            label: 'GitHub',
            url: 'https://github.com/CuboidGames/Spooky-VR-Jam-2020',
          },
        ],
      },
      {
        title: 'Ludum Dare 46',
        image: '/images/portfolio/ludum_dare_46.png',
        alt: 'Ludum Dare 46',
        pills: ['Unity', 'C#', 'Game Jam', 'Open Source'],
        bullets: [
          'Game submision for Ludum Dare 46',
          'Integration of Unity cloud toolchain',
          'Crafted game design document prior to development',
        ],
        links: [
          {
            label: 'Ludum Dare',
            url: 'https://ldjam.com/events/ludum-dare/46/ktlo-keep-the-light-on',
          },
        ],
      },
    ],
  },
  {
    title: 'Libraries',
    items: [
      {
        title: 'PIXI Components',
        image: '/images/portfolio/pixi_components.png',
        alt: 'Pixi Components',
        pills: ['PIXI', 'TypeScript', 'Open Source'],
        bullets: [
          'Adaption of Unity component-based workflow and API to PIXI',
          'Incorporation of the latest Web Development toolchain',
        ],
        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/epaezrubio/pixi-components',
          },
        ],
      },
      {
        title: 'Rust UI',
        image: '/images/portfolio/rust_ui.png',
        alt: 'Rust UI',
        pills: ['SCSS', 'TypeScript', 'Open Source'],
        bullets: [
          'Recreated the UI components from the game Rust for the Web',
          'Storybook to live preview the UI components',
          'Bootstrap compatible',
        ],
        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/epaezrubio/pixi-components',
          },
          { label: 'Storybook', url: 'https://epaezrubio.github.io/rust-ui/' },
        ],
      },
    ],
  },
  {
    title: 'Other projects',
    items: [
      {
        title: 'Unity Experiments',
        image: '/images/portfolio/unity_experiments.png',
        alt: 'Unity Experiments',
        pills: ['Unity', 'C#', 'Open Source'],
        bullets: [
          'Quick prototyping of game mechanics',
          'Diverse standalone functionalities ready to be reused',
          'Test bench for Unity engine upgrades',
        ],
        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/epaezrubio/Unity-Experiments',
          },
        ],
      },
      {
        title: 'Portfolio Pacman',
        image: '/images/portfolio/portfolio_pacman.png',
        alt: 'Portfolio Pacman',
        pills: ['TypeScript', 'PIXI', 'Reactivity', 'Open Source'],
        bullets: [
          'Integration of web content and gameplay',
          'State driven with @vue/reacivity',
          'Inception',
        ],
        links: [
          {
            label: 'GitHub',
            url: 'https://github.com/epaezrubio/Portfolio-Pacman',
          },
        ],
      },
      {
        title: 'Curved Pong',
        image: '/images/portfolio/angled_pong.png',
        alt: 'Angled Pong',
        pills: ['JavaScript', 'Phaser', 'POC'],
        bullets: [
          'Proof of concept of pong with curling ball',
          'Playable from the browser, touch devices supported',
          'Rudimentary AI',
        ],
        links: [{ label: 'Link', url: 'https://lab.devpaezrubio.com/pong' }],
      },
      {
        title: 'Procedural City',
        image: '/images/portfolio/procedural_city.png',
        alt: 'Procedural City',
        pills: ['JavaScript', 'Three.js', 'Procedural Generation'],
        bullets: [
          'Experimenting with procedurally generated cities',
          'Controllable generation parameters with dat.gui',
        ],
        links: [
          {
            label: 'Link',
            url: 'https://lab.devpaezrubio.com/procedural_city/',
          },
        ],
      },
    ],
  },
];

export const portfolioLogos = {
  img: '/images/logos_map.png',
  imgWide: '/images/logos_map_wide.png',
  alt: 'Portfolio logos map',
};
