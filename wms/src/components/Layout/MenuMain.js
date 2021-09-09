// import React from "react";
// import Box from "@material-ui/core/Box";
// import Menu from "@mui-treasury/components/menu/collapsible";
// import { useMaterialCollapsibleMenuStyles } from "@mui-treasury/styles/collapsibleMenu/material";

// const MaterialCollapsibleMenuStyle = () => {
//   const [index, setIndex] = React.useState(-1);
//   const createOnClick = (idx) => () => setIndex(idx);
//   return (
//     <Box minWidth={343}>
//       <Menu
//         collapsed
//         useStyles={useMaterialCollapsibleMenuStyles}
//         renderToggle={({ onClick, collapsed }) => (
//           <Menu.Row>
//             <Menu.RowItem
//               button
//               selected={index === 0}
//               onClick={createOnClick(0)}
//             >
//               Gatsby styles
//             </Menu.RowItem>
//             <Menu.Action button toggled={collapsed} onClick={onClick} />
//           </Menu.Row>
//         )}
//       >
//         <Menu.ListItem button selected={index === 1} onClick={createOnClick(1)}>
//           List item 1
//         </Menu.ListItem>
//         <Menu.ListItem button selected={index === 2} onClick={createOnClick(2)}>
//           List item 2
//         </Menu.ListItem>
//         <Menu.ListItem button selected={index === 3} onClick={createOnClick(3)}>
//           List item 3
//         </Menu.ListItem>
//         <Menu.ListItem button selected={index === 4} onClick={createOnClick(4)}>
//           List item 4
//         </Menu.ListItem>
//       </Menu>
//       <Menu
//         collapsed
//         useStyles={useMaterialCollapsibleMenuStyles}
//         renderToggle={({ onClick, collapsed }) => (
//           <Menu.Row>
//             <Menu.RowItem button selected={index === 0}>
//               Gatsby styles
//             </Menu.RowItem>
//           </Menu.Row>
//         )}
//       ></Menu>
//     </Box>
//   );
// };

// export default MaterialCollapsibleMenuStyle;
import React from "react";
import MenuList from "@material-ui/core/MenuList";
import MenuItem from "@material-ui/core/MenuItem";

import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import IconButton from "@material-ui/core/IconButton";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import FiberManualRecordOutlinedIcon from "@material-ui/icons/FiberManualRecordOutlined";
import SecondNavigationStyles from "./MenuStyles";
import ItemMenu from "../UI/ItemMenu";
import RowToggle from "@mui-treasury/components/toggle/row";
import { useJupiterRowToggleStyles } from "@mui-treasury/styles/rowToggle/jupiter";
export const MenuListItem = () => {};

export default function MenuMain(props) {
  const classes = SecondNavigationStyles();
  const [toggled, setToggled] = React.useState(false);
  const onToggle = () => setToggled(!toggled);
  return (
    <div className={classes.secondMenu}>
      <MenuList className={classes.menuList}>
        <MenuItem className={classes.menuItem}>
          <p>WMS.PY</p>
        </MenuItem>
        <MenuItem className={classes.menuItem}>
          <IconButton
            className={classes.subButton}
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <HomeOutlinedIcon></HomeOutlinedIcon>
          </IconButton>{" "}
          <p>Trang chủ</p>
        </MenuItem>
        <div className={classes.tags}>
          <p className={classes.tag}>Quản lý</p>
        </div>
        <MenuItem className={classes.menuItem} onClick={onToggle}>
          <RowToggle useStyles={useJupiterRowToggleStyles}>
            <p>Nhập hàng</p>
            <RowToggle.Action
              button
              toggled={toggled}
              onClick={onToggle}
              className={classes.toggled}
            />
          </RowToggle>
        </MenuItem>
        {props.listMenu.map((item, index) => {
          return (
            <ItemMenu
              content={item.content}
              key={index}
              link={item.link}
            ></ItemMenu>
          );
        })}
      </MenuList>
    </div>
  );
}
