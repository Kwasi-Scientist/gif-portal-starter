import React, { useEffect, useState, useMemo } from 'react';
import twitterLogo from './assets/twitter-logo.svg';
import './App.css';

//import { Connection, SystemProgram, clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { WalletModalProvider, WalletDisconnectButton, WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import {
  CoinbaseWalletAdapter,
  GlowWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl } from "@solana/web3.js";
import { createDefaultAuthorizationResultCache, SolanaMobileWalletAdapter } from '@solana-mobile/wallet-adapter-mobile';
import "@solana/wallet-adapter-react-ui/styles.css";

import { PublicKey } from '@solana/web3.js';
import { useWallet } from '@solana/wallet-adapter-react';
//import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

// Default styles that can be overridden by your app
require('@solana/wallet-adapter-react-ui/styles.css');

// Constants
const TWITTER_HANDLE = '_buildspace';
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const TEST_GIF = [
  'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
	'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
	'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
	'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp'
]









const App= ({ Component, pageProps }) => {

  
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;

    // This will fetch the users' public key (wallet address) from any wallet we support
    const { PublicKey } = useWallet();

    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            new SolanaMobileWalletAdapter({
                appIdentity: { name: 'Solana Wallet Adapter App' },
                authorizationResultCache: createDefaultAuthorizationResultCache(),
            }),
            new CoinbaseWalletAdapter(),
            new PhantomWalletAdapter(),
            new GlowWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter({ network }),
            new TorusWalletAdapter(),
        ],
        [network]
    );



    //state
const [walletAddress, setWalletAddress] = useState(null);





const renderNotConnectedContainer = () => (
  <div>
    <img src="https://media.giphy.com/media/eSwGh3YK54JKU/giphy.gif" alt="emoji" />

    <div className="button-container">

    <ConnectionProvider endpoint={endpoint}>
          <WalletProvider wallets={wallets} autoConnect>
              <WalletModalProvider>
                  <WalletMultiButton />
                  <WalletDisconnectButton />
                  { /* Your app's components go here, nested within the context providers. */ }
              </WalletModalProvider>
          </WalletProvider>
      </ConnectionProvider>

    </div>    
  </div>
);

const renderConnectedContainer = () => (
  <div className="connected-container">
    <div className="nft-grid">
      {TEST_GIF.map(gif => (
        <div className="nft-item" key={gif}>
          <img src={gif} alt={gif} />
        </div>
      ))}
    </div>
  </div>
)





  
  return (
    <div className="App">
      <div className="container">
        <div className="header-container">
          <p className="header">🖼 GIF Portal</p>
          <p className="sub-text">
            View your GIF collection in the metaverse ✨
          </p>
          <main>

          
            {/* We only render the connect button if public key doesn't exist */}
            {PublicKey ? 'Connected!' : renderNotConnectedContainer()}
          {walletAddress && renderConnectedContainer()}
          </main>
        </div>
        <div className="footer-container">
          <img alt="Twitter Logo" className="twitter-logo" src={twitterLogo} />
          <a
            className="footer-text"
            href={TWITTER_LINK}
            target="_blank"
            rel="noreferrer"
          >{`built on @${TWITTER_HANDLE}`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
