import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
} from "amazon-cognito-identity-js";

const clientId = process.env.NEXT_PUBLIC_CLIENT_ID || "";
const userPoolId = process.env.NEXT_PUBLIC_USERPOOL_ID || "";

const userPool = new CognitoUserPool({
  UserPoolId: userPoolId,
  ClientId: clientId,
});

export function getUserPoolName() {
  return userPool.getUserPoolName();
}

export function singup(email: string, password: string) {
  return new Promise((resolve, reject) => {
    userPool.signUp(
      email,
      password,
      [
        {
          Name: "email",
          Value: email,
        },
      ] as any,
      [],
      (err, result) => {
        if (err) {
          reject(err);
          return;
        }
        return resolve(result);
      }
    );
  });
}

export function confirm(email: string, code: string, signin?: boolean) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Pool: userPool,
      Username: email,
    });

    user.confirmRegistration(code, true, (err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export function resendVerification(email: string) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Pool: userPool,
      Username: email,
    });
    user.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(result);
    });
  });
}

export function authenticate(email: string, password: string) {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Pool: userPool,
      Username: email,
    });
    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });
    user.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        const accessToken = result.getAccessToken().getJwtToken();
        document.cookie = `token=${accessToken};max-age=3600;path=/`;
        return resolve(accessToken);
      },
      onFailure: (err) => {
        return reject(err);
      },
    });
  });
}
