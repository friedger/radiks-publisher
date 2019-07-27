#!/usr/bin/env node

var blockstack = require("blockstack");
var radiks = require("radiks");
var LocalStorage = require("node-localstorage").LocalStorage;
localStorage = new LocalStorage("./scratch");

/**
 * SET THESE VALUES AS REQUIRED:
 * domain
 * radiksServer
 * sessionData
 */
// the url of the app
const domain = "https://app-center.openintents.org";
const radiksServer = "https://app-center.herokuapp.com";
// the session can be copied from the local storage of an existing session
const sessionData = {
  version: "1.0.0",
  userData: {
    username: "clofo.id.blockstack",
    profile: {
      "@type": "Person",
      "@context": "http://schema.org",
      apps: {
        "https://app.graphitedocs.com":
          "https://gaia.blockstack.org/hub/1Fuzd6sJXqtXhgoFpb8W19Ao4BCG3EHQGf/",
        "https://www.stealthy.im":
          "https://gaia.blockstack.org/hub/1LEx1yiPhtsrDCaA5XXpCLoM3tVgm3RupF/",
        "https://app.afari.io":
          "https://gaia.blockstack.org/hub/1P3pU6TisikY8pjUYrAMCuMXm7dAmPHYod/",
        "https://chat.openintents.org":
          "https://gaia.blockstack.org/hub/1MXihuWr4JD7p31DPX73eG1QvN7R5p29Dn/",
        "https://gekri.com":
          "https://gaia.blockstack.org/hub/1BFWhxirpeg9DYB6dNd7tit573xAL3ix7a/",
        "http://127.0.0.1:8000":
          "https://gaia.blockstack.org/hub/1653npAmACLQDWYe1cV8MHqndn7hiGi6Qq/",
        "https://justsnake.live":
          "https://gaia.blockstack.org/hub/1KMG8ePMrWpm3oViNXWnMcUYM6M3wYpRBj/",
        "https://app.dmail.online":
          "https://gaia.blockstack.org/hub/14mXLi4XnpLhHjwqQHhcmnVG422GQJJXre/",
        "https://app-center.openintents.org":
          "https://gaia.blockstack.org/hub/1KYnb2bHswkKPaxj9wDMSA9m6dX2hQ4FsZ/"
      },
      image: [
        {
          "@type": "ImageObject",
          name: "avatar",
          contentUrl:
            "https://gaia.blockstack.org/hub/12Gpr9kYXJJn4fWec4nRVwHLSrrTieeywt//avatar-0"
        }
      ],
      name: "fm",
      api: {
        gaiaHubConfig: { url_prefix: "https://gaia.blockstack.org/hub/" },
        gaiaHubUrl: "https://hub.blockstack.org"
      }
    },
    email: null,
    decentralizedID: "did:btc-addr:12Gpr9kYXJJn4fWec4nRVwHLSrrTieeywt",
    identityAddress: "12Gpr9kYXJJn4fWec4nRVwHLSrrTieeywt",
    appPrivateKey:
      "APP_PRIVATE_KEY",
    coreSessionToken: null,
    authResponseToken:
      "AUTH_RESPONSE_TOKEN",
    hubUrl: "https://hub.blockstack.org",
    gaiaAssociationToken:
      "GAIA_ASSOCIATE_TOKEN",
    gaiaHubConfig: {
      url_prefix: "https://gaia.blockstack.org/hub/",
      address: "1KYnb2bHswkKPaxj9wDMSA9m6dX2hQ4FsZ",
      token:
        "GAIATOKEN",
      server: "https://hub.blockstack.org"
    }
  },
  transitKey: "TRANSITKEY"
};

function createSession(domain) {
  const appConfig = new blockstack.AppConfig([], domain);
  return new blockstack.UserSession({ appConfig });
}

const session = createSession(domain);
session.store.setSessionData(sessionData);

radiks.configure({
  apiServer: radiksServer,
  userSession: session
});

radiks.User.createWithCurrentUser().then(u => {
  console.log("user created", u);
});

/**
 * Create content and publish
 */
class UserComment extends radiks.Model {}

UserComment.className = "UserComment";
UserComment.schema = {
  object: {
    type: String,
    decrypted: true
  },
  rating: {
    type: Number,
    decrypted: true
  },
  comment: {
    type: String,
    decrypted: true
  }
};
UserComment.validateUsername = true;

console.log("creating new content");

const model = new UserComment({
  object: "https://planet.friedger.de",
  rating: 3,
  comment: "An animal kingdom app with a monsterous twist"
});
model.save().then(() => {
  console.log("model published");
});
