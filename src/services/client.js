import airtableBase from '../utils/airtable';

const TABLE = `Clients`;

// eslint-disable-next-line import/prefer-default-export
export function find(id) {
  return airtableBase(TABLE).find(id);
}
