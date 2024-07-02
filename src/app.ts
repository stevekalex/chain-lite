import express from 'express';
const fs = require('fs');
const app = express();
const CryptoJS = require('crypto-js');
import { Wallet } from 'ethers'
require('dotenv').config();

const passphrase = process.env.PASSPHRASE;
const PORT = 3000

app.listen(PORT, () => {
  return console.log(`Express is listening at http://localhost:${PORT}`);
});

/*
Creates an ethereum wallet and encrypts it using a passphrase
*/
const createWallet = () => {
  // 1 create a random wallet
  const wallet = Wallet.createRandom();

  // 2 encrypt the wallet private key using a passphrase
  const encryptedPrivateKey = CryptoJS.AES.encrypt(wallet.privateKey, passphrase).toString();

  // 3 save wallet details to a file
  const walletData = {
    address: wallet.address,
    encryptedPrivateKey: encryptedPrivateKey,
    mnemonic: wallet.mnemonic.phrase,
  };

  // 4 
  fs.writeFileSync('wallet.json', JSON.stringify(walletData, null, 2));
}

const loadExistingWalletFromMnemoic = async (mnemonic: string) => {
  try {
    const walletFromMnemonic = Wallet.fromPhrase(mnemonic);
    return walletFromMnemonic
  } catch (e) {
    throw Error(`Unable to retrieve wallet from Mnemomic: ${e.message}`)
  }
}

const loadExistingWalletFromPrivateKey = (privateKey: string) => {
  try {
    const walletFromPrivateKey = new Wallet(privateKey);
    return walletFromPrivateKey
  } catch (e) {
    throw Error(`Unable to retrieve wallet from private key: ${e.message}`)
  }
}


