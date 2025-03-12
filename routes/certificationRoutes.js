const express = require('express');
const router = express.Router();
const {
    createCertification,
    getAllCertifications,
    getCertificationById,
    updateCertification,
    deleteCertification
} = require('../controllers/certificationController'); // Destructure methods
const authMiddleware = require("../middleware/authMiddleware"); // Use the authentication middleware

router.post('/', authMiddleware, createCertification);
router.get('/', authMiddleware, getAllCertifications);
router.get('/:id', authMiddleware, getCertificationById);
router.put('/:id', authMiddleware, updateCertification);
router.delete('/:id', authMiddleware, deleteCertification);

module.exports = router;
