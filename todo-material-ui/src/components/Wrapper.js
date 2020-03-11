import React, { Component } from 'react';
import SearchBar from './SearchBar';
import TaskList from './TaskList';
import { Fab, Snackbar } from '@material-ui/core';
import { Add, Close } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export class Wrapper extends Component {
    constructor(props, state) {
        super(props, state);
        this.state = {
            taskList: [{ id: 0, taskName: "Plan App", finished: true },
            { id: 1, taskName: "Design app", finished: false },
            { id: 2, taskName: "Code the App", finished: false },
            { id: 3, taskName: "Debug the App", finished: false }],
            snackBarOpen: false
        };
        this.input = "";
        this.statusMessage = "";
        this.severity = "info";
        this.taskList = [{}];
        this.originalArr = this.state.taskList;
    }

    isBlank = (value) => {
        return (value.trim() === null ||
            value.trim() === undefined ||
            value.trim() === ' ' ||
            value.trim().length === 0);
    }

    handleKeyDown = (e) => {
        if (e.key === "Enter") {
            this.addTask();
        }
    };

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
                    taskList: [...this.originalArr, { id: this.originalArr.length, taskName: this.input, finished: false }],
                    snackBarOpen: true
                }, () => this.originalArr = this.state.taskList);
                this.statusMessage = "Item Added : " + this.input;
                this.severity = "success";
                this.input = "";
            }
            else {
                this.setState({ snackBarOpen: true });
                this.statusMessage = "Item Already present : " + this.input;
                this.severity = "warning";
            }
        }
    };

    deleteTask = ({ id }) => {
        let tempArr = this.originalArr.filter(task => task.id !== id);
        tempArr.forEach((task, index) => {
            task.id = index
        });
        this.setState({
            taskList: tempArr,
            snackBarOpen: true
        }, () => this.originalArr = this.state.taskList);
        this.statusMessage = "Item Deleted";
        this.severity = "error";
        this.input = "";
    };

    finishTask = ({ id }) => {
        let tempArr = [...this.originalArr];
        tempArr.forEach((task, index) => {
            if (task.id === id) {
                task.finished = !task.finished;
                this.setState({ taskList: tempArr }, () => this.originalArr = this.state.taskList);
            }
        });
    };

    handleClose = (e, reason) => {
        if (reason === "clickaway") {
            return;
        }
        this.setState({ snackBarOpen: false });
    };

    render() {
        this.taskList = this.state.taskList;
        return (
            <div>
              
                <h1 >THINGS TO DO</h1>
                <div>
                    <SearchBar inputChanged={this.inputChanged} handleKeyDown={this.handleKeyDown} value={this.input} />
                   
                    <Fab color="primary" aria-label="add" onClick={this.addTask} style={{ marginLeft: '20px' }}>
                        <Add />
                    </Fab>
                </div>


                <div style={{ margin: '10px auto', maxWidth: '480px' }}>
                    <TaskList taskList={this.taskList} finishTask={this.finishTask} deleteTask={this.deleteTask}  />
                </div>

                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={2000}
                    open={this.state.snackBarOpen}
                    onClose={this.handleClose}
                    action={
                        <React.Fragment>
                            <IconButton size="small" aria-label="close" color="inherit" onClick={this.handleClose}>
                                <Close fontSize="small" />
                            </IconButton>
                        </React.Fragment>
                    }
                >
                    <Alert onClose={this.handleClose} severity={this.severity} >
                        {this.statusMessage}
                    </Alert>
                </Snackbar>
                
            </div>
        );
    }
}

export default Wrapper;
