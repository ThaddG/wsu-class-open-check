# wsu-class-open-check

#### Check to see if a certain WSU class is open using its CRN. You'll receive an email (gmail) if it's full or not.
#### Default interval is 5 minutes

# To Use:
## 1) npm install / yarn add
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
