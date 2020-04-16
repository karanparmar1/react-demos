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
                background: "rgba(0,0,0, 0.1)",
            }
        },
        drawerLink: {
            textDecoration: "none", color: "white"
        },
        heading: {
            transition: 'all 0.5s linear',
            transform: "translateX(-10px) scale(0.85)",
            margin: "8px 0px",
            whiteSpace: "nowrap",
            maxWidth: "fit-content",

            [theme.breakpoints.only("sm")]: {
                margin: "auto",
            },
            [theme.breakpoints.down("xs")]: {
                margin: "auto",
                transform: "scale(0.8) translateX(-36px)"
            }
        },
        actionbar: {
            textAlign: "right",
            [theme.breakpoints.only('lg')]: { paddingRight: "0px !important" },
        },
        searchWrapper: {
            transition: "all 0.3s linear",
            boxShadow: "none",
            borderRadius: 25,
            background: "rgb(230, 230, 230)",

            "& :hover": {

                boxShadow: "0px 1px 6px 0px rgba(0, 0, 0, 0.7) !important",
                background: "white",
                "& *": {
                    color: "black",
                    boxShadow: "none !important",
                }
            },

        },
        searchbar: {
            // transition: "all 0.3s linear",
            background: "rgb(230, 230, 230)",
            display: "flex",
            borderRadius: 25,
            padding: "0 6px 0 12px",
            minWidth: "120px",
            "& :hover": {
                // cursor: "help",
            },
        },

        hoverEffect: {
            "&:hover": {
                backgroundColor: "rgba(0,0,0,0.15) !important"
            }
        },


        input: {
            borderRadius: 5,
            background: "transparent",
            marginLeft: theme.spacing(1),
            flex: 1,
            transition: "color 0.3s linear",
            "& :focus": {
                fontWeight: "600",
                cursor: "text"
            },
            "& input": { padding: "6px 0px 6px", },
        },
        Checkbox: {
            minWidth: "50px",
            [theme.breakpoints.down("xs")]: {
                minWidth: "24px"
            }
        },

        button: {
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            fontWeight: "bold",
            transition: "all 0.3s ease-in, box-shadow  0s,opacity 0s",
            minWidth: "80px",
            maxWidth: "120px",
            textTransform: "none",
            fontSize: "110%",
            whiteSpace: "nowrap",
            minHeight: "48px",
            opacity: "0.9",
            color: "#e5e5e5",
            "&:hover": {
                opacity: "1",
                color: "white",
                boxShadow: "0px 10px 13px -7px #000000, 44px 18px 5px 5px rgba(0,0,0,0)",
            },
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
        cursorDisabled: {
            "&:hover": {
                cursor: "not-allowed",
            }
        },
        btn: {
            "&:hover": {
                "& button": {
                    color: "white",
                    transition: "none",
                    boxShadow: "0px 10px 13px -7px #000000, 44px 18px 5px 5px rgba(0,0,0,0)",
                },
            },
            paddingTop: "12px",
            paddingBottom: "12px"
        },

        btnAdd: {
            [theme.breakpoints.up("md")]: {
                paddingLeft: "12px"
            }
        },
        btnAdding: {
            cursor: "not-allowed !important",
            boxShadow: "0px 10px 13px -7px #000000, 44px 18px 5px 5px rgba(0,0,0,0)",
            "& button": {
                boxShadow: "none",
            }
        },
        btnDelete: {
            [theme.breakpoints.up("md")]: {
                paddingRight: "20px"
            },

        },
        btnEdit: {
            color: "black",
            background: "white",
            "& :hover": {
                fontWeight: "600"
            }
        },
        btnUploadWrapper: {
            transition: "all 0.2s",
            position: "relative", top: "-10px", left: "-5px",
            background: "linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%)",
            color: "rgba(255,255,255,0.9)",
            "&:hover": {
                boxShadow: "0px 5px 13px -7px #000000, 44px 18px 5px 5px rgba(0,0,0,0)",
                color: "white"
            }
        },
        btnUpload: {
            transition:"all 0.2s",
            position: "relative",
            padding: "4px",
            transform: "scale(0.9)",
            top: "-1px",
            left: "-1px",
        },

        hoverbold: {
            "& :hover": {
                fontWeight: "bolder"
            }
        },
        contactList: {
            flexGrow: 1,
            boxShadow: "0px 1px 6px 0px rgba(0,0,0,0.7)",
            [theme.breakpoints.down("xs")]: {
                boxShadow: "none",
            },

        },
        listItemHeader: {
            background: "rgb(230, 230, 230)",
            color: "rgb(128, 128, 128)",
            padding: "4px 12px",
            [theme.breakpoints.up("md")]: {
                paddingLeft: "28px",
            },
            [theme.breakpoints.only("sm")]: {
                paddingLeft: "22px",
            }
        },
        listItemHeaderText: {
            transition: "all 0.3s linear",
            maxWidth: "40ch",
            [theme.breakpoints.up("lg")]: {
                marginLeft: "18px",
                maxWidth: "25ch",
            },
            [theme.breakpoints.only("md")]: {
                marginLeft: "18px",
                minWidth: "36ch",
                maxWidth: "39ch",
            },
            [theme.breakpoints.down("sm")]: {
                textAlign: "center"
            }
        },
        renderedRecords: {
            overflowY: "auto",
            [theme.breakpoints.up("lg")]: {
                height: "60vh",
            }
        },
        listItem: {
            padding: "8px 16px",
            [theme.breakpoints.up("md")]: {
                paddingLeft: "30px",
            },
            [theme.breakpoints.only("sm")]: {
                paddingLeft: "24px",
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
            paddingLeft: "5% !important",
            paddingRight: "5% !important",
        },
        inputGrid: {
            color: "black",
            transition: "all 0.5s linear",
            overflowWrap: "break-word",
            lineHeight: "1.2",
            // maxWidth: "40ch",
            [theme.breakpoints.up("lg")]: {
                maxWidth: "100%"
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
            [theme.breakpoints.up("sm")]: {
                marginLeft: drawerWidth,
                width: `calc(100% - ${drawerWidth}px)`,
                transition: theme.transitions.create(["width", "margin"], {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.enteringScreen
                })
            },
        },
        menuButton: {
            marginRight: 29,
        },
        invisible: {
            visibility: "hidden",
            // [theme.breakpoints.down("sm")]: { display: "none" },
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
        removePadding: {
            [theme.breakpoints.down('xs')]: {
                padding: "20px 0px !important",
            }
        },
        absoluteAtSmall: {
            [theme.breakpoints.only('sm')]: { left: "65px", },
            [theme.breakpoints.down('sm')]: {
                position: "absolute",

                // top: "0",
            }
        },
        innerContent: {
            padding: "auto 0px",
            // [theme.breakpoints.up('md')]: {
            //     paddingLeft: "32px"
            // },
            [theme.breakpoints.down('sm')]: {
                padding: "auto 0px auto",
            },
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            marginTop: "24px",

            [theme.breakpoints.up("md")]: {
                margin: "20px",
                marginTop: "24px",
            },
            [theme.breakpoints.down("sm")]: {
                margin: "0px",
                marginTop: "24px",
            },
        },
    };


    const useStyles = makeStyles(theme => (styles));
    const classes = useStyles();


    return (classes);
};

export default CommonStyle;