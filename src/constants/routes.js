import Explorer from "../pages/Explorer";
import Transaction from "../pages/Transaction";
import Block from "../pages/Block";
import Address from "../pages/Address";

export const routes = [
    {
        id: 1,
        component: <Explorer />,
        path: "/"
    },
    {
        id: 2,
        component: <Transaction />,
        path: "/tx/:hash"
    },
    {
        id: 3,
        component: <Block />,
        path: "/block/:hash"
    },
    {
        id: 4,
        component: <Address />,
        path: "/address/:hash"
    }

]