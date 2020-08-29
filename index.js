const puppeteer = require('puppeteer');
const nodemailer = require('nodemailer');
require('dotenv').config();

const delay = ms => new Promise(res => setTimeout(res, ms));

const Email = {
  sendEmail: function(mailContent) {
  
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASSWORD
      }
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: process.env.EMAIL,
      subject: `CRN ${process.env.CRN} Class Check`,
      text: mailContent
    };

    transporter.sendMail(mailOptions, async function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

  }
}


cron.schedule('*/5 * * * *', () => {
  peep = async function () {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    page.on('console', (msg) => console[msg._type]('PAGE LOG:', msg._text));
    await page.goto('https://registration.wayne.edu/StudentRegistrationSsb/ssb/classRegistration/classRegistration');
    // other actions...
    await page.screenshot({path: 'testingthepuppet.png'});
    // LOGIN
    await page.type('#accessid', process.env.ACCESSID);
    await page.type('#passwd', process.env.WSUPASSWORD);
    await page.click('#login-button');
    await page.waitForNavigation({waitUntil: 'load'});
  
      // then snapshot that
    await page.screenshot({path: 'testingthepuppet2.png'});
  
    // CLICK THE REGISTER BUTTON
    await page.click('#classSearchLink');
  
    await page.screenshot({path: 'testingthepuppet3.png'});
  
    // SELECT A TERM
    await page.click('.select2-choice');
    await delay(3000);
    // try {
    //   await page.waitFor('#202009', {visible:true})
    // } catch (error) {
    //   console.log("The element didn't appear")
    // }
    await page.keyboard.press('Enter');
    await page.click('#term-go');
  
    await page.screenshot({path: 'testingthepuppet5.png'});
  
    await page.waitForSelector('#txt_courseNumber', {visible:true})
    await page.type('#txt_courseNumber', process.env.COURSENUMBER);
    await page.type('#txt_keywordlike', process.env.CRN);
    await page.click('#search-go');
  
    await page.waitForSelector('.status-bold', {visible:true})
  
    await page.screenshot({path: 'testingthepuppet6.png'});
  
    let mob = await page.evaluate(() => {
      let meep = document.querySelector('.status-bold');
      let classIsOpen = "if you see this it didn't work";
      if (meep.innerHTML === "FULL") {
        console.log("STILL FULL");
        classIsOpen = "STILL FULL";
      } else {
        console.log("OPEN...or something went wrong");
        classIsOpen = "IT'S OPEN...or something went wrong";
      }
      return classIsOpen
    })
  
    await browser.close();
    return mob;
  };
  
  peep()
    .then(res => {
      console.log("result", res);
      Email.sendEmail(res);
    })
});