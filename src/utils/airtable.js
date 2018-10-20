import Airtable from 'airtable';

// WARNING: This API key gives full access
// to your Airtable account!
// Do not expose this to the public! Don't
// use this API key in a public facing
// client side application!
const API_KEY = `YOUR-API-KEY`;
const BASE_ID = `appX14nhkIr0iPp5M`;

export default new Airtable({ apiKey: API_KEY }).base(BASE_ID);
