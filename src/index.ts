import core from '@actions/core';
import pinataSDK from '@pinata/sdk';

(async function iife() {
  try {
    const apiKey = core.getInput('pinata-api-key');
    const apiSecret = core.getInput('pinata-secret-api-key');
    const fileToPin = core.getInput('file-to-pin');

    const pinata = pinataSDK(apiKey, apiSecret);

    // Test connection. Throws if authentication fails.
    await pinata.testAuthentication();

    const pinResult = await pinata.pinFromFS(fileToPin);

    core.setOutput("hash", pinResult.IpfsHash);
    core.setOutput("pinSize", pinResult.PinSize);
    core.setOutput("timestamp", pinResult.Timestamp);
  }
  catch (error: any) {
    core.setFailed(error?.message);
  }
})();
