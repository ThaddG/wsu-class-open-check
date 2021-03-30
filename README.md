# wsu-class-open-check

#### Check to see if a certain WSU class is open using its CRN. You'll receive an email (gmail) if it's full or not.
##### NOTE: the email you use for this will require you to go to https://myaccount.google.com/lesssecureapps and allow less secure apps. Check out https://nodemailer.com/usage/using-gmail/ for more information.
#### Default interval is 5 minutes

# To Use:
## 1) npm install / yarn install
   * puppeteer
   * nodemailer
   * node-cron
   * dotenv

## 2) create a ".env" file and fill it with these values:
    ACCESSID=''
    WSUPASSWORD=''
    COURSENUMBER=''
    CRN=''
    EMAIL=''
    EMAILPASSWORD=''
  * COURSENUMBER is not necessary, but CRN is
