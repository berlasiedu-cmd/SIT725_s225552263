const express = require('express');
const router = express.Router();

// Calculation function
function multiply(a, b) {
    return a * b;
}

router.get('/multiply', (req, res) => {
    const a = parseFloat(req.query.a);
    const b = parseFloat(req.query.b);

    if (isNaN(a) || isNaN(b)) {
        return res.status(400).json({ error: 'Invalid input' });
    }

    res.json({ result: multiply(a,b) });
});

module.exports = router;
module.exports.multiply = multiply;