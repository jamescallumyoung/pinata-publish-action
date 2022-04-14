import core from '@actions/core';
import pinataSDK from '@pinata/sdk';

(async function iife() {
  try {
    console.log('Reading inputs...');
    const apiKey = 'foob'; // core.getInput('pinata-api-key');
    const apiSecret = 'barb'; // core.getInput('pinata-secret-api-key');
    const fileToPin = 'package.json'; // core.getInput('file-to-pin');

    console.log('Connecting to Pinata...');
    const pinata = pinataSDK(apiKey, apiSecret);

    // Test connection. Throws if authentication fails.
    console.log('Testing connection...');
    await pinata.testAuthentication();

    const pinResult = await pinata.pinFromFS(fileToPin);

    console.log('Setting outputs...');
    core.setOutput("hash", pinResult.IpfsHash);
    core.setOutput("pinSize", pinResult.PinSize);
    core.setOutput("timestamp", pinResult.Timestamp);

    console.log('Done!');
  }
  catch (error: any) {
    core.setFailed(JSON.stringify(error));
  }
})();
