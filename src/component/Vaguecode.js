import pg from 'pg';
const { Pool } = pg;
const pool = new Pool({
    host: 'scx-test.cw4egqieaqh9.us-east-1.rds.amazonaws.com',
    user: 'scx_glue_user',
    port: 5432,
    password: 'Test3456',
    database: 'dcssupplierconnect'
})
const client = await pool.connect();
const headers = {
    'Access-Control-Allow-Origin': '*', // Allow requests from any origin
    'Access-Control-Allow-Headers': 'Content-Type', // Allow only Content-Type header
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE', // Allow only GET requests
};

export const handler = async (event) => {
    const method = event.httpMethod;
    switch (method) {
        case 'GET':
            return getHandler();
        case 'POST':
            return postHandler(event);
        case 'PUT':
            return putHandler(event);
        case 'DELETE':
            return deleteHandler(event);
        default:
            return {
                statusCode: 400,
                body: JSON.stringify({ message: 'Invalid HTTP method' }),
            };
    }
};

// Example GET Handler
const getHandler = async () => {
    try {
        console.log('Data is correct here')
        const result = await client.query('SELECT data_source, subscription_id, scid, address_scid, commodity_1, commodity_2, commodity_3, po_email, rem_email, payterm, missing_values, processing_status, updated_by, updated_at FROM mdm_dbo.Scx_copy_subs_DQ_inputs');
        console.log(result);
        const response = {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.rows)
        }
        
        return response;
    } catch (err) {
        console.error('Error retreieving data', err.message)
        const response = {
            statusCode: 500,
            body: JSON.stringify({
                error: 'Internal Server Error'
            }),
        };
        return response;
    }
};

// Example POST Handler
const postHandler = async (event) => {
    try {
        const requestBody = JSON.parse(event.body);
        const insertQuery = 'INSERT INTO mdm_dbo.Scx_copy_subs_DQ_inputs (data_source, subscription_id, scid, address_scid, commodity_1, commodity_2, commodity_3, PO_email, Rem_email, Payterm, Missing_values, Processing_status, updated_by, updated_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *';
        const values = [requestBody.data_source, requestBody.Subscription_id, requestBody.scid, requestBody.address_scid, requestBody.Commodity_1, requestBody.Commodity_2, requestBody.Commodity_3, requestBody.PO_email, requestBody.Rem_email, requestBody.Payterm, requestBody.Missing_values, requestBody.Processing_status, requestBody.updated_by, requestBody.updated_at];
        await client.query(insertQuery, values)

        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ message: 'Data inserted successfully' })
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error inserting data into PostgreSQL', error }),
        };
    }
};

//PUT Handler
const putHandler = async (event) => {
    try {
        const data = JSON.parse(event.body);
        const itemId = event.pathParameters.id;
        const query = 'UPDATE mdm_dbo.Scx_copy_subs_DQ_inputs SET data_source = $1, Subscription_id = $2, scid = $3, address_scid = $4, Commodity_1 = $5, Commodity_2 = $6, Commodity_3 = $7, PO_email = $8, Rem_email = $9, Payterm = $10, Missing_values = $11, Processing_status = $12, updated_by = $13, updated_at = $14  WHERE id = $15 RETURNING *;';
        const values = [data.data_source, data.Subscription_id, data.scid, data.address_scid, data.Commodity_1, data.Commodity_2, data.Commodity_3, data.PO_email, data.Rem_email, data.Payterm, data.Missing_values, data.Processing_status, data.updated_by, data.updated_at, itemId]; // Update with your new value

        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Item not found' })
            };
        } else {
            return {
                statusCode: 200,
                body: JSON.stringify(result.rows[0])
            };
        }
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error updating data in PostgreSQL', error }),
        };
    }
};

//DELETE Handler
const deleteHandler = async (event) => {
    const headers = {
        'Access-Control-Allow-Origin': '*', // Replace with the actual origin of your React app
        'Access-Control-Allow-Methods': 'DELETE',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Headers': 'Content-Type'
      };
    try {
        const idToDelete = event.pathParameters.id;
        const deleteQquery = 'DELETE FROM mdm_dbo.Scx_copy_subs_DQ_inputs WHERE id = $1';
        const result = await client.query(deleteQquery, [idToDelete]);
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify(result.rows),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting data from PostgreSQL', error }),
        };
    }
};



