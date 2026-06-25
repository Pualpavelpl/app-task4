export const EmailVerificationBanner = ({ verificationLink }) => {
    if (!verificationLink) {
      return null;
    }
  
    return (
      <div className="alert alert-warning d-flex justify-content-between align-items-center">
        <span>Your email is not verified.</span>
  
        <a className="btn btn-sm btn-warning" href={verificationLink}>
          Confirm email
        </a>
      </div>
    );
  };