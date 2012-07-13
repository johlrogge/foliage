var config = module.exports;

config["browser tests"] = {
    environment: "browser",
    sources: ["lib/**/*.js"],
    tests: ["test/*.js"],
    libs: ["lib/curl-0.6/curl.js", "loaderconf.js"],
    extensions: [require("buster-amd")]
};


