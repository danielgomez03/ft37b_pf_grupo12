const { processPayment } = require("../controllers/stripeControllers");

const processPaymentHandler = async (req, res) => {
    const { amount, id } = req.body;
  
    try {
      const paymentIntent = await processPayment(
        amount,
        id,
      );
  
      // Si el pago es exitoso, devuelve una respuesta al cliente
      res.status(200).json({ success: true, paymentIntent });
    } catch (error) {
      console.error('Error en processPaymentHandler:', error);
      res.status(500).json({ error: 'Ocurrió un error al procesar el pago' });
    }
  };
  
  module.exports = {
    processPaymentHandler,
  };