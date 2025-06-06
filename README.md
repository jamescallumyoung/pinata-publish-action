> Deprecated in favor of `ipfs-deploy-action` by Interplanetary Shipyard. Their action provides the same functionality and more.
>
> Use https://github.com/ipshipyard/ipfs-deploy-action instead.

# Pinata Publish Action

> A GitHub Action for publishing files to the IPFS using Pinata.

Pinata is an IPFS gateway and pinning service. This GitHub Action uses
the Pinata API to pin files to the IPFS.

## How to use this Action

Create a workflow file, using the action. An example using GitHub Secrets to
store the Pinata API Key and Secret API Key follows:

```yml
jobs:
  pin_pinata_job:
    runs-on: ubuntu-latest
    name: Pin with Pinata
    steps:
      - name: Pin
        id: pin
        uses: jamescallumyoung/pinata-publish-action@v0.1.0
        with:
          pinata-api-key: ${{ secrets.API_KEY }}
          pinata-secret-api-key: ${{ secrets.API_SECRET }}
          file-to-pin: <your-file-path>
      - name: Get the timestamp
        run: echo "The timestamp of the pin is ${{ steps.pin.outputs.timestamp }}"
      - name: Get the hash
        run: echo "The hash of the pin is ${{ steps.pin.outputs.hash }}"
```
