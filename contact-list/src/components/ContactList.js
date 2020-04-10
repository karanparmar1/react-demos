import React from 'react';
import clsx from "clsx";
import {
    List, ListItem, ListItemIcon, ListItemText, ListItemAvatar, ListItemSecondaryAction,
    Checkbox, Hidden, IconButton, Avatar, Tooltip, Typography,
    Select, MenuItem, Divider,
} from '@material-ui/core';
import Pagination from "@material-ui/lab/Pagination";
import { AddBox, IndeterminateCheckBox } from "@material-ui/icons";
import CommonStyle from "./CommonStyle";
import NewContact from "./NewContact";
import DetailCard from "./DetailCard";

function stringToColor(string) {
    let hash = 0, i = 0, color = "#";
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    return color;
}
const ContactList = (props) => {
    const classes = CommonStyle();
    const [selectAll, setSelectAll] = React.useState(false);
    const { imgField, titleField, uniqueField, descriptionField } = props;
    const [per_page, setPerPage] = React.useState(5);
    let {page,setPage}= props;

    const handlePageChange = (event, value) => { setPage(value); props.setActive({}); }
    const gotoLastPage = () => { setPage(Math.ceil((props.data.length + 1) / per_page)) }

    React.useEffect(() => { setSelectAll(props.data.some(contact => contact.checked)); }, [props.data]);
    return (<>
        <List className={classes.contactList} disablePadding={true} >

            <ListItem dense className={classes.listItemHeader}>
                <Tooltip title={selectAll ? "DeSelectAll" : "SelectAll"} arrow><span>
                    <IconButton edge="start" disabled={props.wannaCreateNew || props.data.length < 1}
                        onClick={() => { props.handleSelectAll(!selectAll); setSelectAll(!selectAll); }} >
                        {selectAll ? <IndeterminateCheckBox /> : <AddBox />}
                    </IconButton></span>
                </Tooltip>
                <ListItemText primary="Basic Info" className={classes.listItemHeaderText} />
                <Hidden smDown> <ListItemText primary={uniqueField.label} /> </Hidden>
            </ListItem>
            {
                props.wannaCreateNew ?
                    <NewContact data={props.data} handleAdd={props.handleAdd} gotoLastPage={gotoLastPage} titleField={titleField} uniqueField={uniqueField} addNewContact={props.addNewContact} />
                    : <></>
            }
            {
                props.data.length ?
                    <div className={clsx({ [classes.renderedRecords]: (per_page > 5 && props.totalRecords > 5) })}>
                        {props.data.map((contact, index) =>
                            (index >= page * per_page - per_page) && (index < page * per_page) &&
                            (<React.Fragment key={index}>
                                <ListItem dense selected={props.activeContact.id === contact.id} disabled={props.wannaCreateNew}
                                    button onClick={() => { props.handleContactClick(contact); }} key={index}
                                    className={classes.listItem}>
                                    <ListItemIcon className={classes.Checkbox}>
                                        <Tooltip title={contact.checked ? `DeSelect ${props.keyword}` : `Select ${props.keyword}`} arrow>
                                            <Checkbox
                                                edge="start"
                                                // disableRipple
                                                color="primary"
                                                checked={contact.checked}
                                                onClick={(e) => { props.handleCheckedChange(contact); e.stopPropagation(); }}
                                            />
                                        </Tooltip>
                                    </ListItemIcon>

                                    <ListItemAvatar>
                                        <Avatar src={contact[imgField.fieldname]} alt={contact[titleField.fieldname]} className={classes.large} style={{ background: stringToColor(contact.id) }}>
                                            {contact[titleField.fieldname].split(" ").map((n, i) => i < 2 ? n[0] : "")}
                                        </Avatar>
                                    </ListItemAvatar>
                                    <ListItemText
                                        primary={<Tooltip title={titleField.label} arrow>
                                            <Typography variant="h6" style={{ overflowWrap: "break-word", lineHeight: "1", fontSize: "1.2rem" }}>{contact[titleField.fieldname]}</Typography>
                                        </Tooltip>}
                                        secondary={<Hidden mdUp>{contact[uniqueField.fieldname] ?
                                            <Tooltip title={uniqueField.label} arrow>
                                                <Typography component="span" noWrap={true} style={{ fontWeight: "600", display: "block" }}>{contact[uniqueField.fieldname]} </Typography>
                                            </Tooltip>
                                            : <small>&nbsp;</small>}</Hidden>}
                                        className={classes.basicInfo}
                                    />
                                    <Hidden smDown>
                                        <ListItemText /*className={classes.basicInfo}*/ style={{ maxWidth: "fit-content" }}
                                            primary={contact[uniqueField.fieldname] ?
                                                <Tooltip title={uniqueField.label} arrow>
                                                    <h4 style={{ maxWidth: "24ch", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                                                        {contact[uniqueField.fieldname]}</h4>
                                                </Tooltip> : <h4>&nbsp;</h4>} />
                                    </Hidden>

                                </ListItem>

                                {(props.activeContact.id === contact.id) ?
                                    <Hidden lgUp>
                                        <DetailCard contact={props.activeContact} objRule={props.objRule}
                                            titleField={titleField} imgField={imgField} uniqueField={uniqueField} descriptionField={descriptionField}
                                            editable={props.editable} setActive={props.setActive} handleEdit={props.handleEdit} handleUpdate={props.handleUpdate} keyword={props.keyword} />
                                    </Hidden> : <></>
                                }

                            </React.Fragment>
                            )

                        )}
                    </div>

                    : <ListItem dense> <h3 style={{ color: "red", fontWeight: "normal", margin: "2% auto" }}>NO RECORD !</h3></ListItem>
            }
            {/*Pagination */
                props.data.length > 0 && (props.data.length > per_page) &&
                <><Divider />
                    <ListItem className="bg-silver" >
                        <Pagination page={page} count={Math.ceil(props.data.length / per_page)} onChange={handlePageChange}
                            showFirstButton showLastButton color="primary" style={{ margin: "auto" }} />
                    </ListItem>
                </>
            }
            {props.data.length > 0 &&
                <><Divider />
                    <ListItem>
                        <ListItemAvatar>
                            <span> Total {props.keyword} : {props.totalRecords}</span>
                        </ListItemAvatar>
                        <ListItemSecondaryAction>
                            <span>Limit :</span> <Select
                                value={per_page}
                                onChange={(e) => { setPerPage(e.target.value); setPage(1); props.setActive({}); }}
                                autoWidth
                                className={classes.selectEmpty}>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                                <MenuItem value={20}>20</MenuItem>
                            </Select>
                        </ListItemSecondaryAction>

                    </ListItem>
                </>
            }
        </List>
    </>
    )
}

export default ContactList;
