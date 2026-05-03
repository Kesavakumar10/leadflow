const cron = require("node-cron");
const Lead = require("../models/Lead");
const sendReminderEmail = require("../services/emailService");

const followupReminder = () => {

  // runs every day at 9 AM
  cron.schedule("0 9 * * *", async () => {

    console.log("Running follow-up reminder check...");

    const today = new Date().toISOString().split("T")[0];

    try {

      const leads = await Lead.find({ followup: today });

      if(leads.length > 0){
        await sendReminderEmail(leads);
      }

    } catch(error){
      console.log("Reminder error:", error);
    }

  });

};

module.exports = followupReminder;