const nodemailer = require("nodemailer");
const router = require("express").Router();
const cron = require('node-cron');
const contactEmail = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "taskmate.app.mail@gmail.com",
      pass: "bruasajjstldgomy",
    },
  });
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: "taskmate.app.mail@gmail.com",
      pass: "bruasajjstldgomy",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });
  
  contactEmail.verify((error) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Ready to Send");
    }
  });

  router.post("/createTask", async (req, res) => {
    const assignedTo =req.body.assignedTo
    const gname=req.body.groupName
    console.log(gname);
    const email = "taskmate.app.mail@gmail.com";
    const message = "hi"; 
    var i;
    for(i=0;i<assignedTo.length;i++){
      const mailOptions = {
          from: 'taskmate.app.mail@gmail.com',
          to: assignedTo[i],
          subject: `New task assigned in group:${gname}`,
          html: `<p>Greetings from Taskmate.</p><p> A new task has been assigned to you in group ${gname}</p>` 
      }

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.log(err)
          } else {
              console.log(info)   
          }
      })
}
  });  
router.post("/setReminder",(req,res)=>{
  var reminderDate=req.body.reminderDate;
  var description=req.body.task;
  var gname=req.body.groupName;
  var assignedTo=req.body.assignedTo
  var date=reminderDate.split(" ")[0]
  var day=date.split("-")[2]
  var month=date.split("-")[1]
  month = Number(month).toString();
  var time=reminderDate.split(" ")[1]
  var hr=time.split(":")[0]
  var min=time.split(":")[1]
  cron.schedule(`${min} ${hr} ${day} ${month} *`, function () {
    for(i=0;i<assignedTo.length;i++){
      const mailOptions = {
          from: 'taskmate.app.mail@gmail.com',
          to: assignedTo[i],
          subject: `This is a reminder for your task in group:${gname}.`,
          html: `<p>Greetings from Taskmate.</p><p> This is a reminder for your task in group ${gname}.</p><p>Task description: ${description}.</p><p>Ignore this email if you have already completed this task</p>` 
      }

      transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
              console.log(err)
          } else {
              console.log(info)   
          }
      })
}
  });
})
module.exports = router;
