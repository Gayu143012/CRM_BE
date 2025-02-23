import { Customer } from "../models/Customer.model.js";
import { sendFollowUpEmail } from "../utils/NotificationClient.js";

export const sendFollowUpAction = async (req, res) => {
    try {
      const { customerId, subject, content } = req.body;
      const customer = await Customer.findById(customerId);
  
      if (!customer) {
        return res.status(404).json({ message: "Customer not found" });
      }
  
      const emailSent = await sendFollowUpEmail(customer.email, subject, content);
  
      if (emailSent) {
        customer.followUpActions.push({
          type: "email",
          date: new Date(),
          description: subject
        });
        await customer.save();
  
        res.status(200).json({ message: "Follow-up email sent successfully" });
      } else {
        res.status(500).json({ message: "Failed to send follow-up email" });
      }
    } catch (error) {
      console.error("Error in sendFollowUpAction:", error);
      console.error("Error stack:", error.stack);
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };