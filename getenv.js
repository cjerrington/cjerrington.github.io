const dotenv = require('dotenv')
const path = require("path");

dotenv.config({ path: path.resolve(__dirname, '.env') });

const requiredEnvVars = [
  'UMAMI_ANALYTICS_HOST', 
  'UMAMI_ANALYTICS_USER', 
  'UMAMI_ANALYTICS_PASS', 
  'UMAMI_ANALYTICS_WEBSITE_ID', 
  'OV_API_KEY'
]

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if ( missingVars.length > 0 ) {
  console.error('The following environment variables are missing:');
  missingVars.forEach(varName => console.error(`- ${varName}`));
  console.error('Please add required environment variables before continuing...');
  process.exit(1);
}else{
  console.log('All required Environment variables are set!')
}