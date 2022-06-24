import { Handler } from '@netlify/functions'

if (!process.env.NETLIFY) {
  require('dotenv').config();
}

// required env vars
if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)
  throw new Error('no GOOGLE_SERVICE_ACCOUNT_EMAIL env var set');
if (!process.env.GOOGLE_PRIVATE_KEY)
  throw new Error('no GOOGLE_PRIVATE_KEY env var set');
if (!process.env.GOOGLE_SPREADSHEET_ID_FROM_URL)
  // spreadsheet key is the long id in the sheets URL
  throw new Error('no GOOGLE_SPREADSHEET_ID_FROM_URL env var set');

import { GoogleSpreadsheet } from 'google-spreadsheet'

export const handler: Handler = async (event, context) => {
  const UserIP = event.headers['x-nf-client-connection-ip'] || '6.9.6.9'; // not required, i just feel like using this info

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID_FROM_URL);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n')
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[0];
  // console.log('accessing ', sheet.title, 'it has ', sheet.rowCount, ' rows');
 
  const path = event.path.replace(/\.netlify\/functions\/[^/]+/, '');
  const segments = path.split('/').filter((e) => e);

  try {
    switch (event.httpMethod) {
      case 'GET':
        if (segments.length === 0) {
          const rows = await sheet.getRows();
          const serializedRows = rows.map(serializeRow)
          return {
            statusCode: 200,
            body: JSON.stringify(serializedRows)
          };
        } else if (segments.length === 1) {
          const rowId = segments[0];
          const rows = await sheet.getRows();
          const srow = serializeRow(rows[rowId]);
          return {
            statusCode: 200,
            body: JSON.stringify(srow)
          }
        } else {
          throw new Error('too many segments in GET request');
        }
      case 'POST':
        const data = JSON.parse(event.body);
        data.UserIP = UserIP;
        const addedRow = await sheet.addRow(data);
        return {
          statusCode: 200,
          body: JSON.stringify({
            message: `POST Success - added row ${addedRow._rowNumber - 1}`,
            rowNumber: addedRow._rowNumber - 1 // minus the header row
          })
        };
      case 'PUT':
        if (segments.length === 0) {
          console.error('PUT request must also have an id'); 
          return {
            statusCode: 422,
            body: 'PUT request must also have an id.'
          };
        } else if (segments.length === 1) {
          const rowId = segments[0]
          const rows = await sheet.getRows();
          const data = JSON.parse(event.body);
          data.UserIP = UserIP;
          console.log(`PUT invoked on row ${rowId}`, data);
          const selectedRow = rows[rowId];
          Object.entries(data).forEach(([k, v]) => {
            selectedRow[k] = v;
          });
          await selectedRow.save(); // save updates
          return {
            statusCode: 200,
            body: JSON.stringify({ message: 'PUT is a success!' })
            // body: JSON.stringify(rows[rowId]) // just sends less data over the wire
          };
        } else {
          return {
            statusCode: 500,
            body: 'too many segments in PUT request'
          }
        }
      case 'DELETE' :
        if (segments.length === 1) {
          const rows = await sheet.getRows();
          const rowId = segments[0];
          if(rows.length > 1 && rowId != '0') {
            await rows[rowId].delete();
            return {
              statusCode: 200,
              body: JSON.stringify({ message: 'DELETE is a success!' })
            }
          } else {
            return {
              statusCode: 200,
              body: JSON.stringify({
                message: 'no rows left to delete! (first row is sacred)'
              })
            };
          }
        } else {
          return {
            statusCode: 500,
            body: JSON.stringify({
              message:
                'invalid segments in DELETE request, must be /.netlify/functions/google-spreadsheet-fn/123456'
            })
          };
        }
      default: 
        return {
          statusCode: 500,
          body: 'unrecognized HTTP Method'
        };
    }
  } catch (err) {
    console.error('error occured in processing ', event);
    console.error(err);
    return {
      statusCode: 500,
      body: err.toString()
    }
  }

  function serializeRow(row) {
    let temp = {};
    sheet.headerValues.map((header) => {
      temp[header] = row[header]
    });
    return temp;
  }
  
}


