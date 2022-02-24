import Explorer from "../pages/Explorer";
import Transaction from "../pages/Transaction";
import Block from "../pages/Block";
import Address from "../pages/Address";
import BlockTable from "../pages/BlockTablePage";
import TransactionTablePage from "../pages/TransactionTablePage";

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
    },
    {
        id: 5,
        component: <BlockTable />,
        path: "/blocks"
    },
    {
        id: 5,
        component: <TransactionTablePage />,
        path: "/transactions"
    }

]