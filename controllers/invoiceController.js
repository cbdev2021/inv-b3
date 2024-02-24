import asyncHandler from 'express-async-handler';
import Invoice from '../models/invoiceModel.js';
import Sequence from '../models/sequenceModel.js';
import sequelize from '../config/db.js';

const addInvoice = asyncHandler(async (req, res) => {
    // const userId = req.user.id;

    const {
        invoiceType,
        dateIssue,
        subTotal,
        taxes,
        customer,
        paymentSell,
        provider,
        paymentBuy,
        idUsuario,
        invoiceID
    } = req.body;

    let transaction;
    try {
        // transaction = await sequelize.transaction();

        // let invoiceID;

        // if (invoiceType === "Purchase") {
        //     const purchaseSeq = await Sequence.findByPk("sequencePurchaseId", { transaction });
        //     invoiceID = purchaseSeq.sequence_value;
        //     await purchaseSeq.increment('sequence_value', { by: 1, transaction });
        // } else if (invoiceType === "Sales") {
        //     const saleSeq = await Sequence.findByPk("sequenceSaleId", { transaction });
        //     invoiceID = saleSeq.sequence_value;
        //     await saleSeq.increment('sequence_value', { by: 1, transaction });
        // }

        const newInvoice = await Invoice.create({
            // invoiceID,  //manejar secuencia!!!
            invoiceID: invoiceID,
            invoiceType,
            // idUsuario: userId,
            idUsuario: idUsuario,
            dateIssue,
            subTotal, 
            taxes,
            customer,
            paymentSell,
            provider,
            paymentBuy,
        }, { transaction });

        // await transaction.commit();

        res.status(201).json({ message: 'Factura agregada con éxito', data: newInvoice });
    } catch (error) {
        // if (transaction) await transaction.rollback();
        res.status(500).json({ message: 'Error al agregar la factura', error: error.message });
    }
});

const updateInvoice = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    const {
        dateIssue,
        subTotal,
        taxes,
        customer,
        paymentSell,
        provider,
        paymentBuy
    } = req.body;

    try {
        const invoice = await Invoice.findByPk(req.params.id);

        if (invoice) {
            if (invoice.idUsuario === userId) {
                invoice.dateIssue = dateIssue;
                invoice.subTotal = subTotal;
                invoice.taxes = taxes;
                invoice.customer = customer;
                invoice.paymentSell = paymentSell;
                invoice.provider = provider;
                invoice.paymentBuy = paymentBuy;

                const updatedInvoice = await invoice.save();
                res.json({ message: 'Invoice actualizado con éxito', data: updatedInvoice });
            } else {
                res.status(403);
                throw new Error('No tienes permiso para actualizar esta factura');
            }
        } else {
            res.status(404);
            throw new Error('Factura no encontrada');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar Invoice', error: error.message });
    }
});

const deleteInvoice = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    try {
        const invoice = await Invoice.findByPk(req.params.id);

        if (invoice) {
            if (invoice.idUsuario === userId) {
                await invoice.destroy();
                res.json({ message: 'Factura eliminada con éxito' });
            } else {
                res.status(403);
                throw new Error('No tienes permiso para eliminar esta factura');
            }
        } else {
            res.status(404);
            throw new Error('Factura no encontrada');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la factura', error: error.message });
    }
});

const getInvoice = asyncHandler(async (req, res) => {
    const userId = req.user.id;

    try {
        const invoice = await Invoice.findByPk(req.params.id);

        if (invoice) {
            if (invoice.idUsuario === userId) {
                res.json(invoice);
            } else {
                res.status(403);
                throw new Error('No tienes permiso para acceder a esta factura');
            }
        } else {
            res.status(404);
            throw new Error('Factura no encontrada');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la factura', error: error.message });
    }
});

const getInvoicesByUserId = asyncHandler(async (req, res) => {
    const userId = req.params.idUsuario;

    try {
        const invoices = await Invoice.findAll({ where: { idUsuario: userId } });

        res.json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las facturas', error: error.message });
    }
});

const generateId = asyncHandler(async (req, res) => {
    const { invoiceType } = req.params;

    try {
        let sequenceId;
        if (invoiceType === "Purchase") {
            sequenceId = "sequencePurchaseId";
        } else if (invoiceType === "Sales") {
            sequenceId = "sequenceSaleId";
        } else {
            res.status(400);
            throw new Error('Tipo de factura no válido');
        }

        const sequence = await Sequence.findByPk(sequenceId);

        if (sequence) {
            res.json({ sequence_value: sequence.sequence_value + 1 });
        } else {
            res.status(404);
            throw new Error('Secuencia no encontrada');
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener la secuencia', error: error.message });
    }
});

export {
    addInvoice,
    updateInvoice,
    deleteInvoice,
    getInvoice,
    getInvoicesByUserId,
    generateId
};


// import asyncHandler from 'express-async-handler';
// import Invoice from '../models/invoiceModel.js';
// import Sequence from '../models/sequenceModel.js';

// // @desc    Agregar una factura
// // @route   POST /api/invoices/add-invoice
// // @access  Public
// const addInvoice = asyncHandler(async (req, res) => {
//     const userId = req.user._id;

//     const {
//         //invoiceID,
//         invoiceType,
//         dateIssue,
//         subTotal,
//         taxes,
//         customer,
//         paymentSell,
//         provider,
//         paymentBuy,
//     } = req.body;

//     try {
//         let purchaseId;
//         let saleId;
//         let invoiceID;

//         if (invoiceType === "Purchase") {
//             const purchaseSeq = await Sequence.findOneAndUpdate(
//                 { _id: "sequencePurchaseId" },
//                 { $inc: { sequence_value: 1 } },
//                 { new: true, upsert: true }
//             );
//             //purchaseId = purchaseSeq.sequence_value;
//             invoiceID = purchaseSeq.sequence_value;

//         } else if (invoiceType === "Sales") {
//             const saleSeq = await Sequence.findOneAndUpdate(
//                 { _id: "sequenceSaleId" },
//                 { $inc: { sequence_value: 1 } },
//                 { new: true, upsert: true }
//             );
//             //saleId = saleSeq.sequence_value;
//             invoiceID = saleSeq.sequence_value;
//         }

//         const newInvoice = await Invoice.create({
//             // purchaseId: purchaseId || null,
//             // saleId: saleId || null,
//             invoiceID: invoiceID,
//             invoiceType: invoiceType,
//             idUsuario: userId,
//             dateIssue: dateIssue,
//             subTotal: subTotal,
//             taxes: taxes,
//             customer: customer,
//             paymentSell: paymentSell,
//             provider: provider,
//             paymentBuy: paymentBuy,
//         });

//         if (newInvoice) {
//             res.status(201).json({ message: 'Factura agregada con éxito', data: newInvoice });
//         } else {
//             res.status(400);
//             throw new Error('No se pudo agregar la factura');
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al agregar la factura', error: error.message });
//     }
// });

// const updateInvoice = asyncHandler(async (req, res) => {

//     //const userId = req.user._id;
//     const userId = req.user._id;

//     //const { typevalue, subtype, description } = req.body;
//     const {
//         //invoiceType,
//         dateIssue,
//         subTotal,
//         taxes,

//         customer,
//         paymentSell,

//         provider,
//         paymentBuy
//     } = req.body;

//     try {
//         const invoice = await Invoice.findById(req.params.id);

//         if (invoice) {
//             if (invoice.idUsuario.toString() === req.user._id.toString()) {
//                 // invoice.typevalue = typevalue;
//                 // invoice.subtype = subtype;
//                 // invoice.description = description;

//                 //invoiceID: newCorrelative,
//                 //invoiceType: invoiceType;
//                 //idUsuario: userId,  //front end
//                 //idUsuario: idUsuario; //prueba postman
//                 invoice.dateIssue = dateIssue;
//                 invoice.subTotal = subTotal;
//                 invoice.taxes = taxes;

//                 //optionals
//                 invoice.customer = customer;
//                 invoice.paymentSell = paymentSell;

//                 invoice.provider = provider;
//                 invoice.paymentBuy = paymentBuy;


//                 const updatedInvoice = await invoice.save();
//                 res.json({ message: 'Invoice actualizado con éxito', data: updatedInvoice });
//             } else {
//                 res.status(403);
//                 throw new Error('No tienes permiso para actualizar este Invoice');
//             }
//         } else {
//             res.status(404);
//             throw new Error('Invoice no encontrado');
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al actualizar Invoice', error: error.message });
//     }
// });

// // @desc    Eliminar una factura por ID
// // @route   DELETE /api/invoices/delete-invoice/:id
// // @access  Public
// const deleteInvoice = asyncHandler(async (req, res) => {
//     const invoiceId = req.params.id;
//     //const invoiceId = req.params.invoiceID;//spring boot

//     const removedInvoice = await Invoice.findByIdAndDelete(invoiceId);

//     if (removedInvoice) {
//         res.json({ message: 'Factura eliminada con éxito' });
//     } else {
//         res.status(404);
//         throw new Error('Factura no encontrada');
//     }
// });

// // @desc    Obtener una factura por ID
// // @route   GET /api/invoices/get-invoice/:id
// // @access  Public
// const getInvoice = asyncHandler(async (req, res) => {
//     try {
//         const invoice = await Invoice.findById(req.params.id);

//         if (invoice) {
//             res.json(invoice);
//         } else {
//             res.status(404);
//             throw new Error('Factura no encontrada');
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener la factura', error: error.message });
//     }
// });

// // @desc    Obtener facturas por ID de usuario
// // @route   GET /api/invoices/get-invoices-by-user/:idUsuario
// // @access  Public
// const getInvoicesByUserId = asyncHandler(async (req, res) => {
//     const userId = req.params.idUsuario;

//     try {
//         //const invoices = await Invoice.find({ 'clienteProveedor.idUsuario': userId });
//         const invoices = await Invoice.find({ 'idUsuario': userId });

//         if (invoices) {
//             res.json(invoices);
//         } else {
//             res.status(404);
//             throw new Error('No se encontraron facturas para este usuario');
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener las facturas', error: error.message });
//     }
// });

// // @desc    Obtener el valor actual de la secuencia
// // @route   GET /api/invoices/get-sequence-value/:invoiceType
// // @access  Public
// const generateId = asyncHandler(async (req, res) => {
//     const { invoiceType } = req.params;

//     try {
//         let sequenceId;
//         if (invoiceType === "Purchase") {
//             sequenceId = "sequencePurchaseId";
//         } else if (invoiceType === "Sales") {
//             sequenceId = "sequenceSaleId";
//         } else {
//             res.status(400);
//             throw new Error('Tipo de factura no válido');
//         }

//         const sequence = await Sequence.findById(sequenceId);

//         if (sequence) {
//             res.json({ sequence_value: sequence.sequence_value + 1 });
//         } else {
//             res.status(404);
//             throw new Error('Secuencia no encontrada');
//         }
//     } catch (error) {
//         res.status(500).json({ message: 'Error al obtener la secuencia', error: error.message });
//     }
// });

// export {
//     addInvoice,
//     updateInvoice,
//     deleteInvoice,
//     getInvoice,
//     getInvoicesByUserId,
//     generateId
// };
