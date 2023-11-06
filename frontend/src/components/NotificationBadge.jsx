import React from "react";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { Link } from "react-router-dom";

function NotificationBadge({ notification }) {
  const badgeColor = notification > 0 ? "error" : "default";

  return notification > 0 ? (
    <Badge color={badgeColor} badgeContent={notification}>
      <Link to="http://localhost:3000/matches/requests">
        <IconButton color="secondary" className="request-button">
          <NotificationsIcon />
        </IconButton>
      </Link>
    </Badge>
  ) : (
    // When notification is 0, don't render the Badge component
    <Link to="http://localhost:3000/matches/requests">
      <IconButton color="secondary" className="request-button">
        <NotificationsIcon />
      </IconButton>
    </Link>
  );
}

export default NotificationBadge;
