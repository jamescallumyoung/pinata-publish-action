import * as core from '@actions/core';
import pinataSDK from '@pinata/sdk';

(async function iife() {
  try {
    console.log('Reading inputs...');
    const inputOptions: core.InputOptions = { required: false, trimWhitespace: false };
    const apiKey = core.getInput('pinata-api-key', inputOptions);
    const apiSecret = core.getInput('pinata-secret-api-key', inputOptions);
    const fileToPin = core.getInput('file-to-pin', inputOptions);

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
    console.log('... an error occurred in this step.');
    core.setFailed(JSON.stringify(error));
  }
})();
