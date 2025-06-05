import Contact from "../models/Contact.js";

// POST: /api/contact
export const sendContactMessage = async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newMessage = await Contact.create({ name, email, message });
    res.status(201).json({ message: "Your message has been sent!", data: newMessage });
  } catch (error) {
    console.error("Contact form error:", error);
    res.status(500).json({ error: "Something went wrong. Please try again later." });
  }
};
