import Emoji from "react-emojis";
function NotificationIcon(type: AlertType) {
  switch (type) {
    case "alert":
      return <Emoji emoji="warning" size="30" />;
    case "recommendation":
      return <Emoji emoji="bell" size="30" />;
  }
}

export default NotificationIcon;
