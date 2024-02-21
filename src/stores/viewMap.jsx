import CardContainer from "../views/layout/Card.Container";
import MTGCardPage from "../components/MTGCard.Page";
import LoginContainer from "../views/Login/Login.Container";
import LoginCreateUserBody from "../views/Login/Login.CreateUser.Body";
export const viewMap = {
  MTGCards: <CardContainer />,
  Card: <MTGCardPage />,
  LoginPage: <LoginContainer />,
  CreateUser: <LoginCreateUserBody />,
};
