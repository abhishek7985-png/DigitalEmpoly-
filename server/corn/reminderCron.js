const cron = require("node-cron");
const Employee = require("../models/employeeModel");
const { sendReminderEmail } = require("../notifications/notificationService");

cron.schedule("0 9 * * *", async () => {
  console.log("Running Daily Reminder...");

  const employees = await Employee.find({
    onboardingStatus: "Pending",
  });

  for (const employee of employees) {
    await sendReminderEmail(employee);
  }
});
