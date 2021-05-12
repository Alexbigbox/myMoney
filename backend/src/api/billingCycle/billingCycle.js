const restful = require('node-restful')
const mongoose = restful.mongoose

// Acesso ao mongoDB
const creditSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito'] }
})

const debtSchema = new mongoose.Schema({
    name: { type: String, required: true },
    value: { type: Number, min: 0, required: [true, 'Informe o valor do débito'] },
    status: { type: String, required: false, uppercase: true,
        enum: ['PAGO', 'PENDENTE', 'AGENDADO'] }
})

const billingCycleSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Informe o nome do ciclo'] },
    month: { type: Number, min: 1, max: 12, required: [true, 'Informe o mês do ciclo'] },
    year: { type: Number, min: 1970, max: 2100, required: [true, 'Informe o ano do ciclo'] },
    credits: [creditSchema],
    debts: [debtSchema]
})

module.exports = restful.model('BillingCycle', billingCycleSchema)
