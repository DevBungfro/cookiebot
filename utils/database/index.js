const Atlas = require('atlas.db');

const Database = Atlas.Database.getInstance();

const TicketsStructure = new Atlas.Structure({
  id: { type: String },
  list: { type: Object, default: {} }
});
const Tickets = Database.createTable('tickets', TicketsStructure);

const ticket = Tickets.get('tickets') || Tickets.create({ id: 'tickets'})

exports.tickets = {
    ticket: ticket,
}