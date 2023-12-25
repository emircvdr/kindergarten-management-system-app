

export const getHome = async (req, res) => {
    try {
        
        const returnData = {
            "author": "Pedasoft",
            "message": "Kindergarten Management System API!"
        }
        res.status(200).json(returnData);

    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
}