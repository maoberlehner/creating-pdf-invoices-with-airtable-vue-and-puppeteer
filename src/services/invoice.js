import airtableBase from '../utils/airtable';

const TABLE = `Invoices`;

// eslint-disable-next-line import/prefer-default-export
export async function findByInvoiceId(id) {
  const result = await airtableBase(TABLE).select({
    filterByFormula: `{Invoice ID} = '${id}'`,
  }).all();

  return result[0];
}
