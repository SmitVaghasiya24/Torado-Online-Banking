import db from "../config/db.js";

const generateSlug = (text) => {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};

export const addDocument = async (req, res) => {
    try {
        const {
            title,
            related_type = "general",
            related_id = null,
        } = req.body;

        const created_by = req.admin_id || null;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "PDF file is required",
            });
        }

        const slug = generateSlug(title);

        const file_name = req.file.filename;
        const file_path = `uploads/documents/${file_name}`;

        await db.query(
            "CALL sp_add_document(?, ?, ?, ?, ?, ?, ?)",
            [
                title,
                slug,
                file_name,
                file_path,
                related_type,
                related_id,
                created_by,
            ]
        );

        return res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
        });

    } catch (error) {
        console.error("Add Document Error:", error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Document with same title already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};





export const getDocuments = async (req, res) => {
    try {
        const [rows] = await db.query("CALL sp_get_documents()");
        const documents = rows[0];

        const baseUrl = `${req.protocol}://${req.get("host")}`;

        const updatedDocuments = documents.map((doc) => ({
            ...doc,
            file_url: `${baseUrl}/${doc.file_path}`,
        }));

        return res.status(200).json({
            success: true,
            data: updatedDocuments,
        });

    } catch (error) {
        console.error("Get Documents Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};




export const updateDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const {
            title,
            related_type = "general",
            related_id = null,
        } = req.body;

        const updated_by = req.admin_id || null;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Document id is required",
            });
        }

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required",
            });
        }

        const slug = generateSlug(title);

        let file_name = null;
        let file_path = null;

        if (req.file) {
            file_name = req.file.filename;
            file_path = `uploads/documents/${file_name}`;
        } else {
            const [rows] = await db.query(
                "SELECT file_name, file_path FROM tbl_documents WHERE id = ?",
                [id]
            );

            if (!rows.length) {
                return res.status(404).json({
                    success: false,
                    message: "Document not found",
                });
            }

            file_name = rows[0].file_name;
            file_path = rows[0].file_path;
        }

        await db.query(
            "CALL sp_update_document(?, ?, ?, ?, ?, ?, ?, ?)",
            [
                id,
                title,
                slug,
                file_name,
                file_path,
                related_type,
                related_id,
                updated_by,
            ]
        );

        return res.status(200).json({
            success: true,
            message: "Document updated successfully",
        });

    } catch (error) {
        console.error("Update Document Error:", error);

        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({
                success: false,
                message: "Document with same title already exists",
            });
        }

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};







export const deleteDocument = async (req, res) => {
    try {
        const { id } = req.params;
        const updated_by = req.admin_id || null;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Document id is required",
            });
        }

        await db.query(
            "CALL sp_delete_document(?, ?)",
            [id, updated_by]
        );

        return res.status(200).json({
            success: true,
            message: "Document deleted successfully",
        });

    } catch (error) {
        console.error("Delete Document Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
