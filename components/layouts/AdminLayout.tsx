import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { FC } from "react";
import { AdminNavbar } from "../admin";
import { SideMenu } from "../ui";

interface Props {
  children?: React.ReactNode;
  title: string;
  subTitle: string;
  icon?: JSX.Element;
}

export const AdminLayout:FC<Props> = ({children, title, subTitle, icon}) => {
  return (
    <>
      <nav>
        <AdminNavbar />
      </nav>
      <SideMenu />
      <main style={{
        margin: "80px auto",
        maxWidth: "1440px",
        padding: "0px 30px",
      }}>
        <Box display="flex" flexDirection="column">
          <Typography variant="h1" component="h1">
            {icon}
            {' '}{title}
          </Typography>
          <Typography variant="h2" component="h2"><small>{subTitle}</small></Typography>
        </Box>
        <Box className="fadeIn">
          {children}
        </Box>
      </main>
    </>
  )
}
