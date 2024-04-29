import { createConfig } from "wagmi";
import { getDefaultConfig } from "connectkit";
import { hardhat, scrollSepolia } from "wagmi/chains";

export const config = createConfig(
  getDefaultConfig({
    // Required API Keys
    // alchemyId: process.env.ALCHEMY_ID,
    walletConnectProjectId: process.env.WALLETCONNECT_PROJECT_ID || "",
    chains: [scrollSepolia],

    // Required
    appName: "SBTify",

    // Optional
    appDescription: "",
  })
);
