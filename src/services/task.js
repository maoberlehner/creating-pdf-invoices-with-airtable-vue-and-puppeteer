import airtableBase from '../utils/airtable';

const TABLE = `Tasks`;

// eslint-disable-next-line import/prefer-default-export
export function find(id) {
  return airtableBase(TABLE).find(id);
}
