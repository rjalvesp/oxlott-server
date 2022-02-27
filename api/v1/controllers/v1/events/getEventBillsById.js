module.exports = ({ params: { id } }) =>
  require("../../../../../models/bills.model").find({
    selector: { eventId: id },
  });
