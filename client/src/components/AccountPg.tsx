import React from "react";

function Desktop1(props: {
  spanText1: any;
  spanText2: any;
  spanText3: any;
  spanText4: any;
  UserProfileCircle: any;
  username: any;
  spanText5: any;
  spanText6: any;
  phoneNumber: any;
  resetPassword: any;
  deleteAccount: any;
  editUserPfpButtonProps: any;
  confirmChangesButtonProps: any;
}) {
  const {
    spanText1,
    spanText2,
    spanText3,
    spanText4,
    UserProfileCircle,
    username,
    spanText5,
    spanText6,
    phoneNumber,
    resetPassword,
    deleteAccount,
    editUserPfpButtonProps,
    confirmChangesButtonProps,
  } = props;

  return (
    <div className="container-ceneter-horizontal">
      <div className="desktop-1 screen">
        <div className="overlap-group">
          <Content />
          <div className="user-greeting">
            <h1 className="hello-name-my-account-information inter-normal-asphalt-40px">
              <span className="inter-normal-asphalt-40px">{spanText1}</span>
              <span className="span1">{spanText2}</span>
              <span className="span2">{spanText3}</span>
              <span className="span3">{spanText4}</span>
            </h1>
            <img
              className="user-profile-cricle"
              src={UserProfileCircle}
              alt="user-profile-cricle"
            />
          </div>
          <EditUserPfpButton>
            {editUserPfpButtonProps.children}
          </EditUserPfpButton>
          <UserInformation />
          <div className="email valign-text-middle">
            <span>
              <span className="inter-normal-asphalt-16px">{spanText5}</span>
              <span className="span1-1">{spanText6}</span>
            </span>
          </div>
          <div className="phone-number valign-text-middle inter-normal-asphalt-16px">
            {phoneNumber}
          </div>
          <ConfirmChangesButton>
            {confirmChangesButtonProps.children}
          </ConfirmChangesButton>
        </div>
        <div className="frame-container">
          <div className="frame-7">
            <div className="reset-password valign-text-middlee">
              {resetPassword}
            </div>
          </div>
          <div className="frame-6">
            <div className="delete-account valign-text-middlee">
              {deleteAccount}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Content() {
  return (
    <div className="content">
      <div className="rectangle-3"></div>
    </div>
  );
}

function EditUserPfpButton(props: { children: string }) {
  const { children } = props;

  return (
    <div className="edit-user-pfp-button">
      <div className="edit-user-profile valign-text-middle inter-medium-aspahlt-16px">
        {children}
      </div>
    </div>
  );
}

function UserInformation() {
  return (
    <div className="user-information">
      <div className="rectangle-4"></div>
    </div>
  );
}

function ConfirmChangesButton(props: { children: string }) {
  const { children } = props;

  return (
    <div className="confirm-changes-button">
      <div className="confirm-changes valign-text-middle inter-medium-aspahlt-16px">
        {children}
      </div>
    </div>
  );
}

const editUserPfpButtonData = {
  children: "Edit User Profile",
};

const confirmChangesButtonData = {
  children: "Confirm Changes",
};

const desktop1data = {
  spanText1: "Hello,",
  spanText2: (
    <React.Fragment>
      {" "}
      Name
      <br />
    </React.Fragment>
  ),
  spanText3: (
    <React.Fragment>
      <br />
    </React.Fragment>
  ),
  spanText4: "My Account Information",
  userProfileCircle: "user-profile-circle.png",
  username: "Username:",
  spanText5: "Email",
  spanText6: ":",
  phoneNumber: "Phone Number: ",
  resetPassword: "Reset Password",
  deleteAccount: "Delete Account",
  EditUserPfpButtonProps: editUserPfpButtonData,
  confirmChangesButtonData: confirmChangesButtonData,
};

export default Desktop1;