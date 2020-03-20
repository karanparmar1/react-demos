import { makeStyles } from "@material-ui/core/styles";

const CommonStyle = (theme) => {

    const drawerWidth = 220;

    const styles =
    {
        root: {
            display: "flex",
        },
        large: {
            width: theme.spacing(6),
            height: theme.spacing(6),
            marginRight: theme.spacing(2),
            [theme.breakpoints.down("xs")]: {
                marginRight: 0,
            }
        },
        larger: {
            width: theme.spacing(10),
            height: theme.spacing(10),
            margin: theme.spacing(2)
        },
        backdrop: {
            [theme.breakpoints.down("sm")]: {
                zIndex: theme.zIndex.drawer - 1,
                color: "black"
            }
        },
        active: {
            boxShadow: "inset 5px 0 0 0 white",
            background: "rgba(240,240,240,0.1)",
            color: "rgba(255,255,255,1)"
        },
        button: {
            minWidth: "80px",
            maxWidth: "120px",
            textTransform: "none",
            fontSize: "110%",
            whiteSpace: "nowrap",
            minHeight: "48px",
            [theme.breakpoints.down("sm")]: {
                minWidth: "44px",
                maxWidth: "44px",
                minHeight: "44px",
                borderRadius: "50%"
            },
            [theme.breakpoints.down(321)]: {
                "&:parent": {
                    background: "red !important"
                },
                minWidth: "44px",
                maxWidth: "44px",
                transform: "scale(0.8)",
            }
        },
        Checkbox: {
            [theme.breakpoints.down("xs")]: {
                minWidth: "24px"
            }
        },
        btnEdit: {
            color: "black",
            background: "white",
            "& :hover": {
                fontWeight: "600"
            }
        },
        basicInfo: {
            flex: "1 0 auto",
            // [theme.breakpoints.only("sm")]:{
            //     overflow:"scroll",
            //     maxWidth:"300px"
            // },
            [theme.breakpoints.down(320)]: {
                overflow: "scroll",
                maxWidth: "130px",
                overflowWrap: "anywhere"
            }
        },
        contactField: {
            background: "transparent",
            position: "relative",
            top: "-4px",
            color: "black !important",
            padding: "0px 3px",
            fontSize: "larger",
        },
        detailCard: {
            textAlign: "left",
            padding: "32px",
            [theme.breakpoints.up("lg")]: {
                marginLeft: "32px"
            }
        },
        newContactField: {
            marginTop: "10px",
            width:"46%",
            minWidth: "45%",
            marginLeft:"2.4%",
            [theme.breakpoints.down("xs")]: {
                minWidth: "94%",
            }
        },
        searchbar: {
            background: "rgb(230, 230, 230)",
            display: "flex",
            borderRadius: 25,
            padding: "0 12px 0",
            minWidth: "120px",

            [theme.breakpoints.down(321)]: {
                transform: "scale(0.9)"
            }
        },
        input: {
            background: "transparent",
            marginLeft: theme.spacing(1),
            flex: 1,
            transition: "all 0.5s linear",
            "& :focus": {
                fontWeight: "600"
            }

        },
        heading: {
            [theme.breakpoints.down(321)]: {
                paddingRight: "0px",
                transform: "scale(0.8)"
            }
        },
        textWhite: {
            color: "rgba(255,255,255,0.9)"
        },
        bgSilver: {
            background: "rgb(230, 230, 230)",
            color: "rgb(128, 128, 128)"
        },
        bgGradient: {
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            color: "white",
            fontWeight: "bold",
        },

        appBar: {
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            background: "white",

        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: 29
        },
        hide: {
            display: "none"
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap",
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
        },

        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            }),
            overflowX: "hidden"
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: "hidden",
            width: 0,
            border: 0,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(8) + 1,
            },

        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            paddingLeft: "90px",
            padding: theme.spacing(0, 1),
            ...theme.mixins.toolbar
        },
        mainContent: {
            [theme.breakpoints.down('xs')]: {
                position: "absolute"
            }
        },
        removePadding: {
            [theme.breakpoints.down('xs')]: {
                padding: "20px 0px !important",
            }
        },
        innerContent: {
            padding: "auto 0px",
            [theme.breakpoints.up('sm')]: {
                paddingLeft: "32px"
            },
            [theme.breakpoints.down('sm')]: {
                padding: "auto 0px auto",
            }
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            margin: "20px",
            [theme.breakpoints.down('xs')]: {
                margin: "0px"
            },
        }
    };


    const useStyles = makeStyles(theme => (styles));
    const classes = useStyles();


    return (classes);
};


export default CommonStyle;
