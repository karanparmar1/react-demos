import React from 'react';
import FlipMove from 'react-flip-move';
import { Backspace } from '@material-ui/icons';
import { List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Checkbox, IconButton } from '@material-ui/core/';

const TaskList = (props) => {
    return (
        <List>
            <FlipMove duration={250} easing="ease-out" enterAnimation="accordionHorizontal" leaveAnimation="accordionVertical">
                {
                    props.taskList.map((task, index) => {
                        const labelId = `checkbox-list-label-${task}`;

                        return (
                            <ListItem key={index} role={undefined} dense button className="taskItem" style={{ backgroundColor: 'rgba(200,200,200,0.3)', margin: '10px', paddingLeft: '20px' }}>
                                <ListItemIcon>
                                    <Checkbox
                                        edge="start"
                                        disableRipple
                                        color="primary"
                                        checked={task.finished}
                                        onChange={() => props.finishTask(task)}
                                    />
                                </ListItemIcon>
                                <ListItemText id={labelId} primary={<h3>{task.taskName}</h3>} style={{ margin: '0px', textDecoration: task.finished ? 'line-through' : 'none' }} onClick={() => props.finishTask(task)} />
                                <ListItemSecondaryAction className="deleteBtn">
                                    <IconButton edge="end" aria-label="comments" onClick={() => props.deleteTask(task)}>
                                        <Backspace color="secondary" />
                                    </IconButton>
                                </ListItemSecondaryAction>
                            </ListItem>

                        );
                    })}
            </FlipMove>
        </List>

    )
}

export default TaskList
