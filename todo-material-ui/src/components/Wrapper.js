import React, { Component } from 'react';
import SearchBar from './SearchBar';
import TodoItem from "./TodoItem";
import { Fab } from '@material-ui/core';
import { Add, Backspace } from '@material-ui/icons';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import CommentIcon from '@material-ui/icons/Comment';


export class Wrapper extends Component {


    constructor(props, state) {
        super(props, state);
        this.state = {
            taskList: [{ id: 0, taskName: "Plan App", finished: true },
            { id: 1, taskName: "Design app", finished: false },
            { id: 2, taskName: "Code the App", finished: false },
            { id: 3, taskName: "Debug the App", finished: false }]
        };
        this.input = "";
        this.taskList = [{}];

        this.originalArr = this.state.taskList;
    }

    isBlank = (value) => {
        return (value.trim() == null ||
            value.trim() == undefined ||
            value.trim() == ' ' ||
            value.trim().length == 0);
    }

    inputChanged = (e) => {
        this.input = e.target.value;
        if (!this.isBlank(this.input)) {
            this.taskList = this.originalArr.filter((task) => task.taskName.toLowerCase().includes(this.input.toLowerCase()));
            this.setState({
                taskList: this.taskList
            });
        }
        else {
            this.setState({
                taskList: this.originalArr
            });
        }

    };

    addTask = () => {
        if (!this.isBlank(this.input)) {
            if (!this.originalArr.find(task => task.taskName === this.input)) {
                // let tempArr = this.state.taskList;
                this.setState({
                    taskList: [...this.originalArr, { id: this.originalArr.length + 1, taskName: this.input, finished: false }]
                }, () => this.originalArr = this.state.taskList)
            }
            else {
                console.log("itemAlready Present :" + this.input);
            }
        }
    };

    deleteTask = ({ id }) => {
        console.dir(id);
        let tempArr = [...this.originalArr.filter(task => task.id !== id)];
        tempArr.forEach((task, index) => {
            task.id = index
        });
        console.log(tempArr);
        this.setState({
            taskList: tempArr
        }, () => this.originalArr = this.state.taskList);

    }

    finishTask = ({ id }) => {
        let tempArr = [...this.originalArr];

        tempArr.forEach((task, index) => {
            if (task.id === id) {
                task.finished = !task.finished;
                this.setState({ taskList: tempArr }, () => this.originalArr = this.state.taskList);
            }
        });
    }


    render() {
        this.taskList = this.state.taskList;
        return (
            <div>
                <h1 >THINGS TO DO</h1>
                <div>
                    <SearchBar inputChanged={this.inputChanged} />
                    <Fab color="primary" aria-label="add" onClick={this.addTask} style={{ marginLeft: '20px' }}>
                        <Add />
                    </Fab>
                </div>


                <div style={{ margin: 'auto', maxWidth: '480px' }}>
                    <List>
                        {this.taskList.map((task, index) => {
                            const labelId = `checkbox-list-label-${task}`;

                            return (
                                <ListItem key={index} role={undefined} dense button className="taskItem">
                                    <ListItemIcon>
                                        <Checkbox
                                            edge="start"
                                            tabIndex={-1}
                                            disableRipple
                                            inputProps={{ 'aria-labelledby': labelId }}
                                            color="primary"
                                            checked={task.finished}
                                            onChange={() => this.finishTask(task)}
                                        />
                                    </ListItemIcon>
                                    <ListItemText id={labelId} primary={task.taskName} style={{ textDecoration: task.finished ? 'line-through' : 'none' }} onClick={() => this.finishTask(task)} />
                                    <ListItemSecondaryAction className="deleteBtn">
                                        <IconButton edge="end" aria-label="comments" onClick={() => this.deleteTask(task)}>
                                            <Backspace color="secondary" />
                                        </IconButton>
                                    </ListItemSecondaryAction>
                                </ListItem>
                            );
                        })}
                    </List>
                </div>


            </div>
        );
    }
}

export default Wrapper;
