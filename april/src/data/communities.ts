export type Community = {
  name: string;
  members: number;
  image?: string;
  link: string;
};

// Do you want to add a community? Do a pull request!
export default <Community[]>[
  {
    name: "Ballerini",
    members: 400038,
    image:
      "https://cdn.discordapp.com/icons/789888698673922078/a_6b890fb195091e8113a41a8975a61fdc.gif",
    link: "https://discord.gg/ballerini",
  },
  {
    name: "Rocketseat",
    members: 221000,
    image:
      "https://cdn.discordapp.com/icons/327861810768117763/a_86d8605d7ede97bc45a6ad97c7b6d0b5.webp",
    link: "https://discord.gg/rocketseat",
  },
  {
    name: "Montano Community",
    members: 16000,
    image: "https://cdn.discordapp.com/icons/561997286087852118/dacb32782a385953a4f3196c9cfdb1f6.webp",
    link: "https://discord.gg/eeFCpQNtSR"
  },
  {
    name: "Futuros Dev's",
    members: 2082,
    image: "https://cdn.discordapp.com/icons/1004527920322203718/057bafa75c50d0e2579c56620458eb40.webp",
    link: "https://discord.gg/jHh82pmFPd" 
  }
];
