import React from "react";

export const CalendarEvent: React.FC<any> = ({ event }) => {
  const { title, user } = event;

  console.log(event);
  return (
    <div>
      <span>{title}</span>
      <strong> - {user.name}</strong>
    </div>
  );
};
