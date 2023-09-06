const pullMyWebFinger = async ( domain, user ) => {
    const url = `https://${ domain }/.well-known/webfinger?resource=acct:${ user }@${ domain }`;
    const res = await fetch( url );
    const body = await res.text();
    const profile = JSON.parse( body );
    console.log( profile );
  };
  
  pullMyWebFinger( "claytonerrington.com", "cjerrington" );
  