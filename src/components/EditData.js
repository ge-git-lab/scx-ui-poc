import pg from "pg";
const { Client } = pg;

// Lambda handler function
exports.handler = async (event) => {
    // Assuming the incoming event has information needed for the update
    const { itemId, updatedData } = JSON.parse(event.body);

    // PostgreSQL connection parameters
    const dbParams = {
        host: 'scx-test.cw4egqieaqh9.us-east-1.rds.amazonaws.com',
        user: 'scx_glue_user',
        port: 5432,
        password: 'Test3456',
        database: 'dcssupplierconnect'
    };

    const client = new Client(dbParams);

    try {
        await client.connect();

        // PostgreSQL UPDATE query
        const updateQuery = `UPDATE mdm_dbo.test_ui_scx SET name = $1, email = $2, phone = $3, address = $4, description =$5 WHERE id = $6 RETURNING *;`;
        const result = await client.query(updateQuery, [updatedData, itemId]);

        // Log the updated item
        console.log('Updated Item:', result.rows[0]);

        // Return a success response
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Item updated successfully',
                updatedItem: result.rows[0],
            }),
        };
    } catch (error) {
        console.error('Error updating item:', error);

        // Return an error response
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: 'Error updating item',
                error: error.message,
            }),
        };
    } finally {
        await client.end();
    }
};
