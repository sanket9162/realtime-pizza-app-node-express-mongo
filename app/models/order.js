const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      require: true,
    },
    items: { type: Object, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    patmentType: { type: String, default: "COD" },
    status: { type: String, default: "order_place" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
