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
        const result = await client.query('SELECT * FROM mdm_dbo.Scx_copy_subs_DQ_inputs');
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
        const insertQuery = 'INSERT INTO mdm_dbo.Scx_copy_subs_DQ_inputs (data_source, subscription_id, sc_id, SCX_id, commodity_1, commodity_2, commodity_3, po_email, rem_email, payterm, missing_values, processing_status, updated_by) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *';
        const values = [requestBody.data_source, requestBody.subscription_id, requestBody.sc_id, requestBody.SCX_id, requestBody.commodity_1, requestBody.commodity_2, requestBody.commodity_3, requestBody.po_email, requestBody.rem_email, requestBody.payterm, requestBody.missing_values, requestBody.processing_status, requestBody.updated_by];
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
        const query = 'UPDATE mdm_dbo.Scx_copy_subs_DQ_inputs SET data_source = $1, subscription_id = $2, sc_id = $3, SCX_id = $4, commodity_1 = $5, commodity_2 = $6, commodity_3 = $7, po_email = $8, rem_email = $9, payterm = $10, missing_values = $11, processing_status = $12, updated_by = $13 WHERE id = $14 RETURNING *;';
        const values = [data.data_source, data.subscription_id, data.sc_id, data.SCX_id, data.commodity_1, data.commodity_2, data.commodity_3, data.po_email, data.rem_email, data.payterm, data.missing_values, data.processing_status, data.updated_by, itemId]; // Update with your new value

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
    try {
        const idToDelete = event.pathParameters.id;
        const deleteQquery = 'DELETE FROM mdm_dbo.Scx_copy_subs_DQ_inputs WHERE id = $1';
        const result = await client.query(deleteQquery, [idToDelete]);
        return {
            statusCode: 200,
            body: JSON.stringify(result.rows),
        };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error deleting data from PostgreSQL', error }),
        };
    }
};



