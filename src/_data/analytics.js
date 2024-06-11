const EleventyFetch = require("@11ty/eleventy-fetch");
require('dotenv').config();

module.exports = async function () {

    const token = await fetch(`https://${process.env.UMAMI_ANALYTICS_HOST}/api/auth/login`, {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
      
        //make sure to serialize your JSON body
        body: JSON.stringify({
          "username": `${process.env.UMAMI_ANALYTICS_USER}`,
          "password": `${process.env.UMAMI_ANALYTICS_PASS}`
        })
    }).then( ( response) => { 
        return response.json();
    }).then(function(data){
        //do something awesome that makes the world a better place
        return data.token
    });

    const today = new Date().getTime();
    const priorDate = new Date(new Date().setDate(new Date().getDate() - 30));

    let url = `https://${process.env.UMAMI_ANALYTICS_HOST}/api/websites/${process.env.UMAMI_ANALYTICS_WEBSITE_ID}/metrics?startAt=${priorDate.getTime()}&endAt=${today}&type=url`;

	/* This returns a promise */
	return EleventyFetch(url, {
        duration: "1d", // save for 1 day
        type: "json", // we’ll parse JSON for you
        fetchOptions: {
            headers: { Authorization: `Bearer ${token}` },
        }
	});
};