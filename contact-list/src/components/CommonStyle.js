import { useTheme, makeStyles } from "@material-ui/core/styles";

const CommonStyle = () => {
    const theme = useTheme();
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
            "& > div": {
                boxShadow: "inset 4px 0 0 0 white",
                background: "rgba(140, 81, 81, 0.15)",
            }
        },
        drawerLink: {
            textDecoration: "none", color: "white"
        },
        heading: {
            transition: 'all 0.5s linear',
            whiteSpace: "nowrap",
            maxWidth: "fit-content",
            [theme.breakpoints.only("sm")]: {
                marginLeft: theme.spacing(3),
            },
            [theme.breakpoints.down("xs")]: {
                marginLeft: "50%",
                transform: "translate(-50%)"
            }
        },

        searchbar: {
            transition: "all 0.3s linear",
            background: "rgb(230, 230, 230)",
            display: "flex",
            borderRadius: 25,
            padding: "0 6px 0 12px",
            minWidth: "120px",
            "& :hover": {
                cursor: "help",
            },
            [theme.breakpoints.down(321)]: {
                transform: "scale(0.9)",
            }

        },
        input: {
            background: "transparent",
            marginLeft: theme.spacing(1),
            flex: 1,
            transition: "all 0.5s linear",
            "& :focus": {
                fontWeight: "600",
                cursor: "text"
            },
        },
        Checkbox: {
            [theme.breakpoints.down("xs")]: {
                minWidth: "24px"
            }
        },

        button: {
            transition: "all 0.3s ease-in",
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
                transform: "scale(0.9)",
            }
        },
        btn: {
            "&:hover": {
                "& button": {
                    color: "rgba(213, 213, 213, 0.85);",
                    boxShadow: "0px 3px 1px -2px rgba(0,0,0,0.2), 0px 2px 2px 0px rgba(0,0,0,0.14), 0px 1px 5px 0px rgba(0,0,0,0.12);"
                },
            },
        },

        btnAdd: {
            [theme.breakpoints.up("md")]: {
                paddingLeft: "12px"
            }
        },
        btnDelete: {
            [theme.breakpoints.up("md")]: {
                paddingRight: "14px"
            },

        },
        btnEdit: {
            color: "black",
            background: "white",
            "& :hover": {
                fontWeight: "600"
            }
        },
        hoverbold: {
            "& :hover": {
                fontWeight: "bolder"
            }
        },
        listHeaderItem: {
            transition: "all 0.3s linear",
            maxWidth: "40ch",
            [theme.breakpoints.up("lg")]: {
                marginLeft: "24px",
                maxWidth: "25ch",
            },
            [theme.breakpoints.only("md")]: {
                marginLeft: "24px",
                minWidth: "36ch",
                maxWidth: "39ch",
            },
            [theme.breakpoints.down("sm")]: {
                textAlign: "center"
            }
        },
        basicInfo: {
            transition: "all 0.3s linear",
            margin: "0 8px 0 0",
            overflowSpace: "break-word",
            // overflow: "hidden",
            // whiteSpace: "nowrap",
            // textOverflow: "ellipsis",
            [theme.breakpoints.up("lg")]: {
                minWidth: "18ch",
                maxWidth: "18ch",
            },
            [theme.breakpoints.only("md")]: {
                minWidth: "32ch",
                maxWidth: "32ch",
            },

            [theme.breakpoints.only("sm")]: {
                minWidth: "24ch",
                maxWidth: "32ch",
                padding: "8px"
            },
            [theme.breakpoints.down("xs")]: {
                minWidth: "16ch",
                maxWidth: "16ch",
                padding: "4px 0px",
            },

            // [theme.breakpoints.down(321)]: {
            //     minWidth: "24ch",
            //     maxWidth: "24ch",
            // },

        },
        aboutGrid: {
            minHeight: "3ch",
            maxWidth: "36ch",
            lineHeight: "1.2",
            overflowWrap: "break-word",
            [theme.breakpoints.down("xs")]: {
                maxWidth: "24ch"
            },
        },
        fieldGrid: {
            color: "black",
            transition: "all 0.5s linear",
            overflowWrap: "break-word",
            lineHeight: "1.2",
            // maxWidth: "40ch",
            [theme.breakpoints.up("lg")]: {
                maxWidth: "25ch"
            },
            [theme.breakpoints.only("md")]: {
                minWidth: "40ch",
                maxWidth: "50ch"
            },
            [theme.breakpoints.down("sm")]: {
                minWidth: "32ch",
                maxWidth: "40ch"
            },
            [theme.breakpoints.down("xs")]: {
                minWidth: "20ch",
                maxWidth: "24ch"
            },

        },
        contactField: {
            display: "flex",
            background: "transparent",
            position: "relative",
            top: "-4px",
            color: "black !important",
            padding: "0px 3px"
        },
        detailCard: {
            textAlign: "left",
            padding: "32px",
            [theme.breakpoints.up("lg")]: {
                marginLeft: "32px"
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
        invisible: {
            visibility: "hidden",
            [theme.breakpoints.down("sm")]: { display: "none" },

        },
        hide: {
            display: "none",
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
            [theme.breakpoints.down('sm')]: {
                position: "absolute",
                left: "0",
                top: "0",
            }
        },
        removePadding: {
            [theme.breakpoints.down('xs')]: {
                padding: "20px 0px !important",
            }
        },
        innerContent: {
            padding: "auto 0px",
            [theme.breakpoints.up('md')]: {
                paddingLeft: "32px"
            },
            [theme.breakpoints.down('sm')]: {
                padding: "auto 0px auto",
            },
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            [theme.breakpoints.up("md")]: {
                margin: "20px",
            },
            [theme.breakpoints.down('xs')]: {
                margin: "0px"
            },
        },
    };


    const useStyles = makeStyles(theme => (styles));
    const classes = useStyles();


    return (classes);
};


export default CommonStyle;
