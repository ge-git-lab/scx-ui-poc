import pg from "pg";
const { Client } = pg;

export const handler = async (event, context) => {
    // connect to PostgreSQL RDS 
    const client = new Client(
        {
            host: 'scx-test.cw4egqieaqh9.us-east-1.rds.amazonaws.com',
            user: 'scx_glue_user',
            port: 5432,
            password: 'Test3456',
            database: 'dcssupplierconnect'
        }
    );
    try {
        await client.connect();

        const { id } = event.pathParameters;
        const { name, email, phone, address, description } = JSON.parse(event.body);

        //postgresSQL query logic
        const updateQuery = `UPDATE mdm_dbo.test_ui_scx SET name = $1, email = $2, phone = $3, address = $4, description = $5 WHERE id = $6 RETURNING *;`;
        const values = [name, email, phone, address, description, id];

        const result = await client.query(updateQuery, values);
        const updatedData = result.rows[0];

        return {
            statusCode: 200,
            body: JSON.stringify(updatedData),
        };

    } catch (err) {
        console.error('Error is:', err.message)
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Internal Server Error' }),
        };
    } finally {
        await client.end()
    }
}