import pg from "pg";
const { Client } = pg;

export const handler = async (event) => {
    const idToDelete = event.pathParameteres.id;

    // connect to PostgreSQL RDS 
    const client = new Client({
        host: 'scx-test.cw4egqieaqh9.us-east-1.rds.amazonaws.com',
        user: 'scx_glue_user',
        port: 5432,
        password: 'Test3456',
        database: 'dcssupplierconnect'
    });

    try {
        await client.connect();
        const deleteQquery = 'DELETE FROM mdm_dbo.test_ui_scx WHERE id = $1';
        const result = await client.query(deleteQquery, [idToDelete]);

        if (result.rows.length === 0) {
            //no rows were updated, item not found
            return {
                statusCode: 404,
                body: JSON.stringify({ error: 'Item not found' })
            };
        } else {
            //successful update, return the updted item
            return {
                statusCode: 200,
                body: JSON.stringify(result.rows[0])
            };
        }
    } catch (error) {
        console.error('Error deleting item: ', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Internal Server Error' }),
        };
    } finally {
        await client.end();
    };
};