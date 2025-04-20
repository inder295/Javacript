import nodemailer from "nodemailer";
import dotenv from "dotenv"

dotenv.config();

//create transport
// mail options
// send mail 

const sendVerificationEmail = async (email,token)=>{
    try {
        const transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            secure: false, // true for port 465, false for other ports
            auth: {
              user: "a77eb264ff7312",
              pass: "6ecd04c3b26550",
            },
          });

          const verifiactionUrl= `${process.env.BASE_URL}/api/v1/users/verify/${token}`
          


            const mailOptions = {
              from: `info@mailtrap.club`, // sender address
              to: email, // list of receivers
              subject: "PLEASE VERIFY YOUR EMAIL ADDRESS", // Subject line
              text: `Thanku for registering the email address.Please verify youur email to complete your registration.
              
              ${verifiactionUrl}

              This verifiaction link will expires in 10 minutes.
              If u didnot create the account than please ignore this email
              `,
             
            }
            
            const info=await transporter.sendMail(mailOptions);
            console.log(`verifiaction email sent`)
            return true;
            
    } catch (error) {
        console.log(`error in sending verification email : ${error}`);
        return false;
    }
}

export default sendVerificationEmail;