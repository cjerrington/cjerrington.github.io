---
title: Jellyfin and SSL
description: How to secure your jellyfin server with ssl
date: 2025-01-19
tags: 
  - media server
  - selfhost
  - 100DaysToOffload
---

Selfhosting your media is always a fun choice. We all have various media from music to movies and an open source project like [Jellyfin](https://jellyfin.org/) makes it easy to take that from sitting on your hard drive to being watched on your TV.

It is debatable if using a secure protocol on your own local network is needed, but if it is possible and easy to setup, why not? Jellyfin makes this really simple to get started.

Many clients and computers look for the secure connection first when doing auto discover and setup, especially for login pages.

## Creating the SSL Certificate

First we will need to install OpenSSL.

1. Create the private key.
    ```shell
    openssl req -x509 -newkey rsa:4096 -keyout ./privatekey.pem -out cert.pem \
    -days 365 -nodes -subj '/CN=jellyfin.local'
    ```

    - The `-subj '/CN=localdnsname.tld'` is the DNS name you've made on your network to use to connect to Jellyfin in a browser like `jellfin.local`
    - You can add more than on domain name if needed if the DNS is different for internal access from external access. Add the `-addtext` switch to the command.
    ```shell
    -addext "subjectAltName = DNS:jellfinexternal.tld,DNS:jellyfin.local"
    ```
2. Jellyfin requires the SSL certificate to be a PFX file that contains the private key and certificate file.

    ```shell
    openssl pkcs12 -export -out jellyfin.pfx -inkey .\privatekey.pem \
    -in .\cert.pem -passout pass:jellyfin.local
    ```

## What's happening

In the first command it creates a private key (`privatekey.pem`) and the certificate file (`cert.pem`). The second command takes these two files and combines them to the `jellfin.pfx` file. A PFX file is a certificate file that contains the certificate and private key information in one file and makes using this format for a web application easier since it's one file that holds this information.

This makes leaving this file on a file system safer since you need the password in order to use it. The `privatekey.pem` and `cert.pem` are in plain text and are able to be used if both files are available for other purposes.

## Adding the certificate to Jellyfin

Now that we have our PFX file created, we need to install it to Jellyfin.

1. From the web interface log into your Jellyfin server.
2. Browse to Settings
3. Browse to Administration > Dashboard
4. Browse to Advanced > Networking

Ensure the Enable HTTPS is checked under Server Address Settings. The default port is 8920.

Under HTTPS Settings enter the path to the PFX file for the Customer SSL Certificate. Enter the certificate password as well from the creation of the certificate.

Makes sure to save. Now it is a good idea to stop your Jellyfin server and start it again.

It might take a minute for the restart to happen. Try browsing to you Jellyfin server on the SSL port and DNS if available. Checking the IP first to ensure the service is responding on the port.

If it loads the Jellyfin web interface you'll be asked to sign in if required and now your server is using HTTPS! If the Jellyfin service on the SSL port is not loading, check the HTTP port. Also the logs Jellyfin creates during the startup will have good error logging too, and troubleshoot accordingly.

## Updating the certificate

If you followed the example, the certificate is valid for 365 days, and you will need to renew this at that time. I've found re-running the steps is the best way to renew the cert. You may reuse the password if you remember it. If it changes, make sure it's updated in Jellyfin as well.

There is not a way to extend an expiration date in a certificate as it is built into the certificate and changing the date will then also change the encryption of the certificate and will not match the previously created one.

There is a way to create the certificate with a really long expiration, or not at all.

Using the `-days 365` tells how long the certificate will be valid for. Omitting this from the creation will not have an expiration. It is still good practice to have an expiration date.

## Conclusion

This was a really simple process, and Jellyfin [Networking](https://jellyfin.org/docs/general/networking/) page has a lot more information on the use of SSL and their product.
