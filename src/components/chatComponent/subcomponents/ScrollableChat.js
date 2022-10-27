import { Avatar, Tooltip } from "@mui/material";
import Zoom from '@mui/material/Zoom';
import ScrollableFeed from "react-scrollable-feed";
import moment from 'moment';
import 'moment/locale/tr'
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";

const ScrollableChat = ({ messages, user }) => {
  moment.locale('tr')

  return (
    <ScrollableFeed className="h-[84vh] pb-3">
      {messages &&
        messages.map((m, i) => (
          <div className={` ${m.sender._id === user.id ? "justify-items-end" : " justify-items-start grid-cols-12 pl-1"} grid`}  style={{ marginBottom:"10px", paddingRight: `${
            m.sender._id === user.id ? "10px" : ""
          }` }} key={m._id}>

            {(isSameSender(messages, m, i, user.id) ||
              isLastMessage(messages, i, user.id)) && (
              <div className={` ${m.sender._id === user.id ? "" : "col-span-1 row-span-2 self-end "} `}>
              <Tooltip title={m.sender.name}  arrow TransitionComponent={Zoom} style={{marginRight:"3px"}} >
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.image}
                />
              </Tooltip>
              </div>
            )}
            <span
            className={` ${m.sender._id === user.id ? " " : "col-span-11"} break-all`}
              style={{
                backgroundColor: `${
                  m.sender._id === user.id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user.id),
                marginTop: isSameUser(messages, m, i, user.id) ? 0 : 10,
                borderRadius: `${
                  m.sender._id === user.id ? "20px 20px 0px 20px" : "20px 20px 20px 0px"
                }`,
                padding: "5px 15px",
                maxWidth: "70%",
                marginBottom: "2px",
               
              }}
            >
              {m.content}
              </span>
            <span  className={`${m.sender._id === user.id ? "" : "col-start-2 col-end-12 pl-1"} text-xs `}>{moment(m.createdAt).fromNow() }</span>
            
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
