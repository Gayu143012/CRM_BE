
//  Define controller functions
export const userRegistration = (user, activationToken) => {
    return {
      subject: "Registered to CRM app",
      html: `
        <div>
          <h5>Hello ${user.name},</h5>
          <br/>
          You have registered successfully with email ${user.email}
          <br/>
          Your username required at the time of login will be ${user.username}
          <br/>
          <br/>
          Please <a href="${process.env.CLIENT_URL}/activate/${activationToken}">click here</a> to activate your account.
          <br/>
          <br/>
          Thanks & Regards,
          StarWars Team
        </div>
      `,
    };
  };
  