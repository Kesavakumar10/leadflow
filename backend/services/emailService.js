const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendReminderEmail = async (leads) => {

  if(leads.length === 0) return;

  let leadList = "";

  leads.forEach((lead, index) => {
    leadList += `${index + 1}. ${lead.name} - ${lead.course} - ${lead.phone}\n`;
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: "Student Follow-up Reminder",
    text: `You have ${leads.length} follow-ups today:\n\n${leadList}`
  };

  try{
    await transporter.sendMail(mailOptions);
    console.log("Reminder email sent");
  }
  catch(error){
    console.log("Email error:", error);
  }

};

module.exports = sendReminderEmail;